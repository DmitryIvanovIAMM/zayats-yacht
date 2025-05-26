'use client';

import { useRouter } from 'next/navigation';
import { Box } from '@mui/material';
import { useSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormTextInput } from '@/components/MUI-RHF/FormTextInput';
import React, { ChangeEvent } from 'react';
import { PATHS } from '@/helpers/paths';
import { FormMode } from '@/utils/types';
import { Messages } from '@/helpers/messages';
import { FormContainer } from '@/components/FormContainer/FormContainer';
import { addPortByAdminAction, updatePortByAdminAction } from '@/app/serverActions';
import { PortForm, portSchema } from '@/components/AdminDashboard/AdminPorts/Port/types';
import { SubmitCancelButtons } from '@/components/SubmitCancelButtons/SubmitCancelButtons';
import { getFormAsFormData } from '@/utils/formHelpers/formHelpers';
import Button from '@mui/material/Button';
import { secondary } from '@/components/colors';
import { getSrcImageNameByStorageName } from '@/utils/views';
import Image from 'next/image';

export const acceptableMimeTypes = 'image/x-png,image/png,image/jpeg,image/svg+xml,image/webp';
export const allowedFileSizeInBytes = Math.pow(2, 20) * 10; // 10 megabytes
export const maxAllowedSizeWithoutCrop = Math.pow(2, 10) * 100; //100 kilobytes

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
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [portFile, setPortFile] = React.useState<File | null>(null);
  const [portImage, setPortImage] = React.useState<string | null>(
    formMode === FormMode.ADD
      ? null
      : initialValues?.imageFileName
        ? getSrcImageNameByStorageName(initialValues.imageFileName)
        : null
  );

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
      const portFormData = getFormAsFormData<Partial<PortForm>>(portForm, []);
      if (portFile) {
        portFormData.append('port-image', portFile);
      }
      const result =
        formMode === FormMode.ADD
          ? await addPortByAdminAction(portFormData)
          : await updatePortByAdminAction(_id as string, portFormData);
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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setPortImage(URL.createObjectURL(event.target.files[0]));
      setPortFile(event.target.files[0]);
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            {portImage ? (
              <div style={{ margin: '20px' }}>
                <Image src={portImage} width={200} height={200} alt="Port" />
              </div>
            ) : (
              <div
                style={{
                  height: '200px',
                  width: '200px',
                  fontSize: '22px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: '1px',
                  borderColor: secondary.dark,
                  borderStyle: 'dashed',
                  margin: '20px'
                }}
              >
                No image
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <input
                accept={acceptableMimeTypes || 'image/*'}
                type="file"
                id="image-selector"
                onChange={handleFileChange}
                ref={fileInputRef}
                //style={uploadFileBtnStyles.input}
                style={{ display: 'none' }}
              />
              <label htmlFor="image-selector">
                <Button
                  color="primary"
                  component="span"
                  variant="outlined"
                  style={{ color: secondary.dark, borderColor: secondary.dark }}
                >
                  Select File
                </Button>
              </label>
            </div>
            <div
              style={{
                display: 'flex',
                textAlign: 'center',
                marginTop: '10px',
                marginBottom: '20px'
              }}
            >
              Allowed formats: .PNG, .JPG, .SVG; Up to {maxAllowedSizeWithoutCrop / Math.pow(2, 10)}{' '}
              kb
            </div>
          </div>
          <SubmitCancelButtons
            isSubmitting={formState.isSubmitting}
            onCancelPath={PATHS.adminPorts}
          />
        </form>
      </FormProvider>
    </FormContainer>
  );
};
