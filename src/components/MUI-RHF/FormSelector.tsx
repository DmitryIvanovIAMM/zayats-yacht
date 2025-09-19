import React, { FC } from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { WEIGHT_METRIC } from '@/components/QuoteRequest/types';
import {
  defaultRHFSetValueOptions,
  FormInputTextProps,
  groupWrapperStyle
} from '@/components/MUI-RHF/FormTextInput';
import { Controller, useFormContext } from 'react-hook-form';
import { errorColor } from '@/components/colors';

export const FormSelector: FC<FormInputTextProps & { options: Record<string, string> }> = ({
  name,
  label = '',
  style,
  size = 'small',
  options
}) => {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <div
            style={{
              ...groupWrapperStyle,
              paddingLeft: '10px',
              marginTop: '9px',
              paddingRight: '2px',
              ...style
            }}
          >
            <FormControl fullWidth={true} variant="standard">
              <InputLabel>{label}</InputLabel>
              <Select
                size={size}
                onChange={(event) => {
                  setValue(name, event.target.value, defaultRHFSetValueOptions);
                }}
                value={field.value}
                inputProps={{
                  MenuProps: { disableScrollLock: true },
                  'data-testid': `${name}-form-selector-input`
                }}
                error={!!error}
                data-testid={`${name}-form-select`}
              >
                {Object.entries(options).map(([key, value]) => (
                  <MenuItem value={key} key={`weightMetricKey${key}`}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
              {!!error && (
                <FormHelperText
                  style={{
                    color: errorColor.main,
                    position: 'absolute',
                    top: '44px',
                    marginLeft: '1px',
                    whiteSpace: 'normal',
                    margin: '3px',
                    overflowWrap: 'break-word'
                  }}
                >
                  {error?.message as unknown as string}
                </FormHelperText>
              )}
            </FormControl>
          </div>
        );
      }}
    />
  );
};
