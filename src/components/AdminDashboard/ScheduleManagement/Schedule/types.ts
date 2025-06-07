import * as yup from 'yup';
import { Messages } from '@/helpers/messages';
import { isValidDate } from '@/utils/date-time';
import { DEFAULT_INSURANCE_COEFFICIENT, DEFAULT_SPACE_PRICE } from '@/utils/constants';

export const scheduleSchema = yup.object().shape({
  name: yup.string().required(Messages.SailingNameRequired),
  shipId: yup.string().required(Messages.SelectShip),
  shipStops: yup
    .array()
    .of(
      yup.object().shape(
        {
          portId: yup.string().required(Messages.SelectPort),
          arrivalOn: yup
            .date()
            .typeError(Messages.DateRequired)
            .required()
            .when('departureOn', (departureOn, schema) => {
              const departureDate = departureOn ? (departureOn[0] as string) : '';
              if (isValidDate(departureDate)) {
                return (
                  departureOn &&
                  schema.max(departureDate, Messages.ArrivalOnShouldBeBeforeDepartureOn)
                );
              }
              return schema;
            }),
          departureOn: yup
            .date()
            .typeError(Messages.DateRequired)
            .required()
            .when('arrivalOn', (arrivalOn, schema) => {
              const arrivalDate = arrivalOn ? (arrivalOn[0] as string) : '';
              if (isValidDate(arrivalDate)) {
                return (
                  arrivalOn && schema.min(arrivalOn, Messages.DepartureOnShouldBeAfterArrivalOn)
                );
              }
              return schema;
            }),
          miles: yup
            .number()
            .typeError(Messages.MilesRequired)
            .required(Messages.MilesRequired)
            .min(0, Messages.NonNegativeNumber),
          spacePrice: yup
            .number()
            .typeError(Messages.SpacePriceRequired)
            .required(Messages.SpacePriceRequired)
            .min(0, Messages.NonNegativeNumber),
          insuranceCoefficient: yup
            .number()
            .typeError(Messages.InsuranceCoefficientRequired)
            .required(Messages.NonNegativeNumber)
            .min(0, Messages.NonNegativeNumber)
        },
        [['departureOn', 'arrivalOn']]
      )
    )
    .min(1, Messages.ShipStopsRequired)
});

export interface ShipStopForm {
  portId: string;
  arrivalOn: Date | string;
  departureOn: Date | string;
  miles: number;
  spacePrice: number;
  insuranceCoefficient: number;
}
export interface ScheduleForm {
  name: string;
  shipId: string;
  shipStops: ShipStopForm[];
}

export const emptyShipStop: ShipStopForm = {
  portId: '',
  arrivalOn: '',
  departureOn: '',
  miles: 0,
  spacePrice: DEFAULT_SPACE_PRICE,
  insuranceCoefficient: DEFAULT_INSURANCE_COEFFICIENT
};
export const defaultScheduleFormValues: ScheduleForm = {
  name: '',
  shipId: '',
  shipStops: [emptyShipStop]
};
