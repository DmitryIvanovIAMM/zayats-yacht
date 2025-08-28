'use client';

import { Box } from '@mui/material';
import React, { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const navigationTabsStyles = {
  rootStyle: {
    borderBottom: '1px solid #C4C4C4',
    overflowX: 'auto',
    overflowScrolling: 'touch',
    WebkitOverflowScrolling: 'touch',
    marginBottom: '5px'
  } as React.CSSProperties,
  tabStyle: {
    textDecoration: 'none',
    fontWeight: '400',
    marginRight: '20px',
    position: 'relative',
    textTransform: 'uppercase',
    color: 'secondary.dark'
  } as React.CSSProperties,
  activeTabStyle: {
    textDecoration: 'none',
    fontWeight: '550',
    color: 'secondary.dark',
    borderBottom: '3px solid',
    marginRight: '20px',
    paddingBottom: '5px',
    borderColor: 'secondary.dark'
  } as React.CSSProperties,
  hooverSx: {
    textDecoration: 'none',
    textTransform: 'uppercase',
    transition: 'color .4s, 0.15s box-shadow ease-in-out',
    flexShrink: 0,
    '&:hover': {
      color: 'secondary.main'
    }
  }
};

export interface Tab {
  label: string;
  link: string;
}

export interface PageNavigationTabsProps {
  tabs: Tab[];
}

const PageNavigationTabs: FC<PageNavigationTabsProps> = ({ tabs }) => {
  const currentPath = usePathname();

  return (
    <Box display="flex" style={navigationTabsStyles.rootStyle} data-testid="navTabs">
      {tabs.map((tab, index) => (
        <Link
          key={index}
          href={tab.link}
          style={navigationTabsStyles.tabStyle}
          className="nav-link"
        >
          <Box
            display="flex"
            sx={
              currentPath?.includes(tab.link)
                ? { ...navigationTabsStyles.activeTabStyle, ...navigationTabsStyles.hooverSx }
                : { ...navigationTabsStyles.tabStyle, ...navigationTabsStyles.hooverSx }
            }
            component="nav"
          >
            {tab.label}
          </Box>
        </Link>
      ))}
    </Box>
  );
};

export default PageNavigationTabs;
