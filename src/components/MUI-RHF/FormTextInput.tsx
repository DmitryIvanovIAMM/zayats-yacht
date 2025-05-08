import { Controller, useFormContext } from 'react-hook-form';
import React, { FC, FormEvent } from 'react';
import { TextField, TextFieldProps } from '@mui/material';

export const textFieldStyle = {
  marginBottom: '8px',
  marginTop: '12px',
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
  marginBottom: '5px',
  paddingLeft: '5px',
  paddingRight: '5px'
};

// ? Type of Props the FormInput will receive
export type FormInputTextProps = {
  name: string;
  select?: boolean;
  onValueChange?: (name: string, event: FormEvent) => void;
} & TextFieldProps;

export const defaultRHFSetValueOptions = {
  shouldDirty: true,
  shouldTouch: true,
  shouldValidate: true
};

export const FormTextInput: FC<FormInputTextProps> = ({
  name,
  select = false,
  size,
  color,
  helperText = '',
  onValueChange = null,
  rows,
  slotProps,
  ...otherProps
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field, fieldState: { error } }) => {
        return (
          <div style={{ ...groupWrapperStyle }}>
            <TextField
              {...field}
              select={select}
              variant="standard"
              fullWidth={true}
              size={size || 'small'}
              color={color || 'primary'}
              sx={textFieldStyle}
              {...otherProps}
              error={!!error}
              helperText={(error?.message as unknown as string) || helperText}
              slotProps={{
                htmlInput: {
                  'data-testid': `${name}-form-text-input`,
                  onChange: (event: FormEvent) => onValueChange && onValueChange(name, event),
                  style: { marginBottom: -3 }
                },
                formHelperText: {
                  style: { marginTop: '7px' }
                },
                ...slotProps
              }}
              multiline={!!rows}
              rows={rows ?? 1}
            />
          </div>
        );
      }}
    />
  );
};
