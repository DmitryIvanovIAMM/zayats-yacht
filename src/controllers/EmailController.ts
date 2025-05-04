'use server';

import { sesMailTransport } from '@/modules/mailer/nodemailer';
import * as quoteRequestUtils from '../utils/quoteRequest';
import { QuoteRequestForm } from '@/components/QuoteRequest/types';
import { QuoteRequest } from '@/models/QuoteRequest';
import { Types } from 'mongoose';
import { Messages } from '@/helpers/messages';
import { LongActionResult } from '@/utils/types';
import { quoteRequestService } from '@/services/QuotaRequestsService';

export const sendQuoteRequest = async (
  quoteRequest: QuoteRequestForm
): Promise<LongActionResult> => {
  // eslint-disable-next-line no-console
  console.log(`sendQuoteRequest().  quoteRequest: ${quoteRequest}`);
  //logger.info(`sendQuoteRequest().  quoteRequest: ${quoteRequest}`);

  const emailMessage = quoteRequestUtils.getQuoteRequestEmail(quoteRequest);
  // eslint-disable-next-line no-console
  console.log(`emailMessage: ${emailMessage}`);
  //logger.info(`emailMessage: ${emailMessage}`);

  const storeQuoteRequest = async (fromEmail: string, message: string) => {
    const newQuoteRequest: QuoteRequest = {
      _id: new Types.ObjectId(),
      fromEmail: fromEmail,
      receivedAt: new Date().toLocaleString('us-Us'),
      requestData: message
    };

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

    // const sendToEmail = process.env.SEND_EMAIL;
    // if (sendToEmail === 'true') {
    //   // eslint-disable-next-line no-console
    //   console.log(`Sending email message: ${emailMessage}`);
    //   //logger.info(`Sending email message: ${emailMessage}`);
    //   await sesMailTransport.sendMail(emailMessage);
    // }
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
