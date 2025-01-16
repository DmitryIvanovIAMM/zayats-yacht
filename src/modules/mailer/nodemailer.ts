import * as nodemailer from 'nodemailer';
import * as aws from 'aws-sdk';

const { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, AWS_REGION } = process.env;
const awsConfig = {
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION
};

const transporter = nodemailer.createTransport({
  SES: new aws.SES(awsConfig)
});

export default transporter;
