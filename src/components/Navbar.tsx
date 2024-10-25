"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Image from "next/image";
import logoImage from "../assets/images/allied_yacht_vertical_png_120.png";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Slide,
  useScrollTrigger,
} from "@mui/material";
import { menuLinks } from "@/app/helpers/menuLinks";

const drawerWidth = 240;

export interface NavbarProps {
  isAuthenticated: boolean;
  children?: React.ReactElement<unknown>;
}

function HideOnScroll(props: NavbarProps) {
  const { children } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children ?? <div />}
    </Slide>
  );
}

const Navbar: React.FC<NavbarProps> = (props) => {
  const { isAuthenticated } = props;
  console.log("Navbar().  isAuthenticated: ", isAuthenticated);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        paddingLeft: "10px",
        paddingRight: "10px",
        backgroundColor: "#0A2A3B",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          my: 2,
          textAlign: "center",
          color: "white",
          fontWeight: "600",
          fontSize: "14px",
          textTransform: "uppercase",
          //fontFamily: "Montserrat",
        }}
      >
        Zayats-Yacht Transport
      </Typography>
      <hr
        style={{
          border: "none",
          color: "#00b39e",
          backgroundColor: "#00b39e",
          height: "1px",
          marginTop: "35px",
        }}
      ></hr>
      <Divider />
      <List>
        {menuLinks.map((item) => (
          <div key={item.label}>
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  textAlign: "left",
                  color: "white",
                  fontWeight: "600",
                  fontSize: "14px",
                  textTransform: "uppercase",
                  //fontFamily: "Montserrat",
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
            <hr
              style={{
                border: "none",
                color: "#00b39e",
                backgroundColor: "#00b39e",
                height: "1px",
              }}
            ></hr>
          </div>
        ))}
      </List>
    </Box>
  );
  const container = undefined;

  return (
    <>
      <HideOnScroll {...props}>
        <AppBar sx={{ backgroundColor: "white", color: "blue" }}>
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleDrawerToggle}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Image
                src={logoImage}
                width={105} // 81 125
                height={71} //58 90*/
                alt="Allied-Yat logo"
                priority={true}
              />
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Button>Sign In</Button>
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              height: "auto",
            },
            opacity: 0.9,
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
};
export default Navbar;
