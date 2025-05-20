import { FC, PropsWithChildren } from 'react';
import { secondary } from '@/components/colors';
import { Container } from '@mui/material';

export const FormContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container
      maxWidth="md"
      sx={{
        padding: '20px',
        borderWidth: '1px',
        borderColor: secondary.dark,
        borderStyle: 'dashed',
        color: secondary.dark
      }}
    >
      {children}
    </Container>
  );
};
