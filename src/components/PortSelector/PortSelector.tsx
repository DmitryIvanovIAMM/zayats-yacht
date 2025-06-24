import React, { FC } from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material';
import { PortFrontend } from '@/models/PortFrontend';

const formControlSx = {
  margin: 'auto',
  marginTop: '10px',
  marginBottom: '10px',
  minWidth: 80,
  position: 'relative',
  width: 270,
  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    borderColor: '#3365A7',
    borderRadius: '1px'
  },
  '& .MuiInputLabel-outlined': {
    color: '#3365A7',
    fontWeight: 'bold',
    margin: 'auto'
  },
  '& .MuiFormLabel-root': {
    border: 'none'
  },
  '& .MuiInputLabel-shrink': {
    transform: 'translate(14px, 4px) scale(0.75)'
  }
};

export interface PortSelectorProps {
  selectedPort: string;
  ports: PortFrontend[];
  label: string;
  errors: any;
  onSelect: (portId: string) => void;
  name?: string;
}

const PortSelector: FC<PortSelectorProps> = (props) => {
  function handleChange(event: SelectChangeEvent<string>) {
    if (props.selectedPort !== event.target.value) {
      props.onSelect(event.target.value);
    }
  }

  return (
    <FormControl
      sx={formControlSx}
      variant="outlined"
      data-testid="port-selector-for-control"
      id={`port-selector-${props.label}`}
    >
      <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
      <Select
        value={props.selectedPort}
        onChange={handleChange}
        name={props.name}
        id={props.name}
        inputProps={{
          MenuProps: { disableScrollLock: true },
          'data-testid': 'port-selector-input'
        }}
        data-testid="port-selector"
        SelectDisplayProps={{
          'aria-label': `port-selector-${props.label}`
        }}
      >
        {props.ports.map((port, index) => (
          <MenuItem
            value={(port._id ?? '').toString()}
            key={`portSelectorKey${index}`}
            data-testid="menu-item"
          >
            {port.portName}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error>{props.errors}</FormHelperText>
    </FormControl>
  );
};

export default PortSelector;
