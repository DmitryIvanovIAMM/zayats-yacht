import React from 'react';
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import RouteWithImage, { SelectedRoute } from '@/components/RouteWithImage/RouteWithImage';
import { Grid } from '@mui/system';
import { ShipStop } from '@/models/ShipStop';
import { getNoRoutesMessage } from '@/utils/routeCalculators';

export interface RoutesListProps {
  onUserGetRouteSelect: (route: SelectedRoute) => void;
  onShareRoute: (route: ShipStop[]) => void;
  routesList: ShipStop[][];
  isLoadingPortSelected: boolean;
  isDestinationPortSelected: boolean;
}
export default function RoutesList({
  routesList,
  onShareRoute,
  onUserGetRouteSelect,
  isLoadingPortSelected,
  isDestinationPortSelected
}: RoutesListProps) {
  return (
    <Grid container style={{ margin: 0, padding: 16 }}>
      {routesList && routesList.length > 0 ? (
        routesList.map((route, index) =>
          route.length > 1 ? (
            <Grid container key={`shipKeyIndex${index}`}>
              <Grid xs={12} sm={12} md={10} lg={8}>
                <RouteWithImage
                  route={route}
                  onUserGetRouteSelect={onUserGetRouteSelect}
                  onShareRoute={onShareRoute}
                />
              </Grid>
            </Grid>
          ) : (
            <div key={`noShipKeyIndex${index}`} />
          )
        )
      ) : (
        <Container>
          <Typography component="h4" variant="h6" align="center">
            {getNoRoutesMessage(
              routesList.length,
              isLoadingPortSelected,
              isDestinationPortSelected
            )}
          </Typography>
        </Container>
      )}
    </Grid>
  );
}

/*RouteBoxesList.propTypes = {
  onUserGetRouteSelect: PropTypes.func.isRequired,
  onShareRoute: PropTypes.func.isRequired,
  routesList: PropTypes.array,
  isLoadingPortSelected: PropTypes.bool,
  isDestinationPortSelected: PropTypes.bool
};*/
