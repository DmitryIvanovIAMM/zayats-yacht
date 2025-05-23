// import { fromBuffer } from 'file-type';
// import {
//   DeleteObjectCommand,
//   DeleteObjectsCommand,
//   PutObjectCommand,
//   S3Client
// } from '@aws-sdk/client-s3';
// import * as fs from 'fs';
// import { Messages } from '@/helpers/messages';
// import { randomString } from '@/utils/randomString';
//
// export const ALLIED_YACHT_DIR = 'allied-yacht';
//
// export const { AWS_S3_OBJECT_BUCKET } = process.env;
//
// export interface FileWithPath extends File {
//   path: string;
// }
//
// // s3://alliedyacht/test/
//
// const s3Client = new S3Client({
//   apiVersion: '2012-10-17'
// });
//
// // https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/javascript_s3_code_examples.html
// // `https://${bucket}.s3.${region}.amazonaws.com/${key}`
// export const getUrlFromBucket = (fileName, bucket: string = AWS_S3_OBJECT_BUCKET) => {
//   return `https://s3.amazonaws.com/${bucket}/${fileName}`;
// };
//
// const generatePutCommand = async (
//   buffer: Buffer,
//   bucket: string,
//   name: string,
//   bucketDir: string
// ) => {
//   const type = await fromBuffer(buffer);
//   const contentType = type ? type.mime : '';
//   const key = type ? `${bucketDir}/${name}.${type.ext}` : `${bucketDir}/${name}`;
//
//   return new PutObjectCommand({
//     ACL: 'public-read',
//     Body: buffer,
//     Bucket: bucket,
//     ContentType: contentType,
//     Key: key
//   });
// };
//
// export const uploadFileAndGetItsURL = async (
//   buffer: Buffer,
//   bucket: string = ALLIED_YACHT_DIR,
//   name: string,
//   bucketDir: string
// ) => {
//   const command = await generatePutCommand(buffer, bucket, name, bucketDir);
//   await s3Client.send(command);
//   return getUrlFromBucket(command.input.Key, bucket);
// };
//
// export const deleteFile = (fileKey: string, bucket = AWS_S3_OBJECT_BUCKET) => {
//   const command = new DeleteObjectCommand({ Key: fileKey, Bucket: bucket });
//   return s3Client.send(command);
// };
//
// function convertFilesToObjects(files: string[]) {
//   return files.map((item) => {
//     return { Key: item };
//   });
// }
//
// export const deleteFilesByKey = async (files, bucket = AWS_S3_OBJECT_BUCKET) => {
//   if (files === undefined || files?.length === 0) {
//     return;
//   }
//   const filesToDelete = convertFilesToObjects(files);
//   const command = new DeleteObjectsCommand({ Bucket: bucket, Delete: { Objects: filesToDelete } });
//   try {
//     const { Deleted } = await s3Client.send(command);
//     console.log(`Successfully deleted ${Deleted.length} objects from S3 bucket. Deleted objects:`);
//     console.log(Deleted.map((d) => ` • ${d.Key}`).join('\n'));
//   } catch (err) {
//     console.log(err);
//   }
// };
//
// export const uploadImageWithRandomNameToDirectory = async (
//   buffer: Buffer,
//   directory: string
// ): Promise<string> => {
//   const fileName = randomString(24); // TODO: we should avoid random strings and instead use proper version
//   return uploadFileAndGetItsURL(buffer, AWS_S3_OBJECT_BUCKET, fileName, directory);
// };
//
// export const uploadImagesToNamedStorage = async (
//   images: FileWithPath[],
//   storageName: string
// ): Promise<string[]> => {
//   const uploadedImagesUrls: string[] = [];
//   if (images?.length > 0) {
//     for (const image of images) {
//       try {
//         const path = image.path;
//         const buffer = fs.readFileSync(path);
//         const uploadedImageData: string = await uploadImageWithRandomNameToDirectory(
//           buffer,
//           storageName
//         );
//         uploadedImagesUrls.push(uploadedImageData);
//         // eslint-disable-next-line @typescript-eslint/no-unused-vars
//       } catch (e) {
//         throw new Error(Messages.CannotUploadMedia);
//       }
//     }
//   }
//   return uploadedImagesUrls;
// };
//
// export const uploadImageToNamedStorage = async (
//   file: FileWithPath,
//   storageName: string
// ): Promise<string> => {
//   try {
//     const buffer = fs.readFileSync(file.path);
//     return uploadImageWithRandomNameToDirectory(buffer, storageName);
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   } catch (e) {
//     throw new Error(Messages.CannotUploadImage);
//   }
// };
