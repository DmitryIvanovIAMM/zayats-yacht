import { apiService } from '@/modules/apiService/apiService';
import { ShipStopWithSailingAndPort } from '@/models/ShipStop';

export const getNearestSchedule = async (url: string) => {
  try {
    const { data } = await apiService().get<{ data: ShipStopWithSailingAndPort[][] }>(url);
    console.log('getNearestSchedule().  data: ', data);
    return data;
  } catch (error) {
    return [];
  }
};
