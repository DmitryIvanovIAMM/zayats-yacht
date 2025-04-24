import LoginForm from '@/components/Login/LoginForm';
import { sectionContainerSx } from '@/components/ContactUs/ContactUs';
import Box from '@mui/material/Box';

const loginSectionSx = {
  ...sectionContainerSx,
  width: {
    xs: '80%',
    sm: '60%',
    md: '420px'
  },
  maxWidth: {
    xs: '80%',
    sm: '60%',
    md: '420px'
  }
};

export interface SignInPageProps {
  searchParams?: Promise<Record<'callbackUrl' | 'error', string>>;
}

export default async function SignInPage(props: Promise<SignInPageProps>) {
  const { searchParams } = await props;
  const { callbackUrl, error } = await searchParams;

  return (
    <Box sx={loginSectionSx}>
      <LoginForm loginRedirectUrl={callbackUrl} error={error} />
    </Box>
  );
}
