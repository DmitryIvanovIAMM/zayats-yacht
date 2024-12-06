import useMonthPickerStyles from './MonthPicker.styles';
import clsx from 'clsx';
import React from 'react';
import { monthInRange, oneMonthRange } from './monthPickerHelpers';
import { monthDateRange, months } from '@/utils/date-time';
import Typography from '@mui/material/Typography';

export interface PickerProps {
  year: number;
  onMonthClick: (monthIndex: number, year: number) => void;
  value: monthDateRange | null;
}

const Picker: React.FC<PickerProps> = ({ year, onMonthClick, value }) => {
  const classes = useMonthPickerStyles();

  const handleMonthClick = (monthIndex: number) => () => {
    onMonthClick(monthIndex, year);
  };

  const getMonthStyle = (monthIndex: number) => {
    if (!value) return; // initial state
    const { startDate, endDate } = value;

    if (
      oneMonthRange(value) &&
      monthIndex === startDate.getMonth() &&
      year === value.startDate.getFullYear()
    ) {
      return classes.selectedEdgeMonth;
    }

    const isEdgeStartMonth =
      monthIndex === startDate.getMonth() && year === value.startDate.getFullYear();
    const isEdgeEndMonth =
      monthIndex === endDate.getMonth() && year === value.endDate.getFullYear();

    if (!oneMonthRange(value) && (isEdgeStartMonth || isEdgeEndMonth)) {
      return [
        classes.selectedEdgeMonth,
        classes.edgeMonthConnectorLine,
        isEdgeStartMonth && classes.edgeMonthConnectorLineRight,
        isEdgeEndMonth && classes.edgeMonthConnectorLineLeft
      ];
    }

    if (!oneMonthRange(value) && monthInRange(value, monthIndex, year)) {
      return classes.selectedMonth;
    }
  };

  return (
    <div className={classes.pickerRoot}>
      <Typography variant="h5" align="center">
        {year}
      </Typography>
      <div className={classes.monthsWrapper} data-testid="calendar">
        {months.map((month: string, index: number) => (
          <div
            key={index}
            data-testid="month-item"
            className={clsx(classes.monthContainer, getMonthStyle(index))}
          >
            <button
              data-testid="month-btn"
              className={classes.monthBtn}
              onClick={handleMonthClick(index)}
            >
              {month}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Picker;
