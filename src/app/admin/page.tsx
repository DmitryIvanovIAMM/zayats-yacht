'use server';

import { redirect } from 'next/navigation';
import { PATHS } from '@/helpers/paths';

async function Home() {
  return redirect(PATHS.adminUsersRequests); // Navigate to the new post page
}

export default Home;
