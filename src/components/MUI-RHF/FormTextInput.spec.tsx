import React, { PropsWithChildren, useEffect } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { FormTextInput } from './FormTextInput';

type AnyObj = Record<string, unknown>;

function RHFWrapper({ children, defaultValues }: PropsWithChildren<{ defaultValues?: AnyObj }>) {
  const methods = useForm({ defaultValues });
  return <FormProvider {...methods}>{children}</FormProvider>;
}

function SetErrorOnMount({ name, message }: { name: string; message: string }) {
  const { setError } = useFormContext();
  useEffect(() => {
    setError(name as any, { type: 'manual', message });
  }, [name, message, setError]);
  return null;
}

describe('FormTextInput', () => {
  const name = 'firstName';

  it('renders input with provided name and test id, without children initially', () => {
    render(
      <RHFWrapper defaultValues={{ [name]: '' }}>
        <FormTextInput name={name} label="First name" />
      </RHFWrapper>
    );

    const input = screen.getByTestId(`${name}-form-text-input`) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    // Default value is an empty string
    expect(input.value).toBe('');
  });

  it('shows provided helperText when no validation error', () => {
    const helper = 'This is helper';
    render(
      <RHFWrapper defaultValues={{ [name]: '' }}>
        <FormTextInput name={name} label="First name" helperText={helper} />
      </RHFWrapper>
    );

    expect(screen.getByText(helper)).toBeInTheDocument();
  });

  it('shows error message when field has error and marks input invalid', async () => {
    const errorMessage = 'First name is required';
    render(
      <RHFWrapper defaultValues={{ [name]: '' }}>
        <SetErrorOnMount name={name} message={errorMessage} />
        <FormTextInput name={name} label="First name" />
      </RHFWrapper>
    );

    // Error helper text should be visible
    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
    const input = screen.getByTestId(`${name}-form-text-input`);
    // MUI sets aria-invalid on the input when error is true
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('calls onValueChange with field name and event on change', () => {
    const onValueChange = jest.fn();
    render(
      <RHFWrapper defaultValues={{ [name]: '' }}>
        <FormTextInput name={name} label="First name" onValueChange={onValueChange} />
      </RHFWrapper>
    );

    const input = screen.getByTestId(`${name}-form-text-input`) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'John' } });

    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange.mock.calls[0][0]).toBe(name);
    // React synthetic event check: ensure an object with type 'change'
    expect(onValueChange.mock.calls[0][1]).toEqual(expect.objectContaining({ type: 'change' }));
  });

  it('renders as multiline textarea when rows are provided', () => {
    render(
      <RHFWrapper defaultValues={{ [name]: '' }}>
        <FormTextInput name={name} label="First name" rows={3} />
      </RHFWrapper>
    );

    const input = screen.getByTestId(`${name}-form-text-input`);
    // When multiline, MUI uses a textarea element
    expect(input.tagName).toBe('TEXTAREA');
    expect(input).toHaveAttribute('rows', '3');
  });
});
