import React from 'react';
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import RouteWithImage, { SelectedRoute } from '@/components/RouteWithImage/RouteWithImage';
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
    <Container>
      <Typography component="h4" variant="h6" align="center">
        {getNoRoutesMessage(routesList.length, isLoadingPortSelected, isDestinationPortSelected)}
      </Typography>
    </Container>
  );
}
