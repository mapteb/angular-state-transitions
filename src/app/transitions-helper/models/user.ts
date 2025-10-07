export interface IUser {
  id?: number;
  username?: string | null;
  password?: string | null;
  role?: string;
}

export class User implements IUser  {
  id?: number;
  username?: string | null;
  password?: string | null;
  role?: string;
}