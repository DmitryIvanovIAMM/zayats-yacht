'use server';

import { fromBuffer } from 'file-type';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
  S3ClientConfig
} from '@aws-sdk/client-s3';
import { Messages } from '@/helpers/messages';
import { insertRandomBeforeExtension } from '@/utils/randomString';
import { awsClientConfig } from '@/modules/aws/aws_config';

const DEFAULT_S3_BUCKET = 'auto.testing.efacity.com';
const { AWS_S3_OBJECT_BUCKET } = process.env;

const s3Client = new S3Client(awsClientConfig as S3ClientConfig);

// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/javascript_s3_code_examples.html
// `https://${bucket}.s3.${region}.amazonaws.com/${key}`
const getUrlFromBucket = (fileName: string, bucket: string = AWS_S3_OBJECT_BUCKET as string) => {
  return `https://s3.amazonaws.com/${bucket}/${fileName}`;
};

const generatePutCommand = async (
  buffer: Buffer,
  bucket: string,
  name: string,
  bucketDir: string
) => {
  const type = await fromBuffer(buffer);
  const contentType = type ? type.mime : '';
  const key = type ? `${bucketDir}/${name}.${type.ext}` : `${bucketDir}/${name}`;

  return new PutObjectCommand({
    ACL: 'public-read',
    Body: buffer,
    Bucket: bucket,
    ContentType: contentType,
    Key: key
  });
};

export const uploadFileAndGetItsURL = async (
  buffer: Buffer,
  name: string,
  bucket: string = DEFAULT_S3_BUCKET,
  bucketDir: string
) => {
  const command = await generatePutCommand(buffer, bucket, name, bucketDir);
  await s3Client.send(command);
  return getUrlFromBucket(command.input.Key as string, bucket);
};

export const deleteFile = async (fileKey: string, bucket = AWS_S3_OBJECT_BUCKET) => {
  const command = new DeleteObjectCommand({ Key: fileKey, Bucket: bucket });
  return s3Client.send(command);
};

export const uploadImageToNamedStorage = async (
  file: File,
  fileName: string,
  directory = `uploads`
): Promise<string> => {
  // eslint-disable-next-line no-console
  console.log('uploadImageToNamedStorage().  file: ', file, ',  fileName: ', fileName);
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    return uploadFileAndGetItsURL(buffer, fileName, AWS_S3_OBJECT_BUCKET, directory);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('uploadImageToNamedStorage().  error: ', e);
    throw new Error(Messages.CannotUploadMedia);
  }
};

export const storeFileOnS3WithModifiedName = async (file: File): Promise<string> => {
  const fileName = insertRandomBeforeExtension(file.name as string);

  try {
    const nameOnAWS = await uploadImageToNamedStorage(file, fileName, 'uploads');
    // eslint-disable-next-line no-console
    console.log('nameOnAWS: ', nameOnAWS);
    return nameOnAWS;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('addPort().  Error writing file:', err);
    throw new Error(Messages.CannotUploadMedia);
  }
};
