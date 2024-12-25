import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import {
  actionsSmSx,
  cardImgSx,
  cardTitleSx,
  lightGrayColor,
  mainInfoStyle,
  routeWihImageBoxSx
} from '@/components/RouteWithImage/RouteWithImage.style';
import { Box } from '@mui/material';

export const RouteWithImageSkeleton = () => {
  return (
    <Box sx={routeWihImageBoxSx} data-cy="schedule-route-card">
      <Box sx={cardImgSx}>
        <Skeleton variant="rectangular" height="100%" />
      </Box>
      <div style={mainInfoStyle}>
        <Box sx={{ ...cardTitleSx, background: '' }}>
          <Skeleton />
        </Box>
        <div style={{ marginTop: 20, marginBottom: 20 }}>
          <Skeleton />
        </div>
        <hr
          style={{
            border: `0.5px solid ${lightGrayColor}`
          }}
        />
        <div>
          <Skeleton />
        </div>
        <Box sx={actionsSmSx}>
          <Skeleton />
        </Box>
      </div>
      <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
        <Skeleton />
      </Box>
    </Box>
  );
};
