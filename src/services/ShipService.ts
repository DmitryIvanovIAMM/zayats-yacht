import { Ship, ShipModel } from '@/models/Ship';
import { Types } from 'mongoose';
import { BackendDataFetchArgs } from '@/components/Table/types';
import {
  FiltersFromQuery,
  getFiltersQuery,
  getSortingQuery
} from '@/controllers/mongoDbQueryHelpers';
import { User } from '@/models/User';

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
    return ShipModel.find({});
  };

  public getActiveShips = async () => {
    return ShipModel.find({ deletedAt: { $exists: false } });
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
    const query = {
      deletedAt: { $exists: false },
      ...filters
    };

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

  public getShipFromDB = async (_id: string) => {
    const ship = await ShipModel.findById(new Types.ObjectId(_id));
    if (!ship) {
      return null;
    }
    return ship.toObject();
  };

  public addShipInDB = async (ship: Ship) => {
    return ShipModel.create(ship);
  };

  public updateShipInDB = async (id: string, ship: Partial<Ship>) => {
    return ShipModel.findByIdAndUpdate(new Types.ObjectId(id), ship, {
      new: true
    });
  };

  public softDeleteShipFromDB = async (id: string, user: User) => {
    return ShipModel.findByIdAndUpdate(
      new Types.ObjectId(id),
      {
        deletedAt: new Date(),
        deletedBy: user._id
      },
      { new: true }
    );
  };
}

export const shipService = ShipService.getInstance();
