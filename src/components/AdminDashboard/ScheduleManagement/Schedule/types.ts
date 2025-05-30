import * as yup from 'yup';
import { Messages } from '@/helpers/messages';

export const scheduleSchema = yup.object().shape({
  name: yup.string().required(Messages.SailingNameRequired),
  shipId: yup.string().required(Messages.ShipRequired),
  shipStops: yup
    .array()
    .of(
      yup.object().shape(
        {
          portId: yup.string().required(Messages.PortIdRequired),
          arrivalOn: yup
            .date()
            .required()
            .when('departureOn', (departureOn, schema) => {
              return (
                departureOn && schema.max(departureOn, Messages.ArrivalOnShouldBeBeforeDepartureOn)
              );
            }),
          departureOn: yup
            .date()
            .required()
            .when('arrivalOn', (arrivalOn, schema) => {
              return arrivalOn && schema.min(arrivalOn, Messages.DepartureOnShouldBeAfterArrivalOn);
            }),
          miles: yup.number().required(Messages.MilesRequired).min(0, Messages.NonNegativeMiles)
        },
        [['departureOn', 'arrivalOn']]
      )
    )
    .min(1, Messages.ShipStopsRequired)
});

export type ScheduleForm = yup.InferType<typeof scheduleSchema>;

export const defaultScheduleFormValues: ScheduleForm = {
  name: '',
  shipId: '',
  shipStops: [
    {
      portId: '',
      arrivalOn: new Date(),
      departureOn: new Date(),
      miles: 0
    }
  ]
};
