import LoginForm from '@/components/Login/LoginForm';
import Box from '@mui/material/Box';
import backgroundImage from '../../../public/images/allied_yacht_vertical_png_120.png';
import { SxProps } from '@mui/material';

const backgroundBeforeSx: SxProps = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  '&::before': {
    width: '100%',
    height: '100%',
    backgroundImage: `url(${backgroundImage.src})`,
    backgroundRepeat: 'repeat',
    opacity: 0.03,
    zIndex: -1,
    position: 'absolute',
    left: 0,
    top: 0,
    content: `""`
  }
} as SxProps;

const loginSectionSx = {
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
    <Box sx={backgroundBeforeSx}>
      <Box sx={{ ...loginSectionSx }}>
        <LoginForm loginRedirectUrl={callbackUrl as string} error={error as string} />
      </Box>
    </Box>
  );
}
