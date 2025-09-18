import dayjs, { type Dayjs } from 'dayjs';
import { MIN_USER_AGE } from './constants';

export interface UserBase {
  firstname: string;
  lastname: string;
}

export interface NewUser extends UserBase {
  dateOfBirth: Dayjs | null;
}

export interface User extends UserBase {
  id: string;
  dateOfBirth: Dayjs;
  age: number;
}

export const validateNewUser = (userData: NewUser): boolean => {
  if (!userData.firstname || !userData.lastname) {
    return false;
  }
  const allowed_chars = /^[A-Za-zÀ-ÖØ-öø-ÿ- ]+$/;
  if (
    !userData.firstname.match(allowed_chars) ||
    !userData.lastname.match(allowed_chars)
  ) {
    return false;
  }
  if (
    !userData.dateOfBirth ||
    dayjs().diff(userData.dateOfBirth, 'year') < MIN_USER_AGE
  ) {
    return false;
  }
  if (userData.dateOfBirth.isBefore(dayjs('1900-01-01'))) {
    return false;
  }

  return true;
};
