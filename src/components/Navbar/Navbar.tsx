'use client';

import React, { useMemo } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Image from 'next/image';
import logoImage from '../../../public/images/allied_yacht_vertical_png_120.png';
import {
  CssBaseline,
  Divider,
  Drawer,
  Fab,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Slide,
  useScrollTrigger
} from '@mui/material';
import { getMenuLinksForRole, MenuLink, baseMenuLinks } from '@/helpers/menuLinks';
import ScrollToTop from './ScrollToTop';
import { secondary } from '@/components/colors';
import { useRouter } from 'next/navigation';
import { PATHS } from '@/helpers/paths';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Roles } from '@/utils/types';

const drawerWidth = 240;
const leftNavigationSx = {
  textAlign: 'center',
  paddingLeft: '10px',
  paddingRight: '10px',
  backgroundColor: '#0A2A3B'
};
const dividerStyle = {
  border: 'none',
  color: secondary.main,
  backgroundColor: secondary.main,
  height: '1px'
};
const menuItemSx = {
  textAlign: 'left',
  color: 'white',
  fontWeight: '600',
  fontSize: '14px',
  textTransform: 'uppercase',
  paddingLeft: '0px',
  paddingRight: '0px'
};

export interface NavbarProps {
  children?: React.ReactElement<unknown>;
}

function HideOnScroll(props: NavbarProps) {
  const { children } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: undefined
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children ?? <div />}
    </Slide>
  );
}

const Navbar: React.FC<NavbarProps> = (props) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  // eslint-disable-next-line no-console
  console.log('Navbar().  session: ', session);

  const menuLinksForUser = useMemo(() => {
    return getMenuLinksForRole((session?.user?.image as Rolse) || Roles.User);
  }, [session?.user?.image]);
  console.log('Navbar().  menuLinksForUser: ', menuLinksForUser);

  const handleDrawerToggle = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const handleMenuItemClicked = (menuItem: MenuLink) => {
    const pathname = menuItem?.link
      ? menuItem?.section
        ? `${menuItem?.link}#${menuItem?.section}`
        : `${menuItem?.link}`
      : `#${menuItem?.link}`;
    router.push(pathname, { scroll: true });
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={leftNavigationSx}>
      <div>
        <Typography variant="h6" sx={{ ...menuItemSx, my: 2, textAlign: 'center' }}>
          Zayats-Yacht Transport
        </Typography>
        <Link href={PATHS.landing}>
          <Image
            src={logoImage}
            width={52}
            height={36}
            alt="allied-yacht-left-menu-logo"
            priority={true}
          />
        </Link>
      </div>
      <hr style={{ ...dividerStyle, marginTop: '10px' }}></hr>
      <Divider />
      <List>
        {menuLinksForUser.map((item) => (
          <div key={item.label}>
            <ListItem disablePadding>
              <ListItemButton sx={menuItemSx} onClick={() => handleMenuItemClicked(item)}>
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
    <div>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar sx={{ backgroundColor: 'white', color: 'secondary.dark' }}>
          <Toolbar disableGutters sx={{ padding: '0 10px 0 0px' }}>
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
              <Button
                href={PATHS.quoteRequest}
                variant={'contained'}
                sx={{ backgroundColor: 'secondary.dark' }}
                size={'small'}
                style={{ height: '31px' }}
              >
                Get Quote
              </Button>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                marginTop: '4px',
                marginLeft: { xs: '0', sm: '-72px' }
              }}
            >
              <Link href={PATHS.landing}>
                <Image
                  src={logoImage}
                  width={105} // 81 125
                  height={71} //58 90*/
                  alt="Allied-Yacht logo"
                  priority={true}
                />
              </Link>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Button
                variant={'contained'}
                sx={{ backgroundColor: 'secondary.dark' }}
                size={'small'}
                onClick={session?.user ? () => signOut() : () => signIn()}
                style={{ width: '78px', height: '31px' }}
              >
                {session?.user ? 'Logout' : 'Login'}
              </Button>
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
            disableScrollLock: true
          }}
          sx={{
            display: { xs: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: '#0A2A3B'
            },
            opacity: 0.9
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <ScrollToTop>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollToTop>
    </div>
  );
};
export default Navbar;
