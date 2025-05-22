'use client';

import { useRouter } from 'next/navigation';
import { Box } from '@mui/material';
import { useSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormTextInput } from '@/components/MUI-RHF/FormTextInput';
import React from 'react';
import { PATHS } from '@/helpers/paths';
import { FormMode } from '@/utils/types';
import { Messages } from '@/helpers/messages';
import { FormContainer } from '@/components/FormContainer/FormContainer';
import { addPortByAdminAction, updatePortByAdminAction } from '@/app/serverActions';
import { PortForm, portSchema } from '@/components/AdminDashboard/AdminPorts/Port/types';
import { SubmitCancelButtons } from '@/components/SubmitCancelButtons/SubmitCancelButtons';

export interface PortContainerProps {
  formMode: FormMode;
  initialValues: PortForm;
  _id?: string;
}

export const PortFormContainer = ({
  formMode,
  initialValues,
  _id = undefined
}: PortContainerProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const methods = useForm<PortForm>({
    resolver: yupResolver(portSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: initialValues,
    shouldFocusError: true,
    shouldUseNativeValidation: false
  });
  const { handleSubmit, formState } = methods;

  const onSubmit = async (portForm: PortForm) => {
    try {
      const result =
        formMode === FormMode.ADD
          ? await addPortByAdminAction(portForm)
          : await updatePortByAdminAction(_id as string, portForm);
      if (!result.success) {
        return enqueueSnackbar(result.message, { variant: 'error' });
      }
      router.push(PATHS.adminPorts);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error: ', error);
      enqueueSnackbar(
        formMode === FormMode.ADD ? Messages.FailedAddPort : Messages.FailedUpdatePort,
        { variant: 'error' }
      );
    }
  };

  return (
    <FormContainer>
      <h2>{formMode === FormMode.ADD ? 'Add Port' : 'Edit Port'}</h2>
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
              <FormTextInput name={'portName'} label={'Name *'} />
            </Box>
            <Box sx={{ flex: { xs: '100%', sm: '50%' } }}>
              <FormTextInput name={'destinationName'} label={'Destination *'} />
            </Box>
          </div>
          <SubmitCancelButtons
            isSubmitting={formState.isSubmitting}
            onCancelPath={PATHS.adminPorts}
          />
          {/*<Box*/}
          {/*  sx={{*/}
          {/*    display: 'flex',*/}
          {/*    flex: { xs: '100%' },*/}
          {/*    marginTop: '20px',*/}
          {/*    marginBottom: '20px',*/}
          {/*    justifyContent: 'space-around'*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <Button*/}
          {/*    type="button"*/}
          {/*    variant="outlined"*/}
          {/*    style={{ color: secondary.dark, borderColor: secondary.dark }}*/}
          {/*    endIcon={*/}
          {/*      <div*/}
          {/*        style={{*/}
          {/*          display: 'flex',*/}
          {/*          alignItems: 'center',*/}
          {/*          width: '24px',*/}
          {/*          height: '24px'*/}
          {/*        }}*/}
          {/*      >*/}
          {/*        <HighlightOffIcon />*/}
          {/*      </div>*/}
          {/*    }*/}
          {/*    disabled={formState.isSubmitting}*/}
          {/*    href={PATHS.adminPorts}*/}
          {/*    data-testid="cancel-port-button"*/}
          {/*  >*/}
          {/*    Cancel*/}
          {/*  </Button>*/}
          {/*  <Button*/}
          {/*    type="submit"*/}
          {/*    variant="contained"*/}
          {/*    endIcon={*/}
          {/*      <div*/}
          {/*        style={{*/}
          {/*          display: 'flex',*/}
          {/*          alignItems: 'center',*/}
          {/*          width: '24px',*/}
          {/*          height: '24px'*/}
          {/*        }}*/}
          {/*      >*/}
          {/*        {formState.isSubmitting ? (*/}
          {/*          <CircularProgress size="20px" sx={{ color: `${primary.contrastText}` }} />*/}
          {/*        ) : (*/}
          {/*          <SendIcon />*/}
          {/*        )}*/}
          {/*      </div>*/}
          {/*    }*/}
          {/*    style={{ backgroundColor: `${secondary.dark}` }}*/}
          {/*    disabled={formState.isSubmitting}*/}
          {/*    data-testid="submit-port-button"*/}
          {/*  >*/}
          {/*    Submit*/}
          {/*  </Button>*/}
          {/*</Box>*/}
        </form>
      </FormProvider>
    </FormContainer>
  );
};
