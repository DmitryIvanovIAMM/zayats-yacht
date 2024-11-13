import { filteredByLoadingDate } from './helpers';

describe('filteredByLoadingDate()', () => {
  it('should return part of schedules if loading date is end of given interval', () => {
    const schedule1 = [
      { id: 1, arrivalOn: new Date('2020-01-01') },
      { id: 2, arrivalOn: new Date('2020-02-01') }
    ];
    const schedule2 = [
      { id: 3, arrivalOn: new Date('2020-02-01') },
      { id: 4, arrivalOn: new Date('2020-04-01') }
    ];
    const schedules = [schedule1, schedule2];
    const arrivalDates = {
      startDate: new Date('2020-02-01'),
      endDate: new Date('2020-02-28')
    };

    const expectedSchedules = filteredByLoadingDate(schedules, arrivalDates);
    expect(expectedSchedules).toEqual([schedule2]);
  });

  it('should return part of schedules if loading date is start of given interval', () => {
    const schedule1 = [
      { id: 1, arrivalOn: new Date('2020-01-01') },
      { id: 2, arrivalOn: new Date('2020-02-01') }
    ];
    const schedule2 = [
      { id: 3, arrivalOn: new Date('2020-02-01') },
      { id: 4, arrivalOn: new Date('2020-04-01') }
    ];
    const schedules = [schedule1, schedule2];
    const arrivalDates = {
      startDate: new Date('2020-02-01'),
      endDate: new Date('2020-03-01')
    };

    const expectedSchedules = filteredByLoadingDate(schedules, arrivalDates);
    expect(expectedSchedules).toEqual([schedule2]);
  });

  it('should return all of schedules if loading date in given interval', () => {
    const schedule1 = [
      { id: 1, arrivalOn: new Date('2020-02-01') },
      { id: 2, arrivalOn: new Date('2020-03-01') }
    ];
    const schedule2 = [
      { id: 3, arrivalOn: new Date('2020-03-01') },
      { id: 4, arrivalOn: new Date('2020-04-01') }
    ];
    const schedules = [schedule1, schedule2];
    const arrivalDates = {
      startDate: new Date('2020-01-01'),
      endDate: new Date('2020-05-01')
    };

    const expectedSchedules = filteredByLoadingDate(schedules, arrivalDates);
    expect(expectedSchedules).toEqual([schedule1, schedule2]);
  });

  it('should return empty schedules if loading date not in given interval', () => {
    const schedule1 = [
      { id: 1, arrivalOn: new Date('2020-01-01') },
      { id: 2, arrivalOn: new Date('2020-03-01') }
    ];
    const schedule2 = [
      { id: 3, arrivalOn: new Date('2020-01-01') },
      { id: 4, arrivalOn: new Date('2020-04-01') }
    ];
    const schedules = [schedule1, schedule2];
    const arrivalDates = {
      startDate: new Date('2020-05-01'),
      endDate: new Date('2020-06-01')
    };

    const expectedSchedules = filteredByLoadingDate(schedules, arrivalDates);
    expect(expectedSchedules).toEqual([]);
  });
});
