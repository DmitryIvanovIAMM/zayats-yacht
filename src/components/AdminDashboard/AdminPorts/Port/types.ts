import { object, string, InferType } from 'yup';

export const portSchema = object({
  //_id: string().required('ID is required'),
  portName: string().required('Name is required'),
  destinationName: string().required('Destination is required'),
  imageFileName: string()
});

export type PortForm = InferType<typeof portSchema>;

export const defaultPortFormValues: PortForm = {
  portName: '',
  destinationName: '',
  imageFileName: ''
};
