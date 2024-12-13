const mainBlueColor = '#3365A7';
export const lightGrayColor = '#C4C4C4';

export const routeWihImageBoxSx = {
  backgroundColor: 'white',
  minHeight: '194px',
  display: { xs: 'block', sm: 'flex' },
  border: `0.5px solid ${lightGrayColor}`,
  transition: 'box-shadow 0.6s',
  //borderRadius: '0 5px 5px 0',
  '&:hover': {
    border: `0.5px solid transparent`,
    boxShadow: '0px 10px 20px rgba(0, 117, 255, 0.15)'
  },
  margin: '16px 0px 16px 0px '
  /*[theme.breakpoints.down('sm')]: {
    display: 'block'
  }*/
};

export const cardImgSx = {
  minWidth: '300px',
  width: { xs: '100%', sm: '30%' },
  objectFit: 'cover',
  height: { sm: 'initial' }
  /*[theme.breakpoints.down('sm')]: {
    height: 'initial',
    width: `100%`
  }*/
};

export const cardTitleSx = {
  textTransform: 'none',
  padding: '7px 30px 7px 14px',
  background: `url(/images/clippedRectangle.svg) no-repeat`,
  backgroundSize: 'cover',
  backgroundPosition: 'right',
  color: 'white',
  //color: (theme) => theme.palette.primary.contrastText,
  width: { xs: '90%', sm: '80%' },
  marginLeft: { xs: '-16px', sm: '0px' },
  marginTop: { xs: '-2px', sm: '0px' },
  fontWeight: 'bold',
  /*[theme.breakpoints.down('sm')]: {
    width: `90%`,
    marginLeft: '-16px',
    marginTop: '-2px'
  },*/
  '& p': {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontSize: '18px',
    margin: 0,
    lineHeight: '24px'
  }
};

export const titleStyle = {
  paddingTop: 3,
  display: 'flex',
  fontFamily: 'Montserrat',
  fontSize: '16px',
  fontStyle: 'regular',
  fontWeight: '550',
  lineHeight: '20px',
  letterSpacing: '0.07em'
};

export const destinationPortNameStyle = {
  //float: 'left'
  fontFamily: 'Montserrat',
  fontSize: '18px',
  fontStyle: 'regular',
  fontWeight: 600,
  color: mainBlueColor,
  lineHeight: '20px',
  textDecoration: 'none'
};

export const dateValueStyle = {
  fontFamily: 'Montserrat',
  fontSize: '16px',
  fontStyle: 'regular',
  fontWeight: 400,
  lineHeight: '20px'
};

export const footerTitleStyle = {
  display: 'table-cell',
  fontFamily: 'Montserrat',
  //textTransform: 'uppercase'
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '15px'
};

export const footerValueStyle = {
  display: 'table-cell',
  fontFamily: 'Montserrat',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 'bold',
  lineHeight: '15px'
};

export const actionsSmSx = {
  //marginTop: theme.spacing(4),
  display: { xs: 'block', sm: 'none' },
  marginTop: { xs: '32px', sm: '0px' },
  //display: 'flex',
  justifyContent: 'center',
  width: { xs: 'auto', sm: '100%' }
};
export const getQuoteButtonSx = {
  width: { xs: 'inherit', sm: '57px' },
  height: { xs: 'unset', sm: '100%' },
  borderRadius: { xs: '2px', sm: '0 2px 2px 0' },
  color: 'white',
  background: '#00AA4F',
  '&:hover': {
    background: '#00AA4F'
  },
  display: { xs: 'block', sm: 'flex' },
  padding: { xs: '15px 30px', sm: '0' }
  /*textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 'auto'*/
  //marginRight: { xs: '4px' }
  /*[theme.breakpoints.down('sm')]: {
    width: 'inherit',
    display: 'block',
    padding: '15px 30px',
    borderRadius: '1px',
    marginRight: '4px',
    height: 'unset'
  }*/
};

export const getQuoteTypographySx = {
  textAlign: { xs: 'center', sm: 'left' },
  textTransform: 'uppercase',
  fontFamily: 'Montserrat',
  fontWeight: 600,
  letterSpacing: '0.115em',
  transform: { xs: 'none', sm: 'rotate(-90deg)' },
  fontSize: '16px',
  lineHeight: '20px',
  fontStyle: 'normal',
  justifyContent: 'center'

  /*[theme.breakpoints.down('sm')]: {
    transform: 'none',
    textAlign: 'center'
  }*/
};

/*export const useRouteStyles = makeStyles((theme: Theme) => ({
  routeWihImageBox: {
    backgroundColor: 'white',
    minHeight: '194px',
    display: 'flex',
    border: `0.5px solid ${lightGrayColor}`,
    transition: 'box-shadow 0.6s',
    //borderRadius: '0 5px 5px 0',
    '&:hover': {
      border: `0.5px solid transparent`,
      boxShadow: '0px 10px 20px rgba(0, 117, 255, 0.15)'
    },
    margin: '16px 0px 16px 0px ',
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    }
  },
  title: {
    paddingTop: 3,
    display: 'flex',
    fontFamily: 'Montserrat',
    fontSize: '16px',
    fontStyle: 'regular',
    fontWeight: '550',
    lineHeight: '20px',
    letterSpacing: '0.07em'
  },
  destinationPortName: {
    float: 'left',
    fontFamily: 'Montserrat',
    fontSize: '18px',
    fontStyle: 'regular',
    fontWeight: 600,
    color: mainBlueColor,
    lineHeight: '20px',
    textDecoration: 'none'
  },
  loadingPortName: {
    fontFamily: 'Montserrat',
    fontSize: '18px',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '20px'
  },
  dateValue: {
    fontFamily: 'Montserrat',
    fontSize: '16px',
    fontStyle: 'regular',
    fontWeight: 400,
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
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '15px'
  },
  footerValue: {
    display: 'table-cell',
    fontFamily: 'Montserrat',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: '15px'
  },
  getQuoteButton: {
    width: 57,
    height: '100%',
    borderRadius: '0 2px 2px 0',
    color: 'white',
    background: '#00AA4F',
    '&:hover': {
      background: '#00AA4F'
    },
    [theme.breakpoints.down('sm')]: {
      width: 'inherit',
      display: 'block',
      padding: '15px 30px',
      borderRadius: '1px',
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
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('sm')]: {
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
    background: `url(/images/clippedRectangle.svg) no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: 'right',
    color: theme.palette.primary.contrastText,
    width: '80%',
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
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
*/
