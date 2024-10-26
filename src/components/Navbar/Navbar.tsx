"use client";

import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Image from "next/image";
import logoImage from "../../assets/images/allied_yacht_vertical_png_120.png";
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
const leftNavigationSx = {
  textAlign: "center",
  paddingLeft: "10px",
  paddingRight: "10px",
  backgroundColor: "#0A2A3B",
};
const dividerStyle = {
  border: "none",
  color: "#00b39e",
  backgroundColor: "#00b39e",
  height: "1px",
};
const menuItemSx = {
  textAlign: "left",
  color: "white",
  fontWeight: "600",
  fontSize: "14px",
  textTransform: "uppercase",
  paddingLeft: "0px",
  paddingRight: "0px",
};

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
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={leftNavigationSx}>
      <Typography
        variant="h6"
        sx={{ ...menuItemSx, my: 2, textAlign: "center" }}
      >
        Zayats-Yacht Transport
      </Typography>
      <hr style={{ ...dividerStyle, marginTop: "35px" }}></hr>
      <Divider />
      <List>
        {menuLinks.map((item) => (
          <div key={item.label}>
            <ListItem disablePadding>
              <ListItemButton sx={menuItemSx}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
            <hr style={dividerStyle}></hr>
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
                data-testid="left-menu-button"
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Image
                src={logoImage}
                width={105} // 81 125
                height={71} //58 90*/
                alt="Allied-Yacht logo"
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
          open={menuOpen}
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
