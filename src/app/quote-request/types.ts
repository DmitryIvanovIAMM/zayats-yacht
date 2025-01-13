import { object, string, number, date, InferType, mixed } from 'yup';

export const LENGTH_METRIC = {
  meters: 'meters',
  feet: 'feet'
};

export const WEIGHT_METRIC = {
  metricTons: 'metric tons',
  lbs: 'lbs'
};

export const PURPOSE_OF_TRANSPORT = {
  boatShow: 'Boat Show',
  charter: 'Charter',
  purchaseSale: 'Purchase/Sale',
  yardWork: 'Yard Work',
  fishingTournament: 'Fishing Tournament',
  regatta: 'Regatta',
  other: 'Other'
};

export const quoteRequestSchema = object({
  firstName: string().required().length(1),
  lastName: string().required(),
  phone: string().required().nullable(),
  email: string().email().required(),
  bestTimeToContact: string().optional().nullable(),
  purposeOfTransport: mixed().oneOf(Object.values(PURPOSE_OF_TRANSPORT)).optional().nullable(),
  yachtName: string().optional().nullable(),
  yachtModel: string().optional().nullable(),
  insuredValue: number().optional().nullable(),
  length: number().optional().nullable(),
  lengthUnit: mixed().oneOf(Object.values(LENGTH_METRIC)).optional().nullable(),
  beam: number().optional().nullable(),
  beamUnit: mixed().oneOf(Object.values(LENGTH_METRIC)).optional().nullable(),
  weight: number().optional().nullable(),
  weightUnit: mixed().oneOf(Object.values(WEIGHT_METRIC)).optional().nullable(),
  fromWhere: string().optional().nullable(),
  toWhere: string().optional().nullable(),
  when: date().optional().nullable(),
  notes: string().optional().nullable()
});

export type QuoteRequestForm = InferType<typeof quoteRequestSchema>;
export const defaultQuoteRequest: QuoteRequestForm = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  bestTimeToContact: '',
  purposeOfTransport: '',
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

// parse and assert validity
//let quoteReqquest = await quoteRequestSchema.validate(await fetchUser());
