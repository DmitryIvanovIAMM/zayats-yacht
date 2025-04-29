import { filteredByLoadingDate } from './helpers';
import { ShipStop } from '@/models/ShipStop';

describe('filteredByLoadingDate()', () => {
  it('should return part of schedules if loading date is end of given interval', () => {
    const schedule1 = [
      { id: 1, arrivalOn: new Date('2020-01-01') } as ShipStop,
      { id: 2, arrivalOn: new Date('2020-02-01') } as ShipStop
    ];
    const schedule2 = [
      { id: 3, arrivalOn: new Date('2020-02-01') } as ShipStop,
      { id: 4, arrivalOn: new Date('2020-04-01') } as ShipStop
    ];
    const schedules = [schedule1, schedule2];
    const startDate = new Date('2020-02-01');
    const endDate = new Date('2020-02-28');

    const expectedSchedules = filteredByLoadingDate(schedules, startDate, endDate);
    expect(expectedSchedules).toEqual([schedule2]);
  });

  it('should return part of schedules if loading date is start of given interval', () => {
    const schedule1 = [
      { id: 1, arrivalOn: new Date('2020-01-01') } as ShipStop,
      { id: 2, arrivalOn: new Date('2020-02-01') } as ShipStop
    ];
    const schedule2 = [
      { id: 3, arrivalOn: new Date('2020-02-01') } as ShipStop,
      { id: 4, arrivalOn: new Date('2020-04-01') } as ShipStop
    ];
    const schedules = [schedule1, schedule2];
    const startDate = new Date('2020-02-01');
    const endDate = new Date('2020-03-01');

    const expectedSchedules = filteredByLoadingDate(schedules, startDate, endDate);
    expect(expectedSchedules).toEqual([schedule2]);
  });

  it('should return all of schedules if loading date in given interval', () => {
    const schedule1 = [
      { id: 1, arrivalOn: new Date('2020-02-01') } as ShipStop,
      { id: 2, arrivalOn: new Date('2020-03-01') } as ShipStop
    ];
    const schedule2 = [
      { id: 3, arrivalOn: new Date('2020-03-01') } as ShipStop,
      { id: 4, arrivalOn: new Date('2020-04-01') } as ShipStop
    ];
    const schedules = [schedule1, schedule2];
    const startDate = new Date('2020-01-01');
    const endDate = new Date('2020-05-01');

    const expectedSchedules = filteredByLoadingDate(schedules, startDate, endDate);
    expect(expectedSchedules).toEqual([schedule1, schedule2]);
  });

  it('should return empty schedules if loading date not in given interval', () => {
    const schedule1 = [
      { id: 1, arrivalOn: new Date('2020-01-01') } as ShipStop,
      { id: 2, arrivalOn: new Date('2020-03-01') } as ShipStop
    ];
    const schedule2 = [
      { id: 3, arrivalOn: new Date('2020-01-01') } as ShipStop,
      { id: 4, arrivalOn: new Date('2020-04-01') } as ShipStop
    ];
    const schedules = [schedule1, schedule2];
    const startDate = new Date('2020-05-01');
    const endDate = new Date('2020-06-01');

    const expectedSchedules = filteredByLoadingDate(schedules, startDate, endDate);
    expect(expectedSchedules).toEqual([]);
  });
});
