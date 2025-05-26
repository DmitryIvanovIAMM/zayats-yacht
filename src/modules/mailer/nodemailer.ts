import * as nodemailer from 'nodemailer';
import * as aws from '@aws-sdk/client-ses';
import { SES, SESClientConfig } from '@aws-sdk/client-ses';
import { Transporter } from 'nodemailer';
import SESTransport from 'nodemailer/lib/ses-transport';

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = process.env;

// https://github.com/nodemailer/nodemailer/issues/1293
// Credentials will come from the AWS SDK: https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/loading-node-credentials-environment.html
const sesClientConfig = {
  apiVersion: '2010-12-01',
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  }
} as SESClientConfig;
export const ses = new SES(sesClientConfig);

export const sesMailTransport: Transporter<SESTransport.SentMessageInfo> =
  nodemailer.createTransport({
    SES: { ses, aws }
  });
