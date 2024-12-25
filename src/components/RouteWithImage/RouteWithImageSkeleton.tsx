import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import {
  actionsSmSx,
  cardImgSx,
  cardTitleSx,
  lightGrayColor,
  mainInfoStyle
} from '@/components/RouteWithImage/RouteWithImage.style';
import { Box } from '@mui/material';

const routeWihImageBoxSx = {
  backgroundColor: 'white',
  width: '100%',
  minHeight: '194px',
  display: { xs: 'block', sm: 'block', md: 'flex' },
  border: `0.5px solid ${lightGrayColor}`,
  transition: 'box-shadow 0.6s',
  margin: '16px 10px 16px 10px '
  //marginRight: '10px', marginLeft: '10px'
};

export const RouteWithImageSkeleton = () => {
  return (
    <Box sx={routeWihImageBoxSx} data-cy="schedule-route-card">
      <Box sx={cardImgSx}>
        <Skeleton variant="rectangular" height="100%" />
      </Box>
      <div style={mainInfoStyle}>
        <div style={{ marginTop: 20, marginBottom: 20 }}>
          <Skeleton />
        </div>
        <div>
          <Skeleton variant="rectangular" />
        </div>
      </div>
    </Box>
  );
};
