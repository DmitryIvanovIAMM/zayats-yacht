import { object, string, number, InferType, mixed } from 'yup';

export const LENGTH_METRIC = {
  meters: 'meters',
  feet: 'feet'
};
export const lengthMetric = {
  [LENGTH_METRIC.meters]: 'm',
  [LENGTH_METRIC.feet]: 'ft'
};

export const WEIGHT_METRIC = {
  metricTons: 'metric tons',
  lbs: 'lbs'
};
export const lengthMetricViewConnector = {
  [LENGTH_METRIC.meters]: 'Meters',
  [LENGTH_METRIC.feet]: 'Feet'
};

export const PURPOSE_OF_TRANSPORT = {
  boatShow: 'Boat Show',
  charter: 'Charter',
  purchaseSale: 'Purchase/Sale',
  yardWork: 'Yard Work',
  fishingTournament: 'Fishing Tournament',
  regatta: 'Regatta',
  other: 'Other',
  '': ''
};
export const purposeOfTransportViewConnector = {
  [PURPOSE_OF_TRANSPORT.boatShow]: 'Boat Show',
  [PURPOSE_OF_TRANSPORT.charter]: 'Charter',
  [PURPOSE_OF_TRANSPORT.purchaseSale]: 'Purchase/Sale',
  [PURPOSE_OF_TRANSPORT.yardWork]: 'Yard Work',
  [PURPOSE_OF_TRANSPORT.fishingTournament]: 'Fishing Tournament',
  [PURPOSE_OF_TRANSPORT.regatta]: 'Regatta',
  [PURPOSE_OF_TRANSPORT.other]: 'Other',
  [PURPOSE_OF_TRANSPORT['']]: 'Not specified'
};

/*
export enum PreferredPronoun {
  notSpecified = '',
  male = 'Male (him)',
  female = 'Female (her)',
  neutral = 'Neutral (they)',
  other = 'Other'
}

export const preferredPronounViewConnector = {
  [PreferredPronoun.notSpecified]: 'Not specified',
  [PreferredPronoun.male]: 'Male (him)',
  [PreferredPronoun.female]: 'Female (her)',
  [PreferredPronoun.neutral]: 'Neutral (they)',
  [PreferredPronoun.other]: 'Other'
};

 */

export const quoteRequestSchema = object({
  firstName: string().required('First Name is required'),
  lastName: string().required('Last Name is required'),
  phoneNumber: string().required('Phone is required').nullable(),
  email: string().required('Email is required').email('Must be valid email').required(),
  bestTimeToContact: string().optional().nullable(),
  purpose: mixed().oneOf(Object.keys(PURPOSE_OF_TRANSPORT)).optional().nullable(),
  yachtName: string().optional().nullable(),
  yachtModel: string().optional().nullable(),
  insuredValue: number().required('Insured value is required'),
  length: number().optional().nullable(),
  lengthUnit: mixed().oneOf(Object.keys(LENGTH_METRIC)).optional().nullable(),
  beam: number().optional().nullable(),
  beamUnit: mixed().oneOf(Object.keys(LENGTH_METRIC)).optional().nullable(),
  weight: number().optional().nullable(),
  weightUnit: mixed().oneOf(Object.keys(WEIGHT_METRIC)).optional().nullable(),
  fromWhere: string().optional().nullable(),
  toWhere: string().optional().nullable(),
  when: string().optional().nullable(),
  notes: string().optional().nullable()
});

export type QuoteRequestForm = InferType<typeof quoteRequestSchema>;
export const defaultQuoteRequest: QuoteRequestForm = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  bestTimeToContact: '',
  purpose: '',
  yachtName: '',
  yachtModel: '',
  insuredValue: 0,
  length: 0,
  lengthUnit: LENGTH_METRIC.meters,
  beam: 0,
  beamUnit: LENGTH_METRIC.meters,
  weight: 0,
  weightUnit: WEIGHT_METRIC.metricTons,
  fromWhere: '',
  toWhere: '',
  when: '',
  notes: ''
};
