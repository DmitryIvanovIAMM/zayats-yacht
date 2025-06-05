import { Controller, useFormContext } from 'react-hook-form';
import React, { FC, FormEvent } from 'react';
import { FormHelperText, TextFieldProps } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { getNestedValue } from '@/utils/getNestedValue';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { errorColor } from '@/components/colors';

export const textFieldStyle = {
  marginBottom: '8px',
  marginLeft: '5px',
  marginRight: '5px',
  '& label': {
    color: '#666',
    fontSize: 16
  },
  '& p': {
    position: 'absolute',
    top: '38px',
    marginLeft: '1px',
    whiteSpace: 'wrap',
    margin: '3px',
    textWrap: 'pretty'
  }
};

export const groupWrapperStyle: React.CSSProperties = {
  width: '100%',
  position: 'relative',
  paddingBottom: '0px',
  paddingRight: '10px',
  marginLeft: '0px',
  marginRight: '0px'
};

// ? Type of Props the FormInput will receive
export type DatePickerInputProps = {
  name: string;
  select?: boolean;
  onValueChange?: (name: string, event: FormEvent) => void;
} & TextFieldProps;

export const DatePickerInput: FC<DatePickerInputProps> = ({ name, size, color, ...otherProps }) => {
  const {
    control,
    formState: { errors }
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field: { value, onChange, ...restField }, fieldState: { error } }) => {
        return (
          <div style={{ ...groupWrapperStyle }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                {...restField}
                sx={{ width: '100%' }}
                value={value}
                closeOnSelect={true}
                onChange={(date) => {
                  onChange(date);
                }}
                data-testid={`${name}-form-datepicker`}
                slotProps={{
                  textField: {
                    variant: 'standard',
                    fullWidth: true,
                    inputProps: {
                      name: `${name}`,
                      'data-testid': `${name}-date-input`
                    },
                    size: size || 'small',
                    color: color || 'primary',
                    sx: textFieldStyle,
                    error: !!getNestedValue(errors, name),
                    ...otherProps
                  }
                }}
              />
              {!!error && (
                <FormHelperText
                  style={{
                    color: errorColor.main,
                    position: 'absolute',
                    top: '44px',
                    marginLeft: '13px',
                    whiteSpace: 'wrap',
                    margin: '3px',
                    textWrap: 'pretty'
                  }}
                >
                  {error?.message as unknown as string}
                </FormHelperText>
              )}
            </LocalizationProvider>
          </div>
        );
      }}
    />
  );
};
