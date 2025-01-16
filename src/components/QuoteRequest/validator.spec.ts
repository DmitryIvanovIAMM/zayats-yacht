import { quoteRequestSchema } from '@/components/QuoteRequest/types';
import { ValidationError } from 'yup';

describe('QuoteRequest validator', () => {
  it('should validate the firstName field', async () => {
    await expect(
      quoteRequestSchema.validateAt('firstName', { firstName: 'Vasilij' })
    ).resolves.toBeTruthy();

    await expect(quoteRequestSchema.validateAt('firstName', '')).rejects.toThrow(
      new ValidationError('First Name is required')
    );
  });

  it('should validate the lastName field', async () => {
    await expect(
      quoteRequestSchema.validateAt('lastName', { lastName: 'Pupkin' })
    ).resolves.toBeTruthy();

    await expect(quoteRequestSchema.validateAt('lastName', '')).rejects.toThrow(
      new ValidationError('Last Name is required')
    );
  });

  it('should validate the phoneNumber field', async () => {
    await expect(
      quoteRequestSchema.validateAt('phoneNumber', { phoneNumber: '1234567890' })
    ).resolves.toBeTruthy();

    await expect(quoteRequestSchema.validateAt('phoneNumber', '')).rejects.toThrow(
      new ValidationError('Phone is required')
    );
  });

  it('should validate the email field', async () => {
    await expect(
      quoteRequestSchema.validateAt('email', { email: 'correct@email.com' })
    ).resolves.toBeTruthy();

    await expect(
      quoteRequestSchema.validateAt('email', { email: 'wrong.email.com' })
    ).rejects.toThrow(new ValidationError('Must be valid email'));

    await expect(quoteRequestSchema.validateAt('email', { email: '' })).rejects.toThrow(
      new ValidationError('Email is required')
    );
  });

  it('should pass with correct required values', async () => {
    const quoteRequest = {
      email: 'vasilij.pupkin@email.com',
      firstName: 'Vasilij',
      lastName: 'Pupkin',
      phoneNumber: '+1234567',
      insuredValue: 1000
    };

    await expect(quoteRequestSchema.validate(quoteRequest)).resolves.toBeTruthy();
  });

  it('should fail with empty default values', async () => {
    const quoteRequest = {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: ''
    };

    await expect(quoteRequestSchema.validate(quoteRequest)).rejects.toThrow();
  });
});
