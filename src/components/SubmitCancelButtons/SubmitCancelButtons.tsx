import Button from '@mui/material/Button';
import { primary, secondary } from '@/components/colors';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import { Box } from '@mui/material';
import React from 'react';

export interface SubmitCancelButtonsProps {
  isSubmitting: boolean;
  onCancelPath: string;
}

export const SubmitCancelButtons = ({ isSubmitting, onCancelPath }: SubmitCancelButtonsProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flex: { xs: '100%' },
        marginTop: '20px',
        marginBottom: '20px',
        justifyContent: 'space-around'
      }}
    >
      <Button
        type="button"
        variant="outlined"
        style={{ color: secondary.dark, borderColor: secondary.dark }}
        endIcon={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '24px',
              height: '24px'
            }}
          >
            <HighlightOffIcon />
          </div>
        }
        disabled={isSubmitting}
        href={onCancelPath}
        data-testid="cancel-form-button"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        variant="contained"
        endIcon={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '24px',
              height: '24px'
            }}
          >
            {isSubmitting ? (
              <CircularProgress size="20px" sx={{ color: `${primary.contrastText}` }} />
            ) : (
              <SendIcon />
            )}
          </div>
        }
        style={{ backgroundColor: `${secondary.dark}` }}
        disabled={isSubmitting}
        data-testid="submit-form-button"
      >
        Submit
      </Button>
    </Box>
  );
};
