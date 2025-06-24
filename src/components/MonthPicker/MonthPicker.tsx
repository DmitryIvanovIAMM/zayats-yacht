import React, { useMemo, useState } from 'react';
import {
  clickedSameMonth,
  getLabelText,
  getMonthsRange,
  getOneMonthRange,
  oneMonthRange
} from './monthPickerHelpers';
import { rootSx, yearsListSx } from './MonthPicker.styles';
import Event from '@mui/icons-material/Event';
import Picker from './Picker';
import { MonthDateRange } from '@/utils/date-time';
import { Box, ClickAwayListener, Fade, InputAdornment, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';

export interface MonthPickerProps {
  value: MonthDateRange | null;
  onChange: (dateRange: MonthDateRange | null) => void;
  inputLabel?: string;
}
function MonthPicker({ value, onChange, inputLabel = 'When (optional)' }: MonthPickerProps) {
  const [calendarOpened, setCalendarOpened] = useState(false);
  const labelText = useMemo(() => {
    if (!value) return 'Any Month';
    return getLabelText(value);
  }, [value]);

  const years = useMemo(() => {
    return [new Date().getFullYear(), new Date().getFullYear() + 1];
  }, []);

  const onMonthClick = (monthIndex: number, year: number) => {
    /* Just selected a single month either with clean state or with range selected*/
    if (!value || !oneMonthRange(value)) {
      return onChange(getOneMonthRange(monthIndex, year));
    }
    /* When we click on selected date - remove it */
    if (clickedSameMonth(value, monthIndex, year)) {
      return onChange(null);
    }
    /* we have selected value and selected one more (range) */
    if (oneMonthRange(value)) {
      return onChange(getMonthsRange(monthIndex, value, year));
    }
  };

  const onToggleCalendar = () => {
    setCalendarOpened(!calendarOpened);
  };

  const onCloseCalendar = () => {
    setCalendarOpened(false);
  };

  return (
    <ClickAwayListener onClickAway={onCloseCalendar}>
      <Box sx={rootSx}>
        <TextField
          variant={'outlined'}
          data-testid="month-field"
          label={inputLabel}
          value={labelText}
          fullWidth
          onClick={onToggleCalendar}
          style={{ borderColor: '#3365A7' }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end" aria-label={'select-date-picker-button'}>
                  <IconButton>
                    <Event />
                  </IconButton>
                </InputAdornment>
              ),
              readOnly: true
            }
          }}
        />
        <Fade in={calendarOpened} timeout={400}>
          <Box sx={yearsListSx}>
            {years.map((year) => (
              <Picker key={year} onMonthClick={onMonthClick} year={year} value={value} />
            ))}
          </Box>
        </Fade>
      </Box>
    </ClickAwayListener>
  );
}

export default MonthPicker;
