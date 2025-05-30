import { object, string, InferType } from 'yup';

// https://github.com/jquense/yup/issues/1158
// yup cannot cast optional type, but Maybe type
// so schema definition should be corrected
// https://github.com/jquense/yup/issues/1274#issuecomment-879712035
// use "@hookform/resolvers": "^3.9.1" as it more correctly handles optional types
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
