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

export const validateNewUser = (userData: NewUser) : boolean => {
    if (!userData.firstname || !userData.lastname) {
    return false;
  }
  if (!userData.dateOfBirth || dayjs().diff(userData.dateOfBirth, 'year') < MIN_USER_AGE) {
    return false;
  }
  return true;
};
