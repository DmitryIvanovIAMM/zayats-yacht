'use client';

import { useRouter } from 'next/navigation';
import { Box } from '@mui/material';
import { useSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ShipForm, shipSchema } from '@/components/AdminDashboard/AdminShips/Ship/types';
import { FormTextInput } from '@/components/MUI-RHF/FormTextInput';
import React from 'react';
import { PATHS } from '@/helpers/paths';
import { FormMode } from '@/utils/types';
import { Messages } from '@/helpers/messages';
import { FormContainer } from '@/components/FormContainer/FormContainer';
import { addShipByAdminAction, updateShipByAdminAction } from '@/app/serverActions';
import { SubmitCancelButtons } from '@/components/SubmitCancelButtons/SubmitCancelButtons';

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
          <SubmitCancelButtons
            isSubmitting={formState.isSubmitting}
            onCancelPath={PATHS.adminShips}
          />
        </form>
      </FormProvider>
    </FormContainer>
  );
};
