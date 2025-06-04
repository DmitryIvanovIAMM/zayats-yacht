import { Controller, useFormContext } from 'react-hook-form';
import React, { FC, FormEvent } from 'react';
import { FormHelperText, TextField, TextFieldProps } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
//import { PickerValue } from '@mui/x-date-pickers/internals';
import { getNestedValue } from '@/utils/getNestedValue';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { errorColor } from '@/components/colors';

export const textFieldStyle = {
  marginBottom: '8px',
  //marginTop: '12px',
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
  //flex: '100%'
};

// ? Type of Props the FormInput will receive
export type DatePickerInputProps = {
  name: string;
  select?: boolean;
  onValueChange?: (name: string, event: FormEvent) => void;
} & TextFieldProps;

export const defaultRHFSetValueOptions = {
  shouldDirty: true,
  shouldTouch: true,
  shouldValidate: true
};

export const DatePickerInput: FC<DatePickerInputProps> = ({
  name,
  size,
  color,
  helperText = '',
  onValueChange = null,
  ...otherProps
}) => {
  const {
    control,
    setValue,
    formState: { errors }
  } = useFormContext();

  // const handleValueChanged = (date: PickerValue) => {
  //   console.log('handleValueChanged().  date: ', date);
  //   console.log('date: ', date?.toDate());
  //   setValue(name, new Date(date?.toDate()));
  // };

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field: { value, onChange, ...restField }, fieldState: { error } }) => {
        //console.log('error: ', error);
        //console.log('field.value: ', value);

        return (
          <div style={{ ...groupWrapperStyle }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                {...restField}
                //label={helperText}
                sx={{ width: '100%' }}
                value={value}
                closeOnSelect={true}
                //name={name}
                //onChange={(date) => handleValueChanged(date)}
                //onAccept={(date) => handleValueChanged(date)}
                // onAccept={(date) => {
                //   console.log('onAccept().  date: ', date);
                //   onChange(date);
                //   //onValueChange && onValueChange(date);
                // }}
                onChange={(date) => {
                  console.log('onChange().  date: ', date);
                  onChange(date);
                  //onValueChange && onValueChange(date);
                }}
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
                    // helperText:
                    //   (getNestedValue(errors, name)?.message as unknown as string) || helperText,
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
              {/*<TextField*/}
              {/*  {...field}*/}
              {/*  select={select}*/}
              {/*  variant="standard"*/}
              {/*  fullWidth={true}*/}
              {/*  size={size || 'small'}*/}
              {/*  color={color || 'primary'}*/}
              {/*  sx={textFieldStyle}*/}
              {/*  {...otherProps}*/}
              {/*  error={!!error}*/}
              {/*  helperText={(error?.message as unknown as string) || helperText}*/}
              {/*  slotProps={{*/}
              {/*    htmlInput: {*/}
              {/*      'data-testid': `${name}-form-text-input`,*/}
              {/*      onChange: (event: FormEvent) => onValueChange && onValueChange(name, event),*/}
              {/*      style: { marginBottom: -3 }*/}
              {/*    },*/}
              {/*    formHelperText: {*/}
              {/*      style: { marginTop: '7px' }*/}
              {/*    },*/}
              {/*    ...slotProps*/}
              {/*  }}*/}
              {/*  multiline={!!rows}*/}
              {/*  rows={rows ?? 1}*/}
              {/*/>*/}
            </LocalizationProvider>
          </div>
        );
      }}
    />
  );
};
/*

return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field: { value, onChange, ...restField } }) => {
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              {...restField}
              format={monthDayYearDateFormat}
              value={value}
              closeOnSelect
              inputRef={dateInputRef}
              disabled={false}
              onChange={(date) => {
                onChange(date);
                onValueChange && onValueChange(date);
              }}
              slotProps={{
                textField: {
                  variant: 'outlined',
                  fullWidth: true,
                  inputProps: {
                    name: `${name}`,
                    'data-testid': `${name}-date-input`
                  },
                  size: size || 'small',
                  color: color || 'primary',
                  sx: textFieldStyle,
                  error: !!getNestedValue(errors, name),
                  helperText: (getNestedValue(errors, name)?.message as unknown as string) || helperText,
                  InputProps: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton aria-label="select date" size="small" onClick={handleIconClicked} edge="end">
                          <CalendarMonthIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    )
                  },
                  ...otherProps
                }
              }}
            />
          </LocalizationProvider>
        );
      }}
    />
  );
 */
