import React from 'react';
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import RouteWithImage from '@/components/RouteWithImage/RouteWithImage';
//import { getNoRoutesMessage } from '@/utils/routeCalculators';
import { Grid } from '@mui/system';

export interface RoutesListProps {
  onUserGetRouteSelect: (route: string[]) => void;
  onShareRoute: (route: string[]) => void;
  routesList: string[][];
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
  return <div>RoutesList</div>;
  /*return (
    <Grid container style={{ margin: 0, padding: 16 }}>
      {routesList && routesList.length > 0 ? (
        routesList.map((route, index) =>
          route.length > 1 ? (
            <Grid container justify="center" key={`shipKeyIndex${index}`}>
              <Grid item xs={12} sm={12} md={10} lg={8} style={{ marginTop: 15, marginBottom: 15 }}>
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
  );*/
}

/*RouteBoxesList.propTypes = {
  onUserGetRouteSelect: PropTypes.func.isRequired,
  onShareRoute: PropTypes.func.isRequired,
  routesList: PropTypes.array,
  isLoadingPortSelected: PropTypes.bool,
  isDestinationPortSelected: PropTypes.bool
};*/
