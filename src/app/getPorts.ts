import { apiService } from '@/modules/apiService/apiService';
import { PortFrontend } from '@/models/Port';

export const getPorts = async (url: string) => {
  try {
    const { data } = await apiService().get<{ ports: PortFrontend[] }>(url);
    console.log('c ', data);
    return data;
  } catch (error) {
    //throw new Error(error?.response?.data?.message || 'Failed to get ports');
    return [];
  }
};
