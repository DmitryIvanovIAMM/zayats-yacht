import { InferType, object, string } from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/; // min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const loginSchema = object({
  name: string().required('Full Name is required'),
  email: string().required('Email is required').email('Must be valid email').required(),
  password: string()
    .required('Password is required')
    .matches(passwordRules, { message: 'Please create a stronger password' })
});

export type LoginFormValues = InferType<typeof loginSchema>;

export const defaultLoginValues: LoginFormValues = {
  name: '',
  email: '',
  password: ''
};
