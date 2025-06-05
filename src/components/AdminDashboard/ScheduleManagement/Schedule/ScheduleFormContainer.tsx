'use client';

import {
  emptyShipStop,
  ScheduleForm,
  scheduleSchema
} from '@/components/AdminDashboard/ScheduleManagement/Schedule/types';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormMode } from '@/utils/types';
import { SubmitCancelButtons } from '@/components/SubmitCancelButtons/SubmitCancelButtons';
import { PATHS } from '@/helpers/paths';
import { FormContainer } from '@/components/FormContainer/FormContainer';
import React from 'react';
import { addScheduleByAdminAction, updateScheduleByAdminAction } from '@/app/serverActions';
import { Messages } from '@/helpers/messages';
import { Box } from '@mui/material';
import { FormTextInput } from '@/components/MUI-RHF/FormTextInput';
import { FormSelector } from '@/components/MUI-RHF/FormSelector';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import { DatePickerInput } from '@/components/MUI-RHF/DatePickerInput';
import {
  buttonWrapperSx,
  datepickerWrapperSx,
  dropdownWrapperSx,
  milesWrapperSx,
  noStopsStyle,
  stopsHeaderStyle,
  stopWrapperStyle
} from '@/components/AdminDashboard/ScheduleManagement/Schedule/styles';

export interface ScheduleFormContainerProps {
  formMode: FormMode;
  initialValues?: ScheduleForm;
  _id?: string;
  portsOptions: Record<string, string>;
  shipsOptions: Record<string, string>;
}
export const ScheduleFormContainer = ({
  formMode,
  initialValues,
  _id,
  portsOptions = {},
  shipsOptions = {}
}: ScheduleFormContainerProps) => {
  console.log('ScheduleFormContainer(). formMode: ', formMode);
  console.log('portsOptions: ', portsOptions);
  console.log('shipsOptions: ', shipsOptions);

  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const methods = useForm<ScheduleForm>({
    resolver: yupResolver(scheduleSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: initialValues,
    shouldFocusError: true,
    shouldUseNativeValidation: false
  });
  const { handleSubmit, formState, setValue, watch } = methods;
  const shipStops = watch('shipStops');
  console.log('shipStops: ', shipStops);
  console.log('errors: ', formState.errors);

  const onSubmit = async (scheduleForm: ScheduleForm) => {
    console.log('onSubmit().  scheduleForm: ', scheduleForm);
    try {
      const result =
        formMode === FormMode.ADD
          ? await addScheduleByAdminAction(scheduleForm)
          : await updateScheduleByAdminAction(_id as string, scheduleForm);
      if (!result.success) {
        return enqueueSnackbar(result?.message, { variant: 'error' });
      }
      router.push(PATHS.adminScheduleManagement);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error: ', error);
      enqueueSnackbar(
        formMode === FormMode.ADD ? Messages.FailedAddSchedule : Messages.FailedUpdateSchedule,
        { variant: 'error' }
      );
    }
  };

  const handleAddStop = () => {
    console.log('Add stop clicked');
    const shipStops = watch('shipStops') || [];
    console.log('Current shipStops: ', shipStops);
    shipStops.push(emptyShipStop);
    setValue('shipStops', shipStops);
  };

  const handleRemoveStop = (index: number) => {
    console.log('Remove stop clicked for index: ', index);
    const shipStops = watch('shipStops') || [];
    console.log('Current shipStops before removal: ', shipStops);
    shipStops.splice(index, 1);
    setValue('shipStops', shipStops);
    console.log('Current shipStops after removal: ', shipStops);
  };

  return (
    <FormContainer>
      <h2>{formMode === FormMode.ADD ? 'Add Schedule' : 'Edit Schedule'}</h2>
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
              <FormTextInput name="name" label="Sailing Name *" size="small" />
            </Box>
            <Box sx={{ flex: { xs: '100%', sm: '50%' }, paddingTop: '9px' }}>
              <FormSelector
                name={'shipId'}
                label={'Ship *'}
                options={shipsOptions}
                style={{ marginTop: '0px' }}
              />
            </Box>
            <div style={stopsHeaderStyle}>
              <h3>Stops</h3>
              <div
                style={{
                  marginLeft: '40px',
                  cursor: 'pointer'
                }}
              >
                <AddCircleOutlineIcon onClick={handleAddStop} />
              </div>
            </div>
            <div style={{ flex: '100%' }}>
              {(shipStops?.length || 0) === 0 ? (
                <div style={noStopsStyle}>
                  <p>No stops added yet.</p>
                  <p>Click the &#39;+&#39; icon to add a stop.</p>
                </div>
              ) : (
                shipStops?.map((shipStops, index) => {
                  return (
                    <div style={stopWrapperStyle} key={`shipStopKes_${index}`}>
                      <Box sx={{ ...dropdownWrapperSx }}>
                        <FormSelector
                          name={`shipStops.${index}.portId`}
                          label={'Port *'}
                          options={portsOptions}
                          style={{ marginTop: '0px' }}
                        />
                      </Box>
                      <Box sx={milesWrapperSx}>
                        <FormTextInput
                          name={`shipStops.${index}.miles`}
                          type="number"
                          label="Miles *"
                          size="small"
                          style={{ marginTop: '3px' }}
                        />
                      </Box>
                      <Box sx={datepickerWrapperSx}>
                        <DatePickerInput
                          name={`shipStops.${index}.arrivalOn`}
                          label={'Arrival Date *'}
                        />
                      </Box>
                      <Box sx={datepickerWrapperSx}>
                        <DatePickerInput
                          name={`shipStops.${index}.departureOn`}
                          label={'Departure Date *'}
                        />
                      </Box>
                      <Box sx={buttonWrapperSx}>
                        <IconButton
                          onClick={() => handleRemoveStop(index)}
                          data-testid="port-delete-button"
                          sx={{
                            paddingLeft: '5px',
                            paddingRight: '5px'
                          }}
                        >
                          <DeleteForeverIcon sx={{ fontSize: '28px' }} color="error" />
                        </IconButton>
                      </Box>
                    </div>
                  );
                })
              )}
            </div>
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
