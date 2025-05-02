import dbConnect from '@/modules/mongoose/mongoose';
import { AppEnv } from '@/utils/appEnv';
import testDataLoader from '@/test-data/testDataLoader';

export async function register() {
  await dbConnect();

  const { APP_ENV } = process.env;

  if (APP_ENV === AppEnv.DEV || APP_ENV === AppEnv.CI) {
    // eslint-disable-next-line no-console
    console.log('Load test data in development mode...');
    await testDataLoader();
  } else {
    // eslint-disable-next-line no-console
    console.log('Do not load test data in production mode.');
  }
}
