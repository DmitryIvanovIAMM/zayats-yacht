import React from 'react';
import { SxProps } from '@mui/material';

export const noStopsStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '20px',
  marginBottom: '20px',
  fontSize: '1.1em'
};

export const stopsHeaderStyle: React.CSSProperties = {
  display: 'flex',
  flex: '100%',
  alignItems: 'center',
  marginTop: '10px',
  marginBottom: '10px',
  justifyContent: 'space-between'
};

export const stopWrapperStyle: React.CSSProperties = {
  display: 'flex',
  flex: '100%',
  flexWrap: 'wrap',
  width: '100%',
  borderWidth: '1px',
  borderColor: 'black',
  borderStyle: 'dotted',
  justifyContent: 'center',
  alignItems: 'start',
  justifyItems: 'center',
  paddingBottom: '14px'
};

export const dropdownWrapperSx: SxProps = {
  flex: { xs: '100%', sm: '50%' },
  width: '100%',
  marginTop: '3px',
  marginBottom: '3px',
  paddingRight: '5px',
  paddingLeft: '0px',
  paddingTop: '3px'
};

export const datepickerWrapperSx: SxProps = {
  flex: { xs: '99%', sm: '50%' },
  width: '100%',
  marginTop: '3px',
  marginBottom: '3px',
  paddingLeft: '5px',
  paddingRight: '5px'
};

export const buttonWrapperSx: SxProps = {
  flex: { xs: '100%' },
  width: '100%',
  textAlign: 'center',
  padding: '5px'
};

export const milesWrapperSx: SxProps = {
  flex: { xs: '100%', sm: '50%' },
  width: '100%',
  marginTop: '3px',
  marginBottom: '3px',
  paddingLeft: '0px',
  paddingRight: '5px',
  paddingTop: '3px'
};
