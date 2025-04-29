import { apiService } from '@/modules/apiService/apiService';
import { ShipStopWithSailingAndPort } from '@/models/ShipStop';
import { ShipsParameters } from '@/models/types';

export const getSchedule = async (
  shipsParameters: ShipsParameters,
  url: string = '/schedule'
): Promise<ShipStopWithSailingAndPort[][]> => {
  try {
    const { departurePortId, destinationPortId, loadingDate } = shipsParameters;
    const queryString = new URLSearchParams({
      departurePortId: departurePortId || '',
      destinationPortId: destinationPortId || ''
    });
    if (loadingDate?.startDate) queryString.set('startDate', loadingDate.startDate.toString());
    if (loadingDate?.endDate) queryString.set('endDate', loadingDate.endDate.toString());

    const { data } = await apiService().get<ShipStopWithSailingAndPort[][]>(
      `${url}?${queryString}`
    );
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching nearest schedule:', error);
    return [];
  }
};
