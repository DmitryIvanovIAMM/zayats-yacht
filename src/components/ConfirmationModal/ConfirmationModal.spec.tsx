import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  ConfirmationModal,
  ConfirmationModalProps
} from '@/components/ConfirmationModal/ConfirmationModal';

const setup = (propsOverrides?: Partial<ConfirmationModalProps>) => {
  const props: ConfirmationModalProps = {
    open: true,
    onClose: jest.fn(),
    onConfirm: jest.fn(),
    title: 'Delete Sailing',
    message: 'Are you sure you want to delete this sailing?',
    ...propsOverrides
  };

  render(<ConfirmationModal {...props} />);
  return { props };
};

describe('<ConfirmationModal />', () => {
  it('should show title and message', async () => {
    setup();

    expect(screen.getByText('Delete Sailing')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to delete this sailing?')).toBeInTheDocument();
  });

  it('should call onClose() when user click "Cancel" button', async () => {
    const { props } = setup();

    screen.getByText('Cancel').click();
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });

  it('should call onConfirm() when user click "Confirm" button', async () => {
    const { props } = setup();

    screen.getByTestId('confirmation-modal-confirm-button').click();
    expect(props.onConfirm).toHaveBeenCalledTimes(1);
  });
});
