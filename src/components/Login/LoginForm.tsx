'use client';

import Box from '@mui/material/Box';
import { FormTextInput } from '@/components/MUI-RHF/FormTextInput';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  defaultLoginValues,
  LoginForm,
  LoginFormValues,
  loginSchema
} from '@/components/Login/types';
import CircularProgress from '@mui/material/CircularProgress';
import { primary, secondary } from '@/components/colors';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import { signIn } from 'next-auth/react';
import { PATHS } from '@/helpers/paths';
import { sectionContainerSx } from '@/components/ContactUs/ContactUs';

export const centeredSectionSx = {
  ...sectionContainerSx,
  width: '90%',
  maxWidth: '90%',
  marginLeft: 'auto',
  marginRight: 'auto',

  '@media (min-width: 900px)': {
    width: '66%',
    maxWidth: '66%',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
};

export interface LoginFormProps {
  loginRedirectUrl?: string;
}

const LoginForm = ({ loginRedirectUrl = PATHS.landing }: LoginFormProps) => {
  const methods = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: defaultLoginValues,
    shouldFocusError: true,
    shouldUseNativeValidation: false
  });
  const { handleSubmit, formState, reset } = methods;
  const onSubmit = async (data: LoginForm) => {
    console.log('onSubmit().  data: ', data);
    await signIn('credentials', {
      ...data,
      redirect: true,
      callbackUrl: loginRedirectUrl
    });
  };

  return (
    <Box id="login-form" style={{ width: '100%' }}>
      <h2 style={{ textAlign: 'center' }}>Login Form</h2>
      <FormProvider {...methods}>
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: '100%' }}
        >
          <Box sx={{ width: '100%' }}>
            <FormTextInput name={'name'} label={'Full Name *'} fullWidth={true} />
            <FormTextInput name={'email'} label={'Email *'} />
            <FormTextInput name={'password'} label={'Password *'} />
          </Box>
          <div style={{ margin: '20px', textAlign: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              startIcon={
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '48px',
                    height: '24px'
                  }}
                >
                  {formState.isSubmitting ? (
                    <CircularProgress size="20px" sx={{ color: `${primary.contrastText}` }} />
                  ) : (
                    <LoginIcon />
                  )}
                </div>
              }
              style={{ backgroundColor: `${secondary.dark}` }}
              disabled={formState.isSubmitting}
            >
              LogIn
            </Button>
          </div>
        </form>
      </FormProvider>
    </Box>
  );
};

export default LoginForm;
