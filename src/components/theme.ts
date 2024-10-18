"use client";
import { createTheme } from "@mui/material/styles";

const primary = {
  light: "#769fd5",
  main: "#3c76c3",
  dark: "#3365A7",
  contrastText: "#fff",
};

const defaultTheme = createTheme();
const customTheme = createTheme({
  palette: {
    primary: primary,
  },
  typography: {
    fontFamily: "Montserrat",
  },
  shape: {
    borderRadius: 8,
  },
  /*props: {
    MuiTab: {
      disableRipple: true,
    },
  },*/
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
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

export { customTheme };
