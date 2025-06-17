'use server';

import { sesMailTransport } from '@/modules/mailer/nodemailer';
import * as quoteRequestUtils from '../utils/quoteRequest';
import {
  LENGTH_METRIC,
  PURPOSE_OF_TRANSPORT,
  QuoteRequestForm,
  quoteRequestSchema,
  WEIGHT_METRIC
} from '@/components/QuoteRequest/types';
import { QuoteRequest } from '@/models/QuoteRequest';
import { Types } from 'mongoose';
import { Messages } from '@/helpers/messages';
import { ActionResult } from '@/utils/types';
import { quoteRequestService } from '@/services/QuoteRequestsService';
import { User } from '@/models/User';
import { getValidationErrorsAsObject } from '@/utils/formHelpers/formHelpers';

export const sendQuoteRequest = async (
  adminUser: User,
  quoteRequest: QuoteRequestForm
): Promise<ActionResult> => {
  // eslint-disable-next-line no-console
  console.log(`sendQuoteRequest().  quoteRequest: `, quoteRequest);

  try {
    await quoteRequestSchema.validate(quoteRequest, { abortEarly: false });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    const errorsObject = getValidationErrorsAsObject(error.inner);
    return {
      success: false,
      message: Messages.ValidationError,
      data: errorsObject
    };
  }

  // replace keys in quoteRequest with string values from enums
  quoteRequest.purpose = quoteRequest?.purpose
    ? PURPOSE_OF_TRANSPORT[quoteRequest.purpose as keyof typeof PURPOSE_OF_TRANSPORT]
    : '';
  quoteRequest.lengthUnit = quoteRequest?.lengthUnit
    ? LENGTH_METRIC[quoteRequest.lengthUnit as keyof typeof LENGTH_METRIC]
    : '';
  quoteRequest.beamUnit = quoteRequest?.beamUnit
    ? LENGTH_METRIC[quoteRequest.beamUnit as keyof typeof LENGTH_METRIC]
    : '';
  quoteRequest.weightUnit = quoteRequest?.weightUnit
    ? WEIGHT_METRIC[quoteRequest.weightUnit as keyof typeof WEIGHT_METRIC]
    : '';

  const emailMessage = quoteRequestUtils.getQuoteRequestEmail(quoteRequest);
  // eslint-disable-next-line no-console
  console.log(`emailMessage: ${emailMessage}`);
  //logger.info(`emailMessage: ${emailMessage}`);

  const storeQuoteRequest = async (fromEmail: string, message: string) => {
    const newQuoteRequest: QuoteRequest = {
      _id: new Types.ObjectId(),
      fromUserId: adminUser._id,
      fromName: adminUser.name,
      fromEmail: fromEmail,
      receivedAt: new Date().toLocaleString('us-Us'),
      requestData: message,
      requestObject: quoteRequest
    };
    // eslint-disable-next-line no-console
    console.log('quoteRequest to be stored: ', newQuoteRequest);

    try {
      const result = await quoteRequestService.create(newQuoteRequest);
      // eslint-disable-next-line no-console
      console.log('result: ', result);
      return result;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`Error storing Quote Request in DB: ${error}`);
      //logger.error(`Error storing Quote Request in DB: ${error}`);
      throw error;
    }
  };

  try {
    await storeQuoteRequest(quoteRequest.email, emailMessage.text);

    const sendToEmail = process.env.SEND_EMAIL;
    if (sendToEmail === 'true') {
      // eslint-disable-next-line no-console
      console.log(`Sending email message: ${emailMessage}`);
      //logger.info(`Sending email message: ${emailMessage}`);
      await sesMailTransport.sendMail(emailMessage);
    }
    return { success: true, message: Messages.QuoteRequestSent };
  } catch (err: any) {
    const errorResult = {
      success: false,
      message: err?.message?.toString() || Messages.QuoteRequestFailed
    };
    // eslint-disable-next-line no-console
    console.log(`Error sending email: ${err}`);
    //logger.error(`Error sending email: ${err}`);
    return errorResult;
  }
};
