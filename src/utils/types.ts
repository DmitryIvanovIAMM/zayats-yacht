export enum Roles {
  Admin = 'admin',
  User = 'user'
}

export interface LongActionResult<T> {
  success: boolean;
  data: T;
  message?: string;
}
