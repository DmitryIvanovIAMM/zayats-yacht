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

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export interface SignInPageProps {
  searchParams?: SearchParams;
}

export default async function SignInPage(props: { searchParams: SearchParams }) {
  const { callbackUrl, error } = await props.searchParams;

  return (
    <Box sx={loginSectionSx}>
      <LoginForm loginRedirectUrl={callbackUrl as string} error={error as string} />
    </Box>
  );
}
