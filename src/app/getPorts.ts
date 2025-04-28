import { apiService } from '@/modules/apiService/apiService';
import { PortFrontend } from '@/models/Port';

export const getPorts = async (url: string) => {
  try {
    const { data } = await apiService().get<{ ports: PortFrontend[] }>(url);
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching ports:', error);
    return [];
  }
};
