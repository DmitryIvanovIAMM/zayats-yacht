import { Column } from '@tanstack/react-table';
import { ChangeEvent, useMemo, useState } from 'react';
import { TextField } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import debounce from 'lodash/debounce';
import { textFieldSizes } from './styles';

const DebouncedTextFilter = ({
                               initialValue,
                               placeholder,
                               onChange
                             }: {
  initialValue: string;
  placeholder: string;
  onChange: (newValue: string) => void;
}) => {
  const [value, setValue] = useState(initialValue);

  const debounceFn = useMemo(() => debounce(onChange, 400), [onChange]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFilterValue = e.currentTarget.value;

    setValue(newFilterValue);
    debounceFn(newFilterValue);
  };

  return (
    <TextField
      size="small"
      margin="dense"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      inputProps={{
        'aria-label': placeholder
      }}
      sx={{
        ...textFieldSizes,
        backgroundColor: 'white',
        '.MuiInputBase-input': {
          p: 0.5
        },
        '.MuiFormLabel-root': {
          ...visuallyHidden
        }
      }}
    />
  );
};

export const TextColumnFilter = <TableData,>({ column }: { column: Column<TableData, unknown> }) => {
  const value = (column.getFilterValue() as string) ?? '';

  const handleFilterChange = (newFilterValue: string) => {
    column.setFilterValue(newFilterValue);
  };

  return (
    <DebouncedTextFilter
      initialValue={value}
      onChange={handleFilterChange}
      placeholder={`Filter by ${(column.columnDef.header as string) ?? ''}`}
    />
  );
};
