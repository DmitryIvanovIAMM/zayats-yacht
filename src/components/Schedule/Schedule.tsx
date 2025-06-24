'use client';

import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import SectionTitle from '@/components/SectionTitle/SectionTitle';
import PortSelector from '@/components/PortSelector/PortSelector';
import { centeredSectionExtendedSx, centerItemSivStyle } from '@/components/AboutUs/AboutUs';
import { PortFrontend } from '@/models/PortFrontend';
import MonthPicker from '@/components/MonthPicker/MonthPicker';
import { ShipStopWithSailingAndPortFrontend } from '@/models/ShipStopFrontend';
import { useSchedulesLoader } from '@/components/Schedule/useSchedulesLoader';
import RoutesList from '@/components/RoutesList/RoutesList';
import { SelectedRoute } from '@/components/RouteWithImage/RouteWithImage';

export interface ScheduleSectionProps {
  ports: PortFrontend[];
  schedules: ShipStopWithSailingAndPortFrontend[][];
}

const ScheduleSection: React.FC<ScheduleSectionProps> = ({
  ports,
  schedules
}: ScheduleSectionProps) => {
  const {
    schedulesState,
    handleDeparturePortSelected,
    handleDestinationPortSelected,
    handleLoadingDateSelected
  } = useSchedulesLoader({ ports, schedules });

  const departurePortsVariants: PortFrontend[] = schedulesState.ports.filter(
    (port) => port._id !== schedulesState.destinationPortId
  );
  const destinationPortsVariants: PortFrontend[] = schedulesState.ports.filter(
    (port) => port._id !== schedulesState.departurePortId
  );

  const handleStoreUserSelection = (selectedRoute: SelectedRoute) => {
    // eslint-disable-next-line no-console
    console.log('handleStoreUserSelection().  selectedRoute: ', selectedRoute);
  };
  const handleShareRoute = (selectedRoute: ShipStopWithSailingAndPortFrontend[]) => {
    // eslint-disable-next-line no-console
    console.log('handleShareRoute().  selectedRoute: ', selectedRoute);
  };

  return (
    <Box id="schedule-section" sx={{ ...centeredSectionExtendedSx, minHeight: '100vh' }}>
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
            selectedPort={schedulesState.departurePortId?.toString() || ''}
            ports={departurePortsVariants}
            errors={schedulesState.errors.departurePortId}
            label="From"
            onSelect={handleDeparturePortSelected}
          />
        </div>
        <div style={centerItemSivStyle}>
          <PortSelector
            selectedPort={schedulesState.destinationPortId?.toString() || ''}
            ports={destinationPortsVariants}
            errors={schedulesState.errors.departurePortId}
            label="To"
            onSelect={handleDestinationPortSelected}
          />
        </div>
        <div style={centerItemSivStyle}>
          <MonthPicker value={schedulesState.loadingDate} onChange={handleLoadingDateSelected} />
        </div>
      </Box>
      <Box
        sx={{
          width: { xs: '100%', sm: 'auto' },
          marginRight: { xs: '0', sm: '10px' },
          marginLeft: { xs: '0', sm: '10px' }
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {schedulesState.isLoadingSchedule ? (
            <CircularProgress
              size="3rem"
              style={{
                marginTop: '50px',
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
              }}
            />
          ) : (
            <RoutesList
              routesList={schedulesState.schedules}
              onUserGetRouteSelect={handleStoreUserSelection}
              onShareRoute={handleShareRoute}
              isLoadingPortSelected={!!schedulesState.departurePortId}
              isDestinationPortSelected={!!schedulesState.destinationPortId}
            />
          )}
        </div>
      </Box>
    </Box>
  );
};

export default ScheduleSection;
