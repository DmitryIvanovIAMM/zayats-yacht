import { FC, PropsWithChildren } from 'react';
import { secondary } from '@/components/colors';
import { Container } from '@mui/material';
import './container.css';

const containerSx = {
  padding: '20px',
  background: '#fff',
  color: secondary.dark,
  position: 'relative',
  '&::after': {
    content: "' '",
    position: 'absolute',
    inset: '-2px',
    background: `conic-gradient(from var(--angle), transparent 0%, ${secondary.dark}, #0000, #0000, ${secondary.dark}, #0000, #0000)`,
    zIndex: -1,
    '@keyframes slideInFromRight': {
      from: {
        '--angle': '0deg'
      },
      to: {
        '--angle': '360deg'
      }
    },
    animation: `slideInFromRight 10s linear infinite`
  }
};

export const FormContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container maxWidth="md" sx={containerSx}>
      {children}
    </Container>
  );
};
