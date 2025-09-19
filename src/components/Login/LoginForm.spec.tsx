import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// Mocks must be declared before importing the component under test
const pushMock = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}));

const signInMock = jest.fn();
jest.mock('next-auth/react', () => ({
  signIn: (...args: any[]) => signInMock(...args),
}));

import LoginForm from './LoginForm';

describe('LoginForm', () => {
  beforeEach(() => {
    pushMock.mockReset();
    signInMock.mockReset();
  });

  function getInputs() {
    const nameInput = screen.getByTestId('name-form-text-input') as HTMLInputElement;
    const emailInput = screen.getByTestId('email-form-text-input') as HTMLInputElement;
    const passwordInput = screen.getByTestId('password-form-text-input') as HTMLInputElement;
    return { nameInput, emailInput, passwordInput };
  }

  it('renders and toggles password visibility', () => {
    render(<LoginForm />);

    const { passwordInput } = getInputs();
    expect(passwordInput.type).toBe('password');

    const eye = screen.getByTestId('password-eye');
    fireEvent.click(eye);
    expect(passwordInput.type).toBe('text');

    fireEvent.click(eye);
    expect(passwordInput.type).toBe('password');
  });

  it('disables submit until form is valid, then enables after valid input', async () => {
    render(<LoginForm />);

    const submit = screen.getByTestId('login-form-button') as HTMLButtonElement;
    expect(submit).toBeDisabled();

    const { emailInput, passwordInput } = getInputs();
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.blur(emailInput);
    fireEvent.change(passwordInput, { target: { value: 'StrongP4ssword' } });
    fireEvent.blur(passwordInput);

    await waitFor(() => expect(submit).not.toBeDisabled());
  });

  it('signs in successfully and redirects to custom url', async () => {
    signInMock.mockResolvedValue({ error: undefined });
    render(<LoginForm loginRedirectUrl="/services" />);

    const { emailInput, passwordInput } = getInputs();
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.blur(emailInput);
    fireEvent.change(passwordInput, { target: { value: 'StrongP4ssword' } });
    fireEvent.blur(passwordInput);

    const submit = screen.getByTestId('login-form-button') as HTMLButtonElement;
    await waitFor(() => expect(submit).not.toBeDisabled());
    fireEvent.click(submit);

    await waitFor(() => expect(signInMock).toHaveBeenCalled());
    expect(signInMock).toHaveBeenCalledWith('credentials', expect.objectContaining({
      email: 'test@example.com',
      password: 'StrongP4ssword',
      redirect: false,
      callbackUrl: '/services',
    }));
    expect(pushMock).toHaveBeenCalledWith('/services');
  });

  it('shows error message when signIn fails', async () => {
    signInMock.mockResolvedValue({ error: 'Invalid credentials' });
    render(<LoginForm />);

    const { emailInput, passwordInput } = getInputs();
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.blur(emailInput);
    fireEvent.change(passwordInput, { target: { value: 'StrongP4ssword' } });
    fireEvent.blur(passwordInput);

    const submit = screen.getByTestId('login-form-button') as HTMLButtonElement;
    await waitFor(() => expect(submit).not.toBeDisabled());
    fireEvent.click(submit);

    expect(await screen.findByText('Invalid credentials')).toBeInTheDocument();
    expect(pushMock).not.toHaveBeenCalled();
  });

  it('shows spinner while submitting', async () => {
    let resolveFn: ((value?: void) => void) | undefined;
    const pending = new Promise<void>((resolve: (value?: void) => void) => {
      resolveFn = resolve;
    });
    signInMock.mockReturnValue(pending);

    render(<LoginForm />);

    const { emailInput, passwordInput } = getInputs();
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.blur(emailInput);
    fireEvent.change(passwordInput, { target: { value: 'StrongP4ssword' } });
    fireEvent.blur(passwordInput);

    const submit = screen.getByTestId('login-form-button') as HTMLButtonElement;
    await waitFor(() => expect(submit).not.toBeDisabled());

    fireEvent.click(submit);

    // CircularProgress renders with role "progressbar"
    expect(await screen.findByRole('progressbar')).toBeInTheDocument();
    resolveFn?.();
    await waitFor(() => expect(signInMock).toHaveBeenCalled());
  });
});
