export enum Roles {
  Admin = 'admin',
  User = 'user'
}

export interface LongActionData<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface LongActionTableData<T> {
  success: boolean;
  data: {
    data: T[];
    total: number;
  };
  message?: string;
}

export interface LongActionResult {
  success: boolean;
  message?: string;
}
