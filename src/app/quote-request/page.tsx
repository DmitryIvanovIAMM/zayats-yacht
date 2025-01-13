'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { FormInputText } from '@/components/MUI-RHF/FormInputText';
import {
  defaultQuoteRequest,
  LENGTH_METRIC,
  PURPOSE_OF_TRANSPORT,
  QuoteRequestForm,
  quoteRequestSchema,
  WEIGHT_METRIC
} from '@/app/quote-request/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { centeredSectionSx } from '@/components/AboutUs/AboutUs';
import { Box } from '@mui/material';
import SectionTitle from '@/components/SectionTitle/SectionTitle';
import React from 'react';
import { FormTextInput } from '@/components/MUI-RHF/FormTextInput';
import { FormSelector } from '@/components/MUI-RHF/FormSelector';

export default function GetQuote() {
  const methods = useForm<QuoteRequestForm>({
    resolver: yupResolver(quoteRequestSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: defaultQuoteRequest,
    shouldFocusError: true,
    shouldUseNativeValidation: false
  });
  const { handleSubmit, formState, getValues } = methods;
  console.log('formState: ', formState);
  console.log('formState.values: ', getValues());
  console.log('formState.errors: ', formState.errors);
  const onSubmit = (data: QuoteRequestForm) => {
    console.log(data);
  };

  return (
    <Box id="faq" sx={{ ...centeredSectionSx, color: 'secondary.dark' }}>
      <SectionTitle title="Get Quote" />
      <FormProvider {...methods}>
        <form noValidate autoComplete="off" onSubmit={methods.handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap'
            }}
          >
            <Box sx={{ flex: { xs: '100%', sm: '50%' } }}>
              <FormTextInput name={'firstName'} label={'First Name *'} />
              <FormTextInput name={'lastName'} label={'Last Name *'} />
              <FormTextInput name={'phone'} label={'Phone *'} />
              <FormTextInput name={'email'} label={'Email *'} />
              <FormTextInput name={'bestTimeToContact'} label={'Best Time to Contact'} />
              <FormSelector
                name={'purposeOfTransport'}
                label={'Purpose of Transport'}
                options={PURPOSE_OF_TRANSPORT}
                style={{ marginTop: '14px' }}
              />
            </Box>
            <Box sx={{ flex: { xs: '100%', sm: '50%' } }}>
              <FormTextInput name={'yachtName'} label={'Yacht Name'} />
              <FormTextInput name={'yachtModel'} label={'Yacht Model'} />
              <FormTextInput name={'insuredValue'} label={'Insured Value in USD'} />
              <Box sx={{ flex: { xs: '100%', sm: '50%' } }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                  <Box sx={{ flex: { xs: '50%', sm: '50%', md: '50%', lg: '60%' } }}>
                    <FormTextInput name={'length'} label={'Length'} />
                  </Box>
                  <Box sx={{ flex: { xs: '50%', sm: '50%', md: '50%', lg: '40%' } }}>
                    <FormSelector
                      name={'lengthUnit'}
                      label={'Length Unit'}
                      options={LENGTH_METRIC}
                    />
                  </Box>
                </Box>
              </Box>
              <Box sx={{ flex: { xs: '100%', sm: '50%' } }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                  <Box sx={{ flex: { xs: '50%', sm: '50%', md: '50%', lg: '60%' } }}>
                    <FormTextInput name={'beam'} label={'Beam'} />
                  </Box>
                  <Box sx={{ flex: { xs: '50%', sm: '50%', md: '50%', lg: '40%' } }}>
                    <FormSelector name={'beamUnit'} label={'Beam Unit'} options={LENGTH_METRIC} />
                  </Box>
                </Box>
              </Box>
              <Box sx={{ flex: { xs: '100%', sm: '50%' } }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                  <Box sx={{ flex: { xs: '50%', sm: '50%', md: '50%', lg: '60%' } }}>
                    <FormTextInput name={'weight'} label={'Weight'} />
                  </Box>
                  <Box sx={{ flex: { xs: '50%', sm: '50%', md: '50%', lg: '40%' } }}>
                    <FormSelector
                      name={'weightUnit'}
                      label={'Weight Unit'}
                      options={WEIGHT_METRIC}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{ flex: { xs: '100%', sm: '30%' } }}>
              <FormTextInput name={'fromWhere'} label={'From Where'} />
            </Box>
            <Box sx={{ flex: { xs: '100%', sm: '30%' } }}>
              <FormTextInput name={'toWhere'} label={'To Where'} />
            </Box>
            <Box sx={{ flex: { xs: '100%', sm: '30%' } }}>
              <FormTextInput name={'when'} label={'When'} />
            </Box>
            <Box sx={{ flex: '100%' }}>
              <FormTextInput name={'notes'} label={'Notes'} rows={2} />
            </Box>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
}
