'use client';

import React from 'react';
import { Box } from '@mui/material';
import SectionTitle from '@/components/SectionTitle/SectionTitle';
import PortSelector from '@/components/PortSelector/PortSelector';
import { centeredSectionSx, centerItemSivStyle } from '@/components/AboutUs/AboutUs';
import { Types } from 'mongoose';
import { Destination, Port } from '@/models/Port';
import MonthPicker from '@/components/MonthPicker/MonthPicker';
import { MonthDateRange } from '@/utils/date-time';
import RoutesList from '@/components/RoutesList/RoutesList';
import { ShipStop } from '@/models/ShipStop';

export const emptyPortErrors = {
  departurePortId: '',
  destinationPortId: ''
};

export interface PortSchedulesState {
  ports: Port[];
  destinations: Destination[];
  destinationPortId: string | Types.ObjectId | null;
  destinationPorts: Port[];
  departurePortId: string | Types.ObjectId | null;
  loadingDate: MonthDateRange | null;
  isLoadingPort: boolean;
  isLoadingSchedule: boolean;
  destinationIndex: number | null;
  errors: any;
  schedules: ShipStop[];
  errorMessage: string | null;
}

export const defaultPortSchedulesState: PortSchedulesState = {
  ports: [],
  destinationPortId: null,
  destinationPorts: [],
  departurePortId: null,
  loadingDate: null,
  isLoadingPort: false,
  isLoadingSchedule: false,
  destinationIndex: null,
  errors: emptyPortErrors,
  schedules: [],
  errorMessage: null
};

export interface ScheduleSectionProps {
  ports: Port[];
  destinations: Destination[];
}
const ScheduleSection: React.FC<ScheduleSectionProps> = ({ ports, destinations }) => {
  const [portSchedulesState, setPortSchedulesState] = React.useState<PortSchedulesState>({
    ...defaultPortSchedulesState,
    ports: ports,
    destinations: destinations
  });
  const departurePortsVariants: Port[] = portSchedulesState.ports.filter(
    (port) => port._id !== portSchedulesState.destinationPortId
  );
  // eslint-disable-next-line no-console
  console.log('departurePortsVariants: ', departurePortsVariants);
  const destinationPortsVariants: Port[] = portSchedulesState.ports.filter(
    (port) => port._id !== portSchedulesState.departurePortId
  );
  // eslint-disable-next-line no-console
  console.log('destinationPortsVariants: ', destinationPortsVariants);

  const handleDeparturePortSelected = (departurePortId: string) => {
    setPortSchedulesState((portSchedulesState) => ({
      ...portSchedulesState,
      departurePortId: departurePortId
    }));
  };
  const handleDestinationPortSelected = (destinationPortId: string) => {
    setPortSchedulesState((portSchedulesState) => ({
      ...portSchedulesState,
      destinationPortId: destinationPortId
    }));
  };
  const handleLoadingDateSelected = (dateRange: MonthDateRange | null) => {};
  const handleStoreUserSelection = (selectedRoute: any) => {
    // eslint-disable-next-line no-console
    console.log('handleStoreUserSelection().  selectedRoute: ', selectedRoute);
  };
  const handleShareRoute = (selectedRoute: any) => {
    // eslint-disable-next-line no-console
    console.log('handleShareRoute().  selectedRoute: ', selectedRoute);
  };

  return (
    <Box id="photo-gallery-section" sx={{ ...centeredSectionSx, minHeight: '20vh' }}>
      <SectionTitle title="Schedule" />
      <Box
        sx={{
          display: 'flex',
          justifyItems: 'center',
          justifyContent: 'space-evenly',
          flexDirection: { xs: 'column', sm: 'row' },
          flexWrap: 'wrap',
          flexBasis: '100%',
          width: '100%'
        }}
      >
        <div style={centerItemSivStyle}>
          <PortSelector
            selectedPort={portSchedulesState.departurePortId?.toString() || ''}
            ports={departurePortsVariants}
            errors={portSchedulesState.errors.departurePortId}
            label="From"
            onSelect={handleDeparturePortSelected}
          />
        </div>
        <div style={centerItemSivStyle}>
          <PortSelector
            selectedPort={portSchedulesState.destinationPortId?.toString() || ''}
            ports={destinationPortsVariants}
            errors={portSchedulesState.errors.departurePortId}
            label="To"
            onSelect={handleDestinationPortSelected}
          />
        </div>
        <div style={centerItemSivStyle}>
          <MonthPicker
            value={portSchedulesState.loadingDate}
            onChange={handleLoadingDateSelected}
          />
        </div>
      </Box>
      <div>
        {/*<RoutesList
          routesList={schedules}
          onUserGetRouteSelect={handleStoreUserSelection}
          onShareRoute={handleShareRoute}
          isLoadingPortSelected={!!departurePortId}
          isDestinationPortSelected={!!destinationPortId}
        />*/}
      </div>
    </Box>
  );
};

export default ScheduleSection;
