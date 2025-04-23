import LoginForm from '@/components/Login/LoginForm';
import { sectionContainerSx } from '@/components/ContactUs/ContactUs';
import Box from '@mui/material/Box';

export const loginSectionSx = {
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

export default async function SignInPage() {
  return (
    <Box sx={loginSectionSx}>
      <LoginForm />
    </Box>
  );
}
