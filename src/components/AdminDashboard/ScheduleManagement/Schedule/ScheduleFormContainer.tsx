import {
  ScheduleForm,
  scheduleSchema
} from '@/components/AdminDashboard/ScheduleManagement/Schedule/types';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormMode } from '@/utils/types';
import { SubmitCancelButtons } from '@/components/SubmitCancelButtons/SubmitCancelButtons';
import { PATHS } from '@/helpers/paths';
import { FormContainer } from '@/components/FormContainer/FormContainer';
import React from 'react';
import { addScheduleByAdminAction, updateScheduleByAdminAction } from '@/app/serverActions';
import { Messages } from '@/helpers/messages';

export interface ScheduleFormContainerProps {
  formMode: FormMode;
  initialValues?: ScheduleForm;
  _id?: string;
}
export const ScheduleFormContainer = ({
  formMode,
  initialValues,
  _id
}: ScheduleFormContainerProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const methods = useForm<ScheduleForm>({
    resolver: yupResolver(scheduleSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: initialValues,
    shouldFocusError: true,
    shouldUseNativeValidation: false
  });
  const { handleSubmit, formState } = methods;

  const onSubmit = async (scheduleForm: ScheduleForm) => {
    try {
      const result =
        formMode === FormMode.ADD
          ? await addScheduleByAdminAction(scheduleForm)
          : await updateScheduleByAdminAction(_id as string, scheduleForm);
      if (!result.success) {
        return enqueueSnackbar(result?.message, { variant: 'error' });
      }
      router.push(PATHS.adminShips);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error: ', error);
      enqueueSnackbar(
        formMode === FormMode.ADD ? Messages.FailedAddSchedule : Messages.FailedUpdateSchedule,
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
          ></div>
          <SubmitCancelButtons
            isSubmitting={formState.isSubmitting}
            onCancelPath={PATHS.adminShips}
          />
        </form>
      </FormProvider>
    </FormContainer>
  );
};
