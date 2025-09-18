import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// Mocks must be defined before importing the component under test
const enqueueMock = jest.fn();
jest.mock('notistack', () => ({
  useSnackbar: () => ({ enqueueSnackbar: enqueueMock })
}));

const sendQuoteRequestMock = jest.fn();
jest.mock('@/app/server-actions/serverActions', () => ({
  sendQuoteRequestAction: (...args: any[]) => sendQuoteRequestMock(...args)
}));

import QuoteRequest from './QuoteRequest';

describe('QuoteRequest', () => {
  beforeEach(() => {
    enqueueMock.mockReset();
    sendQuoteRequestMock.mockReset();
  });

  function fillRequiredFields() {
    const firstName = screen.getByTestId('firstName-form-text-input') as HTMLInputElement;
    const lastName = screen.getByTestId('lastName-form-text-input') as HTMLInputElement;
    const phone = screen.getByTestId('phoneNumber-form-text-input') as HTMLInputElement;
    const email = screen.getByTestId('email-form-text-input') as HTMLInputElement;
    const insured = screen.getByTestId('insuredValue-form-text-input') as HTMLInputElement;

    fireEvent.change(firstName, { target: { value: 'John' } });
    fireEvent.blur(firstName);
    fireEvent.change(lastName, { target: { value: 'Doe' } });
    fireEvent.blur(lastName);
    fireEvent.change(phone, { target: { value: '+123456789' } });
    fireEvent.blur(phone);
    fireEvent.change(email, { target: { value: 'john@example.com' } });
    fireEvent.blur(email);
    fireEvent.change(insured, { target: { value: '1000' } });
    fireEvent.blur(insured);

    return { firstName, lastName, phone, email, insured };
  }

  it('renders core form fields and selects', () => {
    render(<QuoteRequest />);
    expect(screen.getByText('Get Quote')).toBeInTheDocument();
    // Inputs
    expect(screen.getByTestId('firstName-form-text-input')).toBeInTheDocument();
    expect(screen.getByTestId('lastName-form-text-input')).toBeInTheDocument();
    expect(screen.getByTestId('phoneNumber-form-text-input')).toBeInTheDocument();
    expect(screen.getByTestId('email-form-text-input')).toBeInTheDocument();
    expect(screen.getByTestId('insuredValue-form-text-input')).toBeInTheDocument();
    // Selects root
    expect(screen.getByTestId('purpose-form-select')).toBeInTheDocument();
    expect(screen.getByTestId('lengthUnit-form-select')).toBeInTheDocument();
    expect(screen.getByTestId('beamUnit-form-select')).toBeInTheDocument();
    expect(screen.getByTestId('weightUnit-form-select')).toBeInTheDocument();
  });

  it('submits successfully, resets the form, and shows success snackbar', async () => {
    sendQuoteRequestMock.mockResolvedValue({ success: true, message: 'Sent!' });
    render(<QuoteRequest />);

    const { firstName, email } = fillRequiredFields();

    // Submit
    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => expect(sendQuoteRequestMock).toHaveBeenCalled());
    expect(enqueueMock).toHaveBeenCalledWith('Sent!', { variant: 'success' });
    // Form should reset back to defaults (firstName becomes empty)
    await waitFor(() => expect((firstName as HTMLInputElement).value).toBe(''));
    // email also resets
    expect((email as HTMLInputElement).value).toBe('');
  });

  it('handles error result without reset and shows error snackbar', async () => {
    sendQuoteRequestMock.mockResolvedValue({ success: false, message: 'Bad request' });
    render(<QuoteRequest />);

    const { firstName } = fillRequiredFields();
    expect(firstName.value).toBe('John');

    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => expect(sendQuoteRequestMock).toHaveBeenCalled());
    expect(enqueueMock).toHaveBeenCalledWith('Bad request', { variant: 'error' });
    // Should not reset when success=false
    expect(firstName.value).toBe('John');
  });

  it('shows failure snackbar when action throws', async () => {
    sendQuoteRequestMock.mockRejectedValue(new Error('Network error'));
    render(<QuoteRequest />);

    fillRequiredFields();
    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => expect(enqueueMock).toHaveBeenCalled());
    const call = enqueueMock.mock.calls.find(([msg]) => typeof msg === 'string');
    expect(call?.[1]).toEqual({ variant: 'error' });
  });

  it('shows spinner while submitting', async () => {
    let resolveFn: (() => void) | undefined;
    const pending = new Promise<void>((resolve) => {
      resolveFn = resolve;
    });
    sendQuoteRequestMock.mockReturnValue(pending);

    render(<QuoteRequest />);
    fillRequiredFields();

    fireEvent.click(screen.getByRole('button', { name: /send/i }));
    // Spinner appears during submit
    expect(await screen.findByRole('progressbar')).toBeInTheDocument();

    resolveFn?.();
    await waitFor(() => expect(sendQuoteRequestMock).toHaveBeenCalled());
  });

  it('shows validation errors when user enters incomplete information', async () => {
    render(<QuoteRequest />);

    // Try to submit without filling any required fields
    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    // Wait for validation errors to appear and check each required field
    await waitFor(() => {
      expect(screen.getByText('First Name is required')).toBeInTheDocument();
    });

    expect(screen.getByText('Last Name is required')).toBeInTheDocument();
    expect(screen.getByText('Phone is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();

    // Fill only first name and try to submit again
    const firstName = screen.getByTestId('firstName-form-text-input') as HTMLInputElement;
    fireEvent.change(firstName, { target: { value: 'John' } });
    fireEvent.blur(firstName);

    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    // First name error should be gone, but others should remain
    await waitFor(() => {
      expect(screen.queryByText('First Name is required')).not.toBeInTheDocument();
    });

    expect(screen.getByText('Last Name is required')).toBeInTheDocument();
    expect(screen.getByText('Phone is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();

    // Also test that filling an invalid email shows email validation
    const email = screen.getByTestId('email-form-text-input') as HTMLInputElement;
    fireEvent.change(email, { target: { value: 'invalid-email' } });
    fireEvent.blur(email);

    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => {
      expect(screen.getByText('Must be valid email')).toBeInTheDocument();
    });

    // Should not call the API when validation fails
    expect(sendQuoteRequestMock).not.toHaveBeenCalled();
  });
});
