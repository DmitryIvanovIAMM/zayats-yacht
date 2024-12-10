import { Ship } from '../models/Ship';
//import { validateShip } from '../validation/ship';
import { searchRoutes, filteredByLoadingDate } from '../utils/search/helpers';
import * as schedulesUtils from '../utils/schedules';
import { scheduleService } from '@/services/ScheduleService';
import { shipService } from '@/services/ShipService';
import { portService } from '@/services/PortService';
import { ShipStop } from '@/models/ShipStop';

export default class SchedulesController {
  private static instance: SchedulesController;
  private constructor() {}
  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new SchedulesController();
    return this.instance;
  }

  //public scheduleService = ;
  //public portService = new PortService();
  //public shipService = new ShipService();

  /*public getSchedules = async (req, res, next) => {
    // Route data validation
    const { errors, isValid } = validateShip(req.body);
    // Check validation
    if (!isValid) {
      res.status(400);
      res.json(errors);
      return res;
    }

    const shipData = req.body;

    try {
      const shipStops = await scheduleService.queryAllActiveShipStopsWithPortsAndSailings();
      const ships = await Ship.find({});

      const shipStopsSortedByArrivalTime = [...shipStops].sort(
        schedulesUtils.comparatorByArrivalOnDateString
      );
      const schedules = searchRoutes(
        ships,
        shipStopsSortedByArrivalTime,
        shipData.departurePortId,
        shipData.destinationPortId
      );
      let filteredByLoadingDateSchedules = shipData.loadingDate
        ? filteredByLoadingDate(schedules, shipData.loadingDate)
        : schedules;
      if (filteredByLoadingDateSchedules && filteredByLoadingDateSchedules.length === 0) {
        const fakeLoadingDate = {
          startDate: shipData?.loadingDate?.endDate || maxComputerDate,
          endDate: maxComputerDate
        };
        const nextFilteredByLoadingDateSchedules = filteredByLoadingDate(
          schedules,
          fakeLoadingDate
        );
        filteredByLoadingDateSchedules =
          nextFilteredByLoadingDateSchedules && nextFilteredByLoadingDateSchedules.length > 0
            ? [nextFilteredByLoadingDateSchedules[0]]
            : [];
      }

      const sortedByStartRouteSchedules = schedulesUtils.sortRoutesByDates(
        filteredByLoadingDateSchedules
      );

      return res.status(200).json(sortedByStartRouteSchedules);
    } catch (err) {
      next(err);
    }
  };*/

  public queryNearestShippings = async (date: Date | string): Promise<ShipStop[][]> => {
    try {
      const startShippingDate = schedulesUtils.isDate(date) ? new Date(date) : new Date();

      const shipStops: ShipStop[] =
        await scheduleService.queryAllActiveShipStopsWithPortsAndSailingsFromDate(
          startShippingDate
        );

      const shipStopsSortedByArrivalTime = [...shipStops].sort(
        schedulesUtils.comparatorByArrivalOnDateString
      );

      const firstThreeRoutes = [];
      let currentShipStop = 0;
      let addedShippings = 0;
      if (shipStopsSortedByArrivalTime.length > 0) {
        do {
          const currentSailingId =
            shipStopsSortedByArrivalTime[currentShipStop].sailingId.toString();
          const shipStopsForSailing = [...shipStopsSortedByArrivalTime]
            .slice(currentShipStop, shipStopsSortedByArrivalTime.length - 1)
            .filter((shipStop) => shipStop.sailingId.toString() === currentSailingId);
          if (shipStopsForSailing.length > 0) {
            firstThreeRoutes.push(shipStopsForSailing.slice(0, 2));
            addedShippings++;
          }
          currentShipStop++;
        } while (addedShippings < 3 && currentShipStop < shipStopsSortedByArrivalTime.length);
      }

      return firstThreeRoutes;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('queryNearestShippings().  err: ', err);
      return [];
    }
  };

  /*public getSailing = async (req, res) => {
    try {
      const sailingId = req.params.sailingId;
      const ports = await portService.getAllPorts();

      const sailingWithShipStops = await scheduleService.querySailingWithShipStops(sailingId);
      const result = {
        sailing: sailingWithShipStops,
        ports: ports
      };

      res.status(200).json(result);
    } catch (error) {
      res.status(400).json(Messages.FailedDeleteSailing);
    }
  };

  public setSailingActivityStatus = async (req, res) => {
    try {
      const isActive = req.params.isActive;
      const sailingId = req.params.sailingId;

      const updatedSailing = await scheduleService.setSailingActivityStatus(sailingId, isActive);

      const sailingsPortsShips = await this.queryAllSailingsPortsShips();
      const result = {
        sailingId: updatedSailing._id,
        ...sailingsPortsShips
      };

      res.status(200).json(result);
    } catch (error) {
      res.status(400).json(Messages.FailedChangeSailingStatus);
    }
  };

  public deleteSailing = async (req, res) => {
    try {
      const sailingId = req.params.sailingId;

      const deletedSailing = await scheduleService.softDeleteSailing(sailingId);
      if (deletedSailing) {
        return res.status(200).json(Messages.SailingDeletesSuccessfully);
      }
      res.status(400).json(Messages.FailedDeleteSailing);
    } catch (error) {
      res.status(400).json(Messages.FailedDeleteSailing);
    }
  };

  public addSailing = async (req, res, next) => {
    try {
      const formShipStops = req.body.shipStops.sort(function (a, b) {
        return new Date(a.departureOn).getTime() - new Date(b.departureOn).getTime();
      });
      const newSailing = await scheduleService.createSailingByName(req.body.name);

      const newShipStops = formShipStops.map((formShipStop, index: number) => {
        return {
          sailingId: newSailing._id,
          portId: formShipStop.portId,
          shipId: formShipStop.shipId,
          arrivalOn: formShipStop.arrivalOn,
          departureOn: formShipStop.departureOn,
          miles: formShipStop.miles,
          daysAtSea:
            index > 0
              ? datesDifferenceInDays(
                  formShipStops[index].arrivalOn,
                  formShipStops[index - 1].departureOn
                )
              : 0,
          daysInPort: datesDifferenceInDays(formShipStop.arrivalOn, formShipStop.departureOn)
        };
      });
      await scheduleService.createShipStops(newShipStops);

      const sailingsPortsShips = await this.queryAllSailingsPortsShips();
      const result = {
        sailingId: newSailing._id,
        ...sailingsPortsShips
      };

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  public updateSailing = async (req, res, next) => {
    try {
      const sailingId = req.params.sailingId;
      const formShipStops = req.body.shipStops.sort(function (a, b) {
        return new Date(a.departureOn).getTime() - new Date(b.departureOn).getTime();
      });
      const updatedSailing = await scheduleService.updateSailingName(sailingId, req.body.name);
      await scheduleService.deleteShipStopsBySailingId(sailingId);

      const newShipStops = [];
      for (let i = 0; i < formShipStops.length; i++) {
        const newShipStop = {
          sailingId: updatedSailing._id,
          portId: formShipStops[i].portId,
          shipId: formShipStops[i].shipId,
          arrivalOn: formShipStops[i].arrivalOn,
          departureOn: formShipStops[i].departureOn,
          miles: formShipStops[i].miles,
          daysAtSea:
            i > 0
              ? datesDifferenceInDays(formShipStops[i].arrivalOn, formShipStops[i - 1].departureOn)
              : 0,
          daysInPort: datesDifferenceInDays(
            formShipStops[i].arrivalOn,
            formShipStops[i].departureOn
          )
        };
        newShipStops.push(newShipStop);
      }
      await scheduleService.createShipStops(newShipStops);

      const sailingsPortsShips = await this.queryAllSailingsPortsShips();
      const result = {
        sailingId: updatedSailing._id,
        ...sailingsPortsShips
      };

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  public getAllSchedulesToEdit = async (req, res, next) => {
    try {
      const result = await this.queryAllSailingsPortsShips();

      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  private queryAllSailingsPortsShips = async () => {
    const sailingsWithShipStopsAndPorts = await scheduleService.querySailingsWithRoutesAndPorts();
    const ships = await shipService.getAllShips();
    const ports = await portService.getAllPorts();

    return {
      sailings: sailingsWithShipStopsAndPorts,
      ships: ships,
      ports: ports
    };
  };*/
}

export const schedulesController = SchedulesController.getInstance();
