import { Typography } from '@mui/material';
import React from 'react';
import Button from '@mui/material/Button';
import { PATHS } from '@/helpers/paths';

const titleSx = {
  textTransform: 'uppercase',
  color: 'secondary.dark',
  fontSize: { xs: '1.5em', md: '2em' },
  marginTop: '40px',
  marginBottom: '20px'
};
const messageSx = {
  ...titleSx,
  fontSize: { xs: '1em', md: '1.3em' },
  padding: '20px'
};

interface LoginFailedPageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }> | undefined;
}
export default async function LoginFailedPage({ searchParams }: LoginFailedPageProps) {
  const message: string = ((await searchParams)?.message as string) || 'Unauthorized';

  return (
    <div>
      <Typography component="h4" variant="h4" align="center" sx={titleSx}>
        Login Failed
      </Typography>
      <Typography component="h4" variant="h4" align="center" sx={messageSx}>
        {message}
      </Typography>
      <div style={{ textAlign: 'center' }}>
        <Button
          href={PATHS.landing}
          variant={'contained'}
          sx={{ backgroundColor: 'secondary.dark', marginTop: '40px', marginBottom: '40px' }}
          size={'large'}
        >
          Main page
        </Button>
      </div>
    </div>
  );
}
