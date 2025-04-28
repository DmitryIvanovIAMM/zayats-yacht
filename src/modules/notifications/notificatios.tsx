import type { SnackbarAction, SnackbarKey, SnackbarOrigin, VariantType } from 'notistack';
import { Button } from '@mui/material';
import { enqueueSnackbar, closeSnackbar } from 'notistack';

export enum NOTIFICATION_TYPES {
  error = 'error',
  success = 'success'
}

const notistackAnchor: SnackbarOrigin = {
  vertical: 'bottom',
  horizontal: 'left'
};

const defaultAutoHideDuration = 5000; // ms

export const showNotification = (
  isSuccess: boolean,
  notificationMessage: string,
  needConfirmation = false,
  confirmationText = 'Dismiss',
  confirmAction?: () => void
) => {
  const action: SnackbarAction = (key: SnackbarKey) => (
    <Button
      variant="outlined"
      color="inherit"
      onClick={() => {
        closeSnackbar(key);
        if (confirmAction) {
          confirmAction();
        }
      }}
    >
      {confirmationText}
    </Button>
  );
  if (isSuccess) {
    needConfirmation
      ? showNotificationWithVariant(notificationMessage, NOTIFICATION_TYPES.success, action)
      : showNotificationWithVariantWithoutConfirmation(
          notificationMessage,
          NOTIFICATION_TYPES.success
        );
  } else {
    needConfirmation
      ? showNotificationWithVariant(notificationMessage, NOTIFICATION_TYPES.error, action)
      : showNotificationWithVariantWithoutConfirmation(
          notificationMessage,
          NOTIFICATION_TYPES.error
        );
  }
};

const showNotificationWithVariantWithoutConfirmation = (message: string, variant: VariantType) => {
  enqueueSnackbar(message, {
    variant: variant,
    anchorOrigin: notistackAnchor,
    preventDuplicate: false,
    autoHideDuration: defaultAutoHideDuration
  });
};

const showNotificationWithVariant = (
  message: string,
  variant: VariantType,
  action: SnackbarAction
) => {
  enqueueSnackbar(message, {
    variant: variant,
    action,
    anchorOrigin: notistackAnchor,
    preventDuplicate: false,
    autoHideDuration: null
  });
};
