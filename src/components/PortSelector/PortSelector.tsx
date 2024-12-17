import React, { FC } from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material';
import { Port } from '@/models/Port';

const formControlSx = {
  //margin: theme.spacing(1),
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
/*const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    //marginTop: '10px',
    //marginBottom: '10px',
    paddingTop: '10px',
    paddingBottom: '10px'
  },
  formControl: {
    //margin: theme.spacing(1),
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
  }
}));*/

export interface PortSelectorProps {
  selectedPort: string;
  ports: Port[];
  label: string;
  errors: any;
  onSelect: (portId: string) => void;
  name?: string;
}

const PortSelector: FC<PortSelectorProps> = (props) => {
  //const classes = useStyles();

  function handleChange(event: SelectChangeEvent<string>) {
    if (props.selectedPort !== event.target.value) {
      props.onSelect(event.target.value);
    }
  }

  return (
    <FormControl sx={formControlSx} variant="outlined" data-testid="port-selector-for-control">
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
      >
        {props.ports.map((port, index) => {
          console.log('port: ', port);
          return (
            <MenuItem
              value={port._id.toString()}
              key={`portSelectorKey${index}`}
              data-testid="menu-item"
            >
              {port.portName}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText error>{props.errors}</FormHelperText>
    </FormControl>
  );
};

export default PortSelector;
