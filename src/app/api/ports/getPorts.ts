import { apiService } from '@/modules/apiService/apiService';
import { PortFrontend } from '@/models/Port';

export const getPorts = async (url: string = '/ports'): Promise<PortFrontend[]> => {
  try {
    const { data } = await apiService().get<{ ports: PortFrontend[] }>(url);
    return data?.ports || [];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching ports:', error);
    return [];
  }
};
