export enum Roles {
  Admin = 'admin',
  User = 'user'
}

export enum FormMode {
  ADD = 'add',
  EDIT = 'edit'
}

export interface TableData<T> {
  data: T[];
  total: number;
}

export const emptyTableData = {
  data: [],
  total: 0
};

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

export interface SailingStatusParams {
  sailingId: string;
  isActive: boolean;
}
