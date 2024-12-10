import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

const mainBlueColor = '#3365A7';
const grayColor = '#777777';
export const lightGrayColor = '#C4C4C4';
const strongGrayColor = '#3E3E3E';

export const useRouteStyles = makeStyles((theme: Theme) => ({
  routeWihImageBox: {
    backgroundColor: 'white',
    minHeight: '194px',
    display: 'flex',
    border: `0.5px solid ${lightGrayColor}`,
    transition: 'box-shadow 0.6s',
    borderRadius: '0 5px 5px 0',
    '&:hover': {
      border: `0.5px solid transparent`,
      boxShadow: '0px 10px 20px rgba(0, 117, 255, 0.15)'
    },
    [theme.breakpoints.down('xs')]: {
      display: 'block'
    }
  },
  title: {
    paddingTop: 3,
    display: 'flex',
    textTransform: 'uppercase',
    fontFamily: 'Montserrat',
    fontSize: '12px',
    fontStyle: 'regular',
    fontWeight: 'normal',
    color: strongGrayColor,
    lineHeight: '15px',
    letterSpacing: '0.07em'
  },
  destinationPortName: {
    float: 'left',
    fontFamily: 'Montserrat',
    fontSize: '16px',
    fontStyle: 'regular',
    fontWeight: 600,
    color: mainBlueColor,
    lineHeight: '20px'
  },
  loadingPortName: {
    fontFamily: 'Montserrat',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 600,
    color: grayColor,
    lineHeight: '20px'
  },
  dateValue: {
    fontFamily: 'Montserrat',
    fontSize: '14px',
    fontStyle: 'regular',
    fontWeight: 400,
    color: grayColor,
    lineHeight: '20px'
  },
  stopName: {
    fontFamily: 'Montserrat',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 400,
    color: mainBlueColor,
    lineHeight: '20px'
  },
  footerTitle: {
    display: 'table-cell',
    fontFamily: 'Montserrat',
    textTransform: 'uppercase',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: 500,
    color: strongGrayColor,
    lineHeight: '15px'
  },
  footerValue: {
    display: 'table-cell',
    fontFamily: 'Montserrat',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: strongGrayColor,
    lineHeight: '15px'
  },
  getQuoteButton: {
    width: 57,
    borderRadius: '0 5px 5px 0',
    color: 'white',
    background: '#00AA4F',
    '&:hover': {
      background: '#00AA4F'
    },
    [theme.breakpoints.down('xs')]: {
      width: 'inherit',
      display: 'block',
      padding: '15px 30px',
      borderRadius: '5px',
      marginRight: '4px',
      height: 'unset'
    }
  },
  getQuoteTypography: {
    textAlign: 'left',
    textTransform: 'uppercase',
    fontFamily: 'Montserrat',
    fontWeight: 600,
    letterSpacing: '0.115em',
    transform: 'rotate(-90deg)',
    fontSize: '16px',
    lineHeight: '20px',
    fontStyle: 'normal',
    [theme.breakpoints.down('xs')]: {
      transform: 'none',
      textAlign: 'center'
    }
  },
  actionsSm: {
    marginTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center'
  },
  shareBtnWrapper: {
    display: 'flex',
    alignItems: 'center',
    textTransform: 'uppercase',
    color: '#333333'
  },
  cardImg: {
    minWidth: '300px',
    width: '30%',
    objectFit: 'cover',
    [theme.breakpoints.down('xs')]: {
      height: 'initial',
      width: `100%`
    }
  },
  shareBtnText: {
    marginLeft: theme.spacing(1)
  },
  cardTitle: {
    textTransform: 'none',
    padding: '7px 30px 7px 14px',
    background: `url(${clippedRectangle})`,
    backgroundSize: 'cover',
    backgroundPosition: 'right',
    color: theme.palette.primary.contrastText,
    width: '80%',
    fontWeight: 'bold',
    [theme.breakpoints.down('xs')]: {
      width: `90%`,
      marginLeft: '-16px',
      marginTop: '-2px'
    },
    '& p': {
      fontFamily: 'Montserrat',
      fontStyle: 'normal',
      fontSize: '18px',
      margin: 0,
      lineHeight: '24px'
    }
  }
}));
