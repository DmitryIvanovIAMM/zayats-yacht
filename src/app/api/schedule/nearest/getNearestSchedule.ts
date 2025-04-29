import { apiService } from '@/modules/apiService/apiService';
import { ShipStopWithSailingAndPort } from '@/models/ShipStop';

export const getNearestSchedule = async (
  url: string = '/schedule/nearest'
): Promise<ShipStopWithSailingAndPort[][]> => {
  try {
    const { data } = await apiService().get<ShipStopWithSailingAndPort[][]>(url);
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching nearest schedule:', error);
    return [];
  }
};
