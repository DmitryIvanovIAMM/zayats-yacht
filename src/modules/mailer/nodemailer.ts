import * as nodemailer from 'nodemailer';
import * as aws from 'aws-sdk';

const { ALLIED_AWS_ACCESS_KEY_ID, ALLIED_AWS_SECRET_ACCESS_KEY, ALLIED_AWS_REGION } = process.env;

const awsConfig = {
  accessKeyId: ALLIED_AWS_ACCESS_KEY_ID,
  secretAccessKey: ALLIED_AWS_SECRET_ACCESS_KEY,
  region: ALLIED_AWS_REGION
};

const transporter = nodemailer.createTransport({
  SES: new aws.SES(awsConfig)
});

export default transporter;
