'use client';

import { createTheme } from '@mui/material/styles';
import { primary, secondary } from './colors';

export const customTheme = createTheme({
  palette: {
    primary: primary,
    secondary: secondary
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  },
  shape: {
    borderRadius: 2
  },

  /*components: {
    MuiTableCell: {
      styleOverrides: {
        sizeSmall: {
          fontSize: '14px'
        }
      }
    },
    MuiTab: {
      defaultProps: {
        disableRipple: true
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          margin: '0 16px',
          minWidth: 0,
          padding: 0
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#F5F6FA',
          boxShadow: '5px 4px 4px rgba(0, 0, 0, 0.1)',
          color: '#fff'
        },
        paperAnchorDockedLeft: {
          borderRight: 0
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        sizeLarge: {
          height: 50,
          fontSize: 20
          /*[breakpoints.down('sm')]: {
            fontSize: 16
          }
        },
        root: {
          borderRadius: '2px'
        },
        contained: {
          boxShadow: 'none',
          '&:active': {
            boxShadow: 'none'
          }
        },
        outlined: {
          borderWidth: 1
        }
      }
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: '2px'
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: '#3365A7'
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: '2px',
          borderWidth: '1px !important'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '2px',
          '& fieldset': {
            borderRadius: '2px',
            borderWidth: '1px !important'
          }
        }
      }
    },
    MuiListItemText: {},
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
          marginRight: 0,
          '& svg': {
            fontSize: 20
          }
        }
      }
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32
        }
      }
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          fontFamily: 'Montserrat'
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        subtitle1: {
          fontWeight: 'bold',
          fontSize: 18,
          color: '#666666'
        }
      }
    }
  },*/
  /*typography: {
    fontFamily: "Montserrat",
  },*/
  /*shape: {
    borderRadius: 8
  },*/
  /*props: {
    MuiTab: {
      disableRipple: true,
    },
  },*/
  mixins: {
    toolbar: {
      minHeight: 48
    }
  }
  /*overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: "#12243b",
      },
    },
    MuiButton: {
      label: {
        textTransform: "none",
      },
      contained: {
        boxShadow: "none",
        "&:active": {
          boxShadow: "none",
        },
      },
    },
    MuiTabs: {
      root: {
        marginLeft: defaultTheme.spacing(1),
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: defaultTheme.palette.common.white,
      },
    },
    MuiTextField: {
      root: {
        marginBottom: 15,
        "& p": {
          position: "absolute !important",
          bottom: "-17px",
          marginLeft: "1px",
          whiteSpace: "noWrap",
        },
      },
    },
    MuiTab: {
      root: {
        textTransform: "none",
        margin: "0 16px",
        minWidth: 0,
        padding: 0,
        [defaultTheme.breakpoints.up("md")]: {
          padding: 0,
          minWidth: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: defaultTheme.spacing(1),
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: "#3365A7",
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: defaultTheme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: "inherit",
        marginRight: 0,
        "& svg": {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    }
  }*/
});
