'use client';

import React from 'react';
import { Box } from '@mui/material';
import SectionTitle from '@/components/SectionTitle/SectionTitle';
import PortSelector from '@/components/PortSelector/PortSelector';
import { centeredSectionSx } from '@/components/AboutUs/AboutUs';
import { Types } from 'mongoose';
import { Port } from '@/models/Port';
import MonthPicker from '@/components/MonthPicker/MonthPicker';
import { monthDateRange } from '@/utils/date-time';

export interface UserScheduleSelection {
  departurePortId: string | Types.ObjectId | null;
  destinationPortId: string | Types.ObjectId | null;
  loadingDate: monthDateRange | null;
}
export const defaultUserScheduleSelection: UserScheduleSelection = {
  departurePortId: null,
  destinationPortId: null,
  loadingDate: null
};

export interface ScheduleSectionProps {
  ports: Port[];
}

const ScheduleSection: React.FC<ScheduleSectionProps> = ({ ports }) => {
  //console.log('ScheduleSection().  ports: ', ports);
  const [userScheduleSelection, setUserScheduleSelection] = React.useState<UserScheduleSelection>(
    defaultUserScheduleSelection
  );

  const handleDeparturePortSelected = (portId: string) => {
    setUserScheduleSelection({ ...userScheduleSelection, departurePortId: portId });
  };
  const handleDestinationPortSelected = (portId: string) => {
    setUserScheduleSelection({ ...userScheduleSelection, destinationPortId: portId });
  };
  const handleLoadingDateSelected = (dateRange: monthDateRange | null) => {
    setUserScheduleSelection({ ...userScheduleSelection, loadingDate: dateRange });
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
          width: '100%'
        }}
      >
        <div>
          <PortSelector
            selectedPort={userScheduleSelection.departurePortId?.toString() || ''}
            ports={ports}
            //errors={errors.departurePortId}
            errors={''}
            label="From"
            onSelect={handleDeparturePortSelected}
          />
        </div>
        <div>
          <PortSelector
            selectedPort={userScheduleSelection.destinationPortId?.toString() || ''}
            ports={ports}
            //errors={errors.departurePortId}
            errors={''}
            label="To"
            onSelect={handleDestinationPortSelected}
          />
        </div>
        <div>
          <MonthPicker
            value={userScheduleSelection.loadingDate}
            onChange={handleLoadingDateSelected}
          />
        </div>
      </Box>
    </Box>
  );
};

export default ScheduleSection;
