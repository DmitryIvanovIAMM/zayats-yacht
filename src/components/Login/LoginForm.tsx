'use client';

import Box from '@mui/material/Box';
import { FormTextInput } from '@/components/MUI-RHF/FormTextInput';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { defaultLoginValues, LoginFormValues, loginSchema } from '@/components/Login/types';
import CircularProgress from '@mui/material/CircularProgress';
import { primary, secondary } from '@/components/colors';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import { signIn } from 'next-auth/react';
import { PATHS } from '@/helpers/paths';
import { useRouter } from 'next/navigation';

export interface LoginFormProps {
  loginRedirectUrl?: string;
  error?: string;
}

const LoginForm = ({ loginRedirectUrl = PATHS.landing, error = '' }: LoginFormProps) => {
  const [loginError, setLoginError] = React.useState<string>(error);
  const router = useRouter();
  const methods = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: defaultLoginValues,
    shouldFocusError: true,
    shouldUseNativeValidation: false
  });
  const { handleSubmit, formState } = methods;
  const onSubmit = async (data: LoginFormValues) => {
    setLoginError('');
    const result = await signIn('credentials', {
      ...data,
      redirect: false,
      callbackUrl: loginRedirectUrl
    });
    if (result?.error) {
      setLoginError(result.error);
    } else {
      // navigate to redirect page via next/router
      router.push(loginRedirectUrl);
    }
  };

  return (
    <Box id="login-form" style={{ width: '100%', textAlign: 'center' }}>
      <h2 style={{ textAlign: 'center' }}>Login Form</h2>
      <FormProvider {...methods}>
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: '100%' }}
        >
          <Box sx={{ width: '100%' }}>
            <FormTextInput
              name={'name'}
              type="text"
              label={'Full Name (optional)'}
              fullWidth={true}
            />
            <FormTextInput name={'email'} type="email" label={'Email *'} />
            <FormTextInput name={'password'} label={'Password *'} />
          </Box>
          <h3 style={{ color: 'red', marginTop: '20px' }}>
            {loginError?.length > 0 ? loginError : '\u00A0'}{' '}
          </h3>
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
