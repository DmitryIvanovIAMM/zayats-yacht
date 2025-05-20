import { object, string, number, InferType, mixed } from 'yup';
import { quoteRequestSchema } from '@/components/QuoteRequest/types';

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
  //_id: '',
  // name: '',
  // type: '',
  // builder: '',
  // flag: '',
  // homePort: '',
  // class: '',
  // imoNo: '',
  // callSign: ''
  name: '11111',
  type: '22222',
  builder: '33333',
  flag: '44444',
  homePort: '55555',
  class: '66666',
  imoNo: '77777',
  callSign: '88888'
};
