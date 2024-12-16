import { primary } from '@/components/colors';

export const rootSx = {
  width: '270px',
  padding: '8px 0',
  margin: 'auto',
  marginTop: '2px',
  marginBottom: '10px',
  position: 'relative',
  '& .MuiInputBase-input': {
    borderColor: '#3365A7',
    color: '#3365A7',
    fontWeight: 'bold',
    '& fieldset': {
      borderColor: '#3365A7'
    }
  },
  '& .MuiInputLabel-root': {
    color: '#3365A7'
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#3365A7'
    }
  },
  '& .MuiFormControl-root': {
    color: '#c'
  },
  '& .MuiFormLabel-root': {
    border: 'none'
  },
  '& label': {
    width: 'auto',
    margin: '0'
  },
  '& .MuiIconButton-root': {
    color: '#3365A7'
  },
  '& .MuiInput-underline-root': {
    color: '#3365A7'
  }
};

export const yearsListSx = {
  position: 'absolute',
  top: 'initial',
  left: '50%',
  margin: 'auto',
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  backgroundColor: '#006EB9',
  boxShadow: '10px 10px 20px rgba(0, 117, 255, 0.15)',
  transform: 'translateX(-50%)',
  zIndex: 11
};

export const pickerRootSx = {
  backgroundColor: '#006EB9',
  color: 'white',
  minWidth: '240px',
  width: '100%',
  padding: '15px'
};

export const monthsWrapperStyle = {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  alignItems: 'center',
  justifyItems: 'center'
};

export const monthBtnStyle = {
  boxShadow: 'none',
  background: 'transparent',
  border: '1px solid transparent',
  color: 'white',
  width: '50px',
  height: '50px',
  cursor: 'pointer',
  fontSize: '1.0em',
  borderRadius: '50%',
  transition: 'border .4s',
  textAlign: 'center',
  textTransform: 'none',
  padding: '0px',
  margin: '0px',
  '&:hover': {
    border: `2px solid ${primary.contrastText}`
  },
  '&:focus': {
    border: '1px solid transparent'
  }
};

export const selectedEdgeMonthSx = {
  '& button': {
    background: primary.contrastText,
    color: primary.main
  }
};

export const edgeMonthConnectorLineSx = {
  '& button': {
    background: primary.contrastText,
    color: primary.main
  },
  '&::after': {
    content: "' '",
    position: 'absolute',
    width: '50%',
    height: '70%',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: '#e0e0e0',
    color: primary.light,
    zIndex: -1
  }
};

export const edgeMonthConnectorLineRightSx = {
  '& button': {
    background: primary.contrastText,
    color: primary.main
  },
  '&::after': {
    content: "' '",
    position: 'absolute',
    width: '50%',
    height: '70%',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: '#e0e0e0',
    zIndex: -1,
    right: 0
  }
};

export const edgeMonthConnectorLineLeftSx = {
  '& button': {
    background: primary.contrastText,
    color: primary.main
  },
  '&::after': {
    content: "' '",
    position: 'absolute',
    width: '50%',
    height: '70%',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: '#e0e0e0',
    color: 'red',
    zIndex: -1,
    left: 0
  }
};

export const selectedMonthSx = {
  '& button': {
    color: primary.main
  },
  '&::after': {
    content: "' '",
    position: 'absolute',
    left: 0,
    width: '100%',
    height: '70%',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: '#e0e0e0',
    zIndex: -1
  }
};

export const monthContainerSx = {
  position: 'relative',
  width: '100%',
  textAlign: 'center',
  zIndex: 1
};
