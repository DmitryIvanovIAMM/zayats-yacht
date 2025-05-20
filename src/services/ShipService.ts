import { ShipModel } from '@/models/Ship';
import dbConnect from '@/modules/mongoose/mongoose';
import { BackendDataFetchArgs } from '@/components/Table/types';
import {
  FiltersFromQuery,
  getFiltersQuery,
  getSortingQuery
} from '@/controllers/mongoDbQueryHelpers';

export default class ShipService {
  private static instance: ShipService;
  private constructor() {}
  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ShipService();
    return this.instance;
  }

  public getAllShips = async () => {
    await dbConnect();

    return ShipModel.find({});
  };

  public getFilteredShips = async (fetchParams: BackendDataFetchArgs) => {
    const {
      name,
      type,
      builder,
      flag,
      homePort,
      class: class1,
      imoNo,
      callSign
    } = fetchParams?.filters ? fetchParams.filters : {};
    const { page, perPage } = fetchParams;

    const filters = getFiltersQuery(
      {
        name: name,
        type: type,
        builder: builder,
        flag: flag,
        homePort: homePort,
        class: class1,
        imoNo: imoNo,
        callSign: callSign
      } as FiltersFromQuery,
      'i'
    );
    const sortingQuery = getSortingQuery(fetchParams.sortBy as string | string[], 'name.asc');
    const query = { ...filters };

    const totalPromise = ShipModel.countDocuments(query);
    const shipsPromise = ShipModel.find(query)
      .collation({ locale: 'en' })
      .sort(sortingQuery)
      .skip(perPage * page)
      .limit(perPage);

    const [ships, total] = await Promise.all([shipsPromise, totalPromise]);

    return {
      data: ships,
      total: total
    };
  };
}

export const shipService = ShipService.getInstance();
