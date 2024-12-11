'use client';

import React from 'react';
import { Box } from '@mui/material';
import SectionTitle from '@/components/SectionTitle/SectionTitle';
import PortSelector from '@/components/PortSelector/PortSelector';
import { centeredSectionSx, centerItemSivStyle } from '@/components/AboutUs/AboutUs';
import { Port } from '@/models/Port';
import MonthPicker from '@/components/MonthPicker/MonthPicker';
import { ShipStop } from '@/models/ShipStop';
import { useSchedulesLoader } from '@/components/Schedule/useSchedulesLoader';

export interface ScheduleSectionProps {
  ports: Port[];
  schedules: ShipStop[][];
}
const ScheduleSection: React.FC<ScheduleSectionProps> = ({
  ports,
  schedules
}: ScheduleSectionProps) => {
  const {
    schedulesState,
    handleDeparturePortSelected,
    handleDestinationPortSelected,
    handleLoadingDateSelected,
    loadSchedules
  } = useSchedulesLoader({ ports, schedules });
  // eslint-disable-next-line no-console
  console.log('schedulesState: ', schedulesState);

  const departurePortsVariants: Port[] = schedulesState.ports.filter(
    (port) => port._id !== schedulesState.destinationPortId
  );
  // eslint-disable-next-line no-console
  console.log('departurePortsVariants: ', departurePortsVariants);
  const destinationPortsVariants: Port[] = schedulesState.ports.filter(
    (port) => port._id !== schedulesState.departurePortId
  );
  // eslint-disable-next-line no-console
  console.log('destinationPortsVariants: ', destinationPortsVariants);

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
