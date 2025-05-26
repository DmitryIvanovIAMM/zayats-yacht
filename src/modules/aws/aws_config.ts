const { AWS_REGION } = process.env;
// eslint-disable-next-line no-console
console.log('AWS_REGION: ', AWS_REGION);

// https://github.com/nodemailer/nodemailer/issues/1293
// Credentials will come from the AWS SDK: https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/loading-node-credentials-environment.html
export const awsClientConfig = {
  apiVersion: '2012-10-17',
  region: AWS_REGION
};
