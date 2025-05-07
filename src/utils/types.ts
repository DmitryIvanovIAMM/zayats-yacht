export enum Roles {
  Admin = 'admin',
  User = 'user'
}

export interface TableData<T> {
  data: T[];
  total: number;
}

export interface ActionData<T> extends ActionResult {
  data: T;
}

export interface ActionTableData<T> extends ActionData<{ data: T[]; total: number }> {
  data: TableData<T>;
}

export interface ActionResult {
  success: boolean;
  message?: string;
}
