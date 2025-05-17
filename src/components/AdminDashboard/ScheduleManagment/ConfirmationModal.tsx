import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { secondary } from '@/components/colors';

export const ConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  title,
  message
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirmation-modal"
      data-testid="confirmation-modal"
    >
      <DialogTitle id="alert-dialog-title" style={{ color: secondary.dark, fontSize: '16px' }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <div style={{ color: secondary.dark, fontSize: '18px' }}>{message}</div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={{ color: secondary.dark }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
          data-testid="confirmation-modal-confirm-button"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
