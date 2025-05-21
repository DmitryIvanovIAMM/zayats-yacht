'use client';

import { useRouter } from 'next/navigation';
import { Box } from '@mui/material';
import { primary, secondary } from '@/components/colors';
import { useSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ShipForm, shipSchema } from '@/components/AdminDashboard/AdminShips/Ship/types';
import { FormTextInput } from '@/components/MUI-RHF/FormTextInput';
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { PATHS } from '@/helpers/paths';
import { FormMode } from '@/utils/types';
import { Messages } from '@/helpers/messages';
import { FormContainer } from '@/components/FormContainer/FormContainer';
import { addShipByAdminAction, updateShipByAdminAction } from '@/app/serverActions';

export interface ShipContainerProps {
  formMode: FormMode;
  initialValues: ShipForm;
  _id?: string;
}

export const ShipFormContainer = ({
  formMode,
  initialValues,
  _id = undefined
}: ShipContainerProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const methods = useForm<ShipForm>({
    resolver: yupResolver(shipSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: initialValues,
    shouldFocusError: true,
    shouldUseNativeValidation: false
  });
  const { handleSubmit, formState } = methods;

  const onSubmit = async (shipForm: ShipForm) => {
    try {
      const result =
        formMode === FormMode.ADD
          ? await addShipByAdminAction(shipForm)
          : await updateShipByAdminAction(_id as string, shipForm);
      if (!result.success) {
        return enqueueSnackbar(result.message, { variant: 'error' });
      }
      router.push(PATHS.adminShips);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error: ', error);
      enqueueSnackbar(
        formMode === FormMode.ADD ? Messages.FailedAddShip : Messages.FailedUpdateShip,
        { variant: 'error' }
      );
    }
  };

  return (
    <FormContainer>
      <h2>{formMode === FormMode.ADD ? 'Add Ship' : 'Edit Ship'}</h2>
      <FormProvider {...methods}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap'
            }}
          >
            <Box sx={{ flex: { xs: '100%', sm: '50%' } }}>
              <FormTextInput name={'name'} label={'Name *'} />
            </Box>
            <Box sx={{ flex: { xs: '100%', sm: '50%' } }}>
              <FormTextInput name={'type'} label={'Type *'} />
            </Box>
            <Box sx={{ flex: { xs: '100%', sm: '50%' } }}>
              <FormTextInput name={'builder'} label={'Builder *'} />
            </Box>
            <Box sx={{ flex: { xs: '100%', sm: '50%' } }}>
              <FormTextInput name={'flag'} label={'Flag *'} />
            </Box>{' '}
            <Box sx={{ flex: { xs: '100%', sm: '50%' } }}>
              <FormTextInput name={'homePort'} label={'Home Port *'} />
            </Box>{' '}
            <Box sx={{ flex: { xs: '100%', sm: '50%' } }}>
              <FormTextInput name={'class'} label={'Class *'} />
            </Box>{' '}
            <Box sx={{ flex: { xs: '100%', sm: '50%' } }}>
              <FormTextInput name={'imoNo'} label={'IMO No *'} />
            </Box>{' '}
            <Box sx={{ flex: { xs: '100%', sm: '50%' } }}>
              <FormTextInput name={'callSign'} label={'Call Sign *'} />
            </Box>
          </div>
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
              type="text"
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
              disabled={formState.isSubmitting}
              href={PATHS.adminShips}
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
                  {formState.isSubmitting ? (
                    <CircularProgress size="20px" sx={{ color: `${primary.contrastText}` }} />
                  ) : (
                    <SendIcon />
                  )}
                </div>
              }
              style={{ backgroundColor: `${secondary.dark}` }}
              disabled={formState.isSubmitting}
            >
              Submit
            </Button>
          </Box>
        </form>
      </FormProvider>
    </FormContainer>
  );
};
