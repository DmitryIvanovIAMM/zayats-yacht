import dbConnect from '@/mongoose/mongoose';

export async function register() {
  console.log('process.env.NEXT_RUNTIME: ', process.env.NEXT_RUNTIME);
  await dbConnect();

  if (process.env.APP_MODE === 'development') {
    console.log('Load test data in development mode...');
  } else {
    console.log('Do not load test data in production mode.');
  }
}
