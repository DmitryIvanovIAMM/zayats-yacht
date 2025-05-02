import React from 'react';
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import RouteWithImage, { SelectedRoute } from '@/components/RouteWithImage/RouteWithImage';
import { ShipStopWithSailingAndPort } from '@/models/ShipStop';
import { getNoRoutesMessage } from '@/utils/routeCalculators';

export interface RoutesListProps {
  onUserGetRouteSelect: (route: SelectedRoute) => void;
  onShareRoute: (route: ShipStopWithSailingAndPort[]) => void;
  routesList: ShipStopWithSailingAndPort[][];
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
  return routesList && routesList.length > 0 ? (
    routesList.map((route, index) =>
      route.length > 1 ? (
        <RouteWithImage
          route={route}
          onUserGetRouteSelect={onUserGetRouteSelect}
          onShareRoute={onShareRoute}
          key={`shipKeyIndex${index}`}
        />
      ) : (
        <div key={`noShipKeyIndex${index}`} />
      )
    )
  ) : (
    <Container style={{ marginTop: '50px' }}>
      <Typography component="h3" variant="h5" align="center">
        {getNoRoutesMessage(routesList.length, isLoadingPortSelected, isDestinationPortSelected)}
      </Typography>
    </Container>
  );
}
