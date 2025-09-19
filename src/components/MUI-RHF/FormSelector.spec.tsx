import React, { PropsWithChildren, useEffect } from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { FormSelector } from './FormSelector';

type AnyObj = Record<string, unknown>;

function RHFWrapper({ children, defaultValues }: PropsWithChildren<{ defaultValues?: AnyObj }>) {
  const methods = useForm({ defaultValues });
  return <FormProvider {...methods}>{children}</FormProvider>;
}

function WatchValue({ name }: { name: string }) {
  const { watch } = useFormContext();
  const value = watch(name);
  return <div data-testid={`${name}-watched-value`}>{String(value ?? '')}</div>;
}

function SetErrorOnMount({ name, message }: { name: string; message: string }) {
  const { setError } = useFormContext();
  useEffect(() => {
    setError(name as any, { type: 'manual', message });
  }, [name, message, setError]);
  return null;
}

describe('FormSelector', () => {
  const name = 'weightMetric';
  const options = { a: 'Option A', b: 'Option B' };

  it('renders with label and select test id', () => {
    render(
      <RHFWrapper defaultValues={{ [name]: 'a' }}>
        <FormSelector name={name} label="Weight" options={options} />
      </RHFWrapper>
    );

    expect(screen.getByText('Weight')).toBeInTheDocument();
    expect(screen.getByTestId(`${name}-form-select`)).toBeInTheDocument();
  });

  it('uses initial value from form defaultValues', () => {
    render(
      <RHFWrapper defaultValues={{ [name]: 'a' }}>
        <FormSelector name={name} label="Weight" options={options} />
        <WatchValue name={name} />
      </RHFWrapper>
    );

    // The watched value should reflect defaultValues
    expect(screen.getByTestId(`${name}-watched-value`)).toHaveTextContent('a');
  // The select display (combobox) should show the corresponding label
  const selectRoot = screen.getByTestId(`${name}-form-select`);
  const combobox = within(selectRoot).getByRole('combobox');
  expect(combobox).toHaveTextContent('Option A');
  });

  it('changes selection and updates form value', () => {
    render(
      <RHFWrapper defaultValues={{ [name]: 'a' }}>
        <FormSelector name={name} label="Weight" options={options} />
        <WatchValue name={name} />
      </RHFWrapper>
    );

  const selectRoot = screen.getByTestId(`${name}-form-select`);
  const combobox = within(selectRoot).getByRole('combobox');
  // Open the dropdown
  fireEvent.mouseDown(combobox);

    // Click on the new option
    const optionB = screen.getByRole('option', { name: 'Option B' });
    fireEvent.click(optionB);

    // Value should update
    expect(screen.getByTestId(`${name}-watched-value`)).toHaveTextContent('b');
  expect(within(selectRoot).getByRole('combobox')).toHaveTextContent('Option B');
  });

  it('shows error helper text and marks select invalid', () => {
    const errorMessage = 'Weight is required';
    render(
      <RHFWrapper defaultValues={{ [name]: '' }}>
        <SetErrorOnMount name={name} message={errorMessage} />
        <FormSelector name={name} label="Weight" options={options} />
      </RHFWrapper>
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  // The hidden native input reflects aria-invalid when error is true
  const input = screen.getByTestId(`${name}-form-selector-input`);
  expect(input).toHaveAttribute('aria-invalid', 'true');
  });
});
