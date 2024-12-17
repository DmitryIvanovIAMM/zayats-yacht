import {
  edgeMonthConnectorLineLeftSx,
  edgeMonthConnectorLineSx,
  monthBtnStyle,
  monthContainerSx,
  monthsWrapperStyle,
  pickerRootSx,
  selectedEdgeMonthSx,
  selectedMonthSx
} from './MonthPicker.styles';
import React from 'react';
import { monthInRange, oneMonthRange } from './monthPickerHelpers';
import { MonthDateRange, months } from '@/utils/date-time';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { edgeMonthConnectorLineRightSx } from '@/components/MonthPicker/MonthPicker.styles';

export interface PickerProps {
  year: number;
  onMonthClick: (monthIndex: number, year: number) => void;
  value: MonthDateRange | null;
}

const Picker: React.FC<PickerProps> = ({ year, onMonthClick, value }) => {
  const handleMonthClick = (monthIndex: number) => () => {
    onMonthClick(monthIndex, year);
  };

  const getMonthStyle = (monthIndex: number) => {
    if (!value) return {}; // initial state
    const { startDate, endDate } = value;

    if (
      oneMonthRange(value) &&
      monthIndex === startDate.getMonth() &&
      year === value.startDate.getFullYear()
    )
      return selectedEdgeMonthSx;

    const isEdgeStartMonth =
      monthIndex === startDate.getMonth() && year === value.startDate.getFullYear();
    const isEdgeEndMonth =
      monthIndex === endDate.getMonth() && year === value.endDate.getFullYear();

    if (!oneMonthRange(value) && (isEdgeStartMonth || isEdgeEndMonth)) {
      if (isEdgeStartMonth) return edgeMonthConnectorLineRightSx;
      if (isEdgeEndMonth) return edgeMonthConnectorLineLeftSx;
      return edgeMonthConnectorLineSx;
    }

    if (!oneMonthRange(value) && monthInRange(value, monthIndex, year)) return selectedMonthSx;
  };

  return (
    <Box sx={pickerRootSx}>
      <Typography variant="h5" align="center">
        {year}
      </Typography>
      <div style={monthsWrapperStyle} data-testid="calendar">
        {months.map((month: string, index: number) => (
          <Box
            key={index}
            data-testid="month-item"
            sx={{ ...monthContainerSx, ...getMonthStyle(index) }}
          >
            <Button data-testid="month-btn" sx={monthBtnStyle} onClick={handleMonthClick(index)}>
              {month}
            </Button>
          </Box>
        ))}
      </div>
    </Box>
  );
};

export default Picker;
