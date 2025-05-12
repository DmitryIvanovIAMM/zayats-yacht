export const userFrontendFields = ['_id', 'name', 'email', 'role'];

export interface UserFrontend {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}
