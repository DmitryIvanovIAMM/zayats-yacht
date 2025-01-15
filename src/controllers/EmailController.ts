'use server';

//import mailTransporter from '../modules/mailer/nodemailer';
import logger from '../utils/logger';
import * as quoteRequestUtils from '../utils/quoteRequest';
import { QuoteRequestForm } from '@/app/quote-request/types';
import { QuoteRequestModel } from '@/models/QuoteRequest';
import { Types } from 'mongoose';

export const sendQuoteRequest = async (quoteRequest: QuoteRequestForm) => {
  logger.info(`sendQuoteRequest().  quoteRequest: ${quoteRequest}`);

  const emailMessage = quoteRequestUtils.getQuoteRequestEmail(quoteRequest);
  logger.info(`emailMessage: ${emailMessage}`);

  const storeQuoteRequest = async (fromEmail: string, message: string) => {
    const newQuoteRequest = new QuoteRequestModel({
      _id: new Types.ObjectId(),
      fromEmail: fromEmail,
      receivedAt: new Date().toLocaleString('us-Us'),
      requestData: message
    });

    try {
      const result = await QuoteRequestModel.create(newQuoteRequest);
      // eslint-disable-next-line no-console
      console.log('result: ', result);
      return result;
    } catch (error) {
      logger.error(`Error storing Quote Request in DB: ${error}`);
      throw error;
    }
  };

  try {
    await storeQuoteRequest(quoteRequest.email, emailMessage.text);
    logger.info(`Sending email message: ${emailMessage}`);
    //await mailTransporter.sendMail(emailMessage);
    const successResult = { isSuccessful: true, message: 'Email sent successfully' };
    return successResult;
  } catch (err) {
    const errorResult = { isSuccessful: false, message: 'Failed to send Email' };
    logger.error(`Error sending email: ${err}`);
    return errorResult;
  }
};
