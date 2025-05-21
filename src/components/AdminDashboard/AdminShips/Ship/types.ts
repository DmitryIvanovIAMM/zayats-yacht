import { object, string, InferType } from 'yup';

export const shipSchema = object({
  //_id: string().required('ID is required'),
  name: string().required('Name is required'),
  type: string().required('Type is required'),
  builder: string().required('Builder is required'),
  flag: string().required('Flag is required'),
  homePort: string().required('Home Port is required'),
  class: string().required('Class is required'),
  imoNo: string().required('IMO No is required'),
  callSign: string().required('Call Sign is required')
});

export type ShipForm = InferType<typeof shipSchema>;

export const defaultShipFormValues: ShipForm = {
  name: '',
  type: '',
  builder: '',
  flag: '',
  homePort: '',
  class: '',
  imoNo: '',
  callSign: ''
};
