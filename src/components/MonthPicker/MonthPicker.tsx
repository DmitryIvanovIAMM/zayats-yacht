import React, { useMemo, useState } from 'react';
import {
  clickedSameMonth,
  getLabelText,
  getMonthsRange,
  getOneMonthRange,
  oneMonthRange
} from './monthPickerHelpers';
import useDatePickerStyles from './MonthPicker.styles';
import Event from '@mui/icons-material/Event';
import Picker from './Picker';
import { monthDateRange } from '@/utils/date-time';
import { ClickAwayListener, Fade, InputAdornment, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';

export interface MonthPickerProps {
  value: monthDateRange | null;
  onChange: (dateRange: monthDateRange | null) => void;
  inputLabel?: string;
}
function MonthPicker({ value, onChange, inputLabel = 'When (optional)' }: MonthPickerProps) {
  const classes = useDatePickerStyles();
  const [calendarOpened, setCalendarOpened] = useState(false);
  /* useMemo is used to calculate value based on props and called only when [dependency] changes*/
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
      <div className={classes.root}>
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
                <InputAdornment position="end">
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
          <div className={classes.yearsList}>
            {years.map((year) => (
              <Picker key={year} onMonthClick={onMonthClick} year={year} value={value} />
            ))}
          </div>
        </Fade>
      </div>
    </ClickAwayListener>
  );
}

export default MonthPicker;
