import React from 'react';
import { ThemeProvider } from '@mui/system';
import { customTheme } from '@/components/theme';
import MonthPicker, { MonthPickerProps } from '@/components/MonthPicker/MonthPicker';
import { render } from '@testing-library/react';

const setup = (propOverrides: Partial<MonthPickerProps>) => {
  const props = {
    value: null,
    onChange: jest.fn(),
    ...propOverrides
  };

  const container = render(
    <ThemeProvider theme={customTheme}>
      <MonthPicker {...props} />
    </ThemeProvider>
  );

  return {
    props,
    container
  };
};

describe('MonthPicker component', () => {
  it('should has internal structure', () => {
    const { container } = setup({});

    expect(container).toBeDefined();
    expect(container.getByDisplayValue('Any Month')).toBeDefined();
    expect(container.queryAllByTestId('calendar').length).toBe(2);
    expect(container.queryAllByTestId('month-item').length).toBe(24);
  });

  it('should call onChange() handler', () => {
    const onChange = jest.fn();
    const { container } = setup({ onChange });

    container.queryAllByTestId('month-btn')?.at(0)?.click();
    expect(onChange).toHaveBeenCalled();
  });

  it('should shows Label', () => {
    const year = new Date().getFullYear();
    const { container } = setup({
      value: {
        startDate: new Date(year, 0, 1),
        endDate: new Date(year, 1, 0)
      }
    });

    expect(container.getByLabelText('When (optional)')).toBeInTheDocument();
  });

  it('should shows initial single month properly', () => {
    const year = new Date().getFullYear();
    const { container } = setup({
      value: {
        startDate: new Date(year, 0, 1),
        endDate: new Date(year, 1, 0)
      }
    });

    expect(container.getByDisplayValue(`Jan '${year}`)).toBeDefined();
  });

  it('should shows initial multiple months properly', () => {
    const year = new Date().getFullYear();
    const { container } = setup({
      value: {
        startDate: new Date(year, 0, 1),
        endDate: new Date(year, 3, 0)
      }
    });

    expect(container.getByDisplayValue(`Jan - Mar '${year}`)).toBeDefined();
  });
});
