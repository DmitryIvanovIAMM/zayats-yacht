import * as nodemailer from 'nodemailer';
import * as aws from '@aws-sdk/client-ses';
import { SES, SESClientConfig } from '@aws-sdk/client-ses';
import { Transporter } from 'nodemailer';
import SESTransport from 'nodemailer/lib/ses-transport';
import { awsClientConfig } from '@/modules/aws/aws_config';

const ses = new SES(awsClientConfig as SESClientConfig);

export const sesMailTransport: Transporter<SESTransport.SentMessageInfo> =
  nodemailer.createTransport({
    SES: { ses, aws }
  });
