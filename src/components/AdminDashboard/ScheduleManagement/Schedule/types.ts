import * as yup from 'yup';
import { Messages } from '@/helpers/messages';
import { isValidDate } from '@/utils/date-time';

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
              console.log('departureOn: ', departureOn);
              console.log('departureDate: ', departureDate);
              console.log('isValidDate(departureOn): ', isValidDate(departureDate[0] as string));
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
            .min(0, Messages.NonNegativeMiles)
        },
        [['departureOn', 'arrivalOn']]
      )
    )
    .min(1, Messages.ShipStopsRequired)
});

//export type ScheduleForm = yup.InferType<typeof scheduleSchema>;
export interface ShipStopForm {
  portId: string;
  arrivalOn: Date;
  departureOn: Date;
  miles: number;
}
export interface ScheduleForm {
  name: string;
  shipId: string;
  shipStops: ShipStopForm[];
}

export const emptyShipStop: ScheduleForm['shipStops'] = {
  portId: '',
  arrivalOn: '',
  departureOn: '',
  miles: 0
};
export const defaultScheduleFormValues: ScheduleForm = {
  name: '',
  shipId: '',
  shipStops: [emptyShipStop]
};
