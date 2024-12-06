import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '270px',
    padding: '8px 0',
    margin: 'auto',
    position: 'relative',
    '& .MuiInputBase-input': {
      color: '#3365A7',
      fontWeight: 'bold'
    },
    '& .MuiInputLabel-root': {
      color: '#3365A7'
    },
    '& .MuiFormControl-root': {
      color: '#3365A7'
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
  },
  monthInput: {
    width: '270px',
    margin: theme.spacing(1)
  },
  yearsList: {
    position: 'absolute',
    top: 'initial',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    margin: 'auto',
    //boxShadow: theme?.shadows[6],
    zIndex: 11,
    backgroundColor: '#006EB9',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    }
  },
  pickerRoot: {
    backgroundColor: '#006EB9',
    color: theme.palette.primary.contrastText,
    minWidth: '240px',
    width: '100%',
    padding: theme.spacing(2)
  },
  monthsWrapper: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    alignItems: 'center',
    justifyItems: 'center'
  },
  monthContainer: {
    position: 'relative',
    width: '100%',
    textAlign: 'center',
    zIndex: 1
  },
  selectionLine: {
    '&::after': {
      content: "' '",
      position: 'absolute',
      right: 0,
      width: '100%',
      height: '70%',
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: theme.palette.primary.contrastText
    }
  },
  monthBtn: {
    boxShadow: 'none',
    background: 'transparent',
    border: '1px solid transparent',
    color: theme.palette.primary.contrastText,
    width: '50px',
    height: '50px',
    cursor: 'pointer',
    fontSize: '1.2em',
    borderRadius: '50%',
    transition: 'border .4s',
    textAlign: 'center',
    padding: 0,
    '&:hover': {
      border: `2px solid ${theme.palette.primary.contrastText}`
    },
    '&:focus': {
      border: '1px solid transparent'
    }
  },
  /* First or last month */
  selectedEdgeMonth: {
    '& button': {
      background: theme.palette.primary.contrastText,
      color: theme.palette.primary.main
    }
  },
  edgeMonthConnectorLine: {
    '&::after': {
      content: "' '",
      position: 'absolute',
      width: '50%',
      height: '70%',
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: theme.palette.grey[300],
      zIndex: -1
    }
  },
  edgeMonthConnectorLineRight: {
    '&::after': {
      right: 0
    }
  },
  edgeMonthConnectorLineLeft: {
    '&::after': {
      left: 0
    }
  },
  /* All months between first and last month */
  selectedMonth: {
    '& button': {
      color: theme.palette.primary.main
    },
    '&::after': {
      content: "' '",
      position: 'absolute',
      left: 0,
      width: '100%',
      height: '70%',
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: theme.palette.grey[300],
      zIndex: -1
    }
  }
}));

export default useStyles;
