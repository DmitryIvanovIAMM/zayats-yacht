import React, { FC } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { WEIGHT_METRIC } from '@/app/quote-request/types';
import { FormInputTextProps, groupWrapperStyle } from '@/components/MUI-RHF/FormTextInput';
import { Controller, useFormContext } from 'react-hook-form';

export const FormSelector: FC<FormInputTextProps & { options: Record<string, string> }> = ({
  name,
  label = '',
  style,
  options
}) => {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field, fieldState: { error } }) => {
        return (
          <div style={{ ...groupWrapperStyle, marginTop: '9px', marginLeft: '6px', ...style }}>
            <FormControl fullWidth={true} variant="standard">
              <InputLabel>{label}</InputLabel>
              <Select
                onChange={(event) => {
                  setValue(name, event.target.value);
                }}
                defaultValue={WEIGHT_METRIC.metricTons}
                value={field.value}
                inputProps={{
                  MenuProps: { disableScrollLock: true },
                  'data-testid': 'port-selector-input'
                }}
              >
                {Object.values(options).map((metric) => (
                  <MenuItem value={metric} key={`weightMetricKey${metric}`}>
                    {metric}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        );
      }}
    />
  );
};
