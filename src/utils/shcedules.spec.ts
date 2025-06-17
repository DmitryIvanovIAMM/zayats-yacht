import { isDate } from './schedules';

describe('isDate()', () => {
  it('should return true for Date object', () => {
    const testDate1 = new Date();
    expect(isDate(testDate1)).toEqual(true);

    const testDate2 = new Date('2020-01-01');
    expect(isDate(testDate2)).toEqual(true);

    const testDate3 = new Date(2020, 1, 1);
    expect(isDate(testDate3)).toEqual(true);

    const testDate4 = '2020-01-01';
    expect(isDate(testDate4)).toEqual(true);
  });

  it('should return false for non Date object', () => {
    const testDate1 = 'test date';
    expect(isDate(testDate1)).toEqual(false);
  });

  it('should return false for null', () => {
    const testDate1 = null;
    expect(isDate(testDate1)).toEqual(false);
  });

  it('should return false for undefined', () => {
    const testDate1 = undefined;
    expect(isDate(testDate1)).toEqual(false);
  });
});
