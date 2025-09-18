import dayjs from 'dayjs';
import { validateNewUser, type NewUser } from '../../types/user';

const validData: NewUser = {
  firstname: 'Alvin',
  lastname: 'Simon-Théodore',
  dateOfBirth: dayjs('1980-01-01'),
};

describe('validateNewUser', () => {
  test('valid new user data', () => {
    expect(validateNewUser(validData)).toBe(true);
  });

  test('empty firstname', () => {
    expect(validateNewUser({ ...validData, firstname: '' })).toBe(false);
  });
  test('empty lastname', () => {
    expect(validateNewUser({ ...validData, lastname: '' })).toBe(false);
  });
  test('bad chars firstname', () => {
    expect(validateNewUser({ ...validData, firstname: 'B1lly' })).toBe(false);
  });
  test('bad chars lastname', () => {
    expect(validateNewUser({ ...validData, lastname: 'B_lly' })).toBe(false);
  });
  test('dob oldest ok', () => {
    expect(
      validateNewUser({ ...validData, dateOfBirth: dayjs('1900-01-01') })
    ).toBe(true);
  });
  test('dob to old', () => {
    expect(
      validateNewUser({ ...validData, dateOfBirth: dayjs('1899-12-31') })
    ).toBe(false);
  });
  test('dob too young', () => {
    expect(
      validateNewUser({ ...validData, dateOfBirth: dayjs().subtract(1, 'day') })
    ).toBe(false);
  });
});
