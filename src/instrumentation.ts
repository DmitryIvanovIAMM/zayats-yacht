import dbConnect from '@/mongoose/mongoose';

export async function register() {
  await dbConnect();

  if (process.env.APP_MODE === 'development') {
    // eslint-disable-next-line no-console
    console.log('Load test data in development mode...');
  } else {
    // eslint-disable-next-line no-console
    console.log('Do not load test data in production mode.');
  }
}
