import type { Dayjs } from 'dayjs';

export interface UserBase {
  firstname: string;
  lastname: string;
}

export interface NewUser extends UserBase {
  date_of_birth: Dayjs | null;
}

export interface User extends UserBase {
  id: string;
  date_of_birth: Dayjs;
  age: number;
}
