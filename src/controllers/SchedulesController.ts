'use server';

import { searchRoutes, filteredByLoadingDate } from '@/utils/search/helpers';
import * as schedulesUtils from '../utils/schedules';
import { scheduleService } from '@/services/ScheduleService';
import { shipService } from '@/services/ShipService';
import { ShipStop } from '@/models/ShipStop';
import { ShipsParametersFlat } from '@/models/types';
import { datesDifferenceInDays, maxComputerDate } from '@/utils/date-time';
import { mapSailingsWithShipStopAndPortsToFrontend } from '@/models/mappers';
import { BackendDataFetchArgs } from '@/components/Table/types';
import { ActionResult, SailingStatusParams } from '@/utils/types';
import { Messages } from '@/helpers/messages';
import { User } from '@/models/User';
import {
  ScheduleForm,
  ShipStopForm
} from '@/components/AdminDashboard/ScheduleManagement/Schedule/types';
import { Types } from 'mongoose';
import { Sailing } from '@/models/Sailing';

export const getSchedules = async (shipData: ShipsParametersFlat) => {
  try {
    const shipStops: ShipStop[] =
      await scheduleService.queryAllActiveShipStopsWithPortsAndSailings();
    const ships = await shipService.getAllShips();

    const shipStopsSortedByArrivalTime = [...shipStops].sort(
      schedulesUtils.comparatorByArrivalOnDateString
    );
    const schedules: ShipStop[][] = searchRoutes(
      ships,
      shipStopsSortedByArrivalTime,
      shipData.departurePortId as string,
      shipData.destinationPortId as string
    );
    let filteredByLoadingDateSchedules =
      shipData.startDate && shipData?.endDate
        ? filteredByLoadingDate(schedules, shipData.startDate, shipData?.endDate)
        : schedules;
    if (filteredByLoadingDateSchedules && filteredByLoadingDateSchedules.length === 0) {
      const nextFilteredByLoadingDateSchedules = filteredByLoadingDate(
        schedules,
        shipData?.endDate || maxComputerDate,
        maxComputerDate
      );
      filteredByLoadingDateSchedules =
        nextFilteredByLoadingDateSchedules && nextFilteredByLoadingDateSchedules.length > 0
          ? [nextFilteredByLoadingDateSchedules[0]]
          : [];
    }

    const sortedByStartRouteSchedules = schedulesUtils.sortRoutesByDates(
      filteredByLoadingDateSchedules
    );

    return JSON.parse(JSON.stringify(sortedByStartRouteSchedules));
  } catch {
    return [];
  }
};

export const queryNearestShippings = async (date: Date | string): Promise<ShipStop[][]> => {
  try {
    const startShippingDate = schedulesUtils.isDate(date) ? new Date(date) : new Date();

    const shipStops: ShipStop[] =
      await scheduleService.queryAllActiveShipStopsWithPortsAndSailingsFromDate(startShippingDate);

    const shipStopsSortedByArrivalTime = [...shipStops].sort(
      schedulesUtils.comparatorByArrivalOnDateString
    );

    const firstThreeRoutes = [];
    let currentShipStop = 0;
    let addedShippings = 0;
    if (shipStopsSortedByArrivalTime.length > 0) {
      do {
        const currentSailingId = shipStopsSortedByArrivalTime[currentShipStop].sailingId.toString();
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

    return JSON.parse(JSON.stringify(firstThreeRoutes));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('queryNearestShippings().  err: ', err);
    return [];
  }
};

/*export const queryAllSailingsPortsShips = async () => {
  const sailingsWithShipStopsAndPorts: SailingWithShipStopAndPort[] =
    await scheduleService.querySailingsWithRoutesAndPorts();
  const ships = await shipService.getAllShips();
  const ports = await portService.getAllPorts();

  return {
    sailings: mapSailingsWithShipStopAndPortsToFrontend(sailingsWithShipStopsAndPorts),
    ships: mapShipsToFrontend(ships),
    ports: mapPortsToFrontend(ports)
  };
};*/

export const querySailingsWithRoutesAndPorts = async (fetchParams: BackendDataFetchArgs) => {
  const sailingsWithShipStopsAndPorts =
    await scheduleService.querySailingsWithRoutesAndPorts(fetchParams);

  return {
    data: mapSailingsWithShipStopAndPortsToFrontend(sailingsWithShipStopsAndPorts.data),
    total: sailingsWithShipStopsAndPorts.total
  };
};

export const updateSailingActivityStatus = async (
  user: User,
  { sailingId, isActive }: SailingStatusParams
): Promise<ActionResult> => {
  try {
    await scheduleService.setSailingActivityStatus(sailingId, isActive);

    return { success: true, message: Messages.SailingStatusChangedSuccessfully };
  } catch (error) {
    //eslint-disable-next-line no-console
    console.log('setSailingActivityStatus().  error: ', error);
    return { success: false, message: Messages.FailedChangeSailingStatus };
  }
};

export const deleteSailing = async (user: User, sailingId: string): Promise<ActionResult> => {
  try {
    await scheduleService.softDeleteSailing(sailingId, user._id);

    return { success: true, message: Messages.SailingDeletedSuccessfully };
  } catch (error) {
    //eslint-disable-next-line no-console
    console.log('deleteSailing().  error: ', error);
    return { success: false, message: Messages.FailedDeleteSailing };
  }
};

const sortShipStopsByDepartureOn = (shipStops: ShipStopForm[] = []): ShipStopForm[] => {
  if (!shipStops || shipStops.length === 0) {
    return [];
  }
  return shipStops.sort((a, b) => {
    return new Date(a.departureOn).getTime() - new Date(b.departureOn).getTime();
  });
};

export const addSchedule = async (
  user: User,
  scheduleForm: ScheduleForm
): Promise<ActionResult> => {
  try {
    const sortedShipStopsForm: ShipStopForm[] = sortShipStopsByDepartureOn(scheduleForm.shipStops);
    console.log('sortedShipStopsForm: ', sortedShipStopsForm);

    const newSailing: Sailing = await scheduleService.createSailingByName(scheduleForm.name);
    console.log('newSailing: ', newSailing);

    const newShipStops: ShipStop[] = sortedShipStopsForm.map((formShipStop, index: number) => {
      const newShipStop: ShipStop = {
        _id: new Types.ObjectId(),
        sailingId: newSailing._id,
        portId: new Types.ObjectId(formShipStop.portId),
        shipId: new Types.ObjectId(formShipStop.shipId),
        arrivalOn: new Date(formShipStop.arrivalOn),
        departureOn: new Date(formShipStop.departureOn),
        miles: formShipStop.miles,
        daysAtSea:
          index > 0
            ? datesDifferenceInDays(
                sortedShipStopsForm[index].arrivalOn,
                sortedShipStopsForm[index - 1].departureOn
              )
            : 0,
        daysInPort: datesDifferenceInDays(formShipStop.arrivalOn, formShipStop.departureOn)
      };
      console.log('newShipStop: ', newShipStop);
      return newShipStop;
    });
    await scheduleService.createShipStops(newShipStops);

    // const sailingsPortsShips = await this.queryAllSailingsPortsShips();
    // const result = {
    //   sailingId: newSailing._id,
    //   ...sailingsPortsShips
    // };

    return { success: true, message: Messages.ScheduleAddedSuccessfully };
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log('Error while create schedule: ', error);
    return { success: false, message: error?.message || Messages.FailedAddSchedule };
  }
};

export const updateSchedule = async (
  user: User,
  scheduleForm: ScheduleForm & { _id: string }
): Promise<ActionResult> => {
  try {
    const sailingId = scheduleForm._id as string;
    // const formShipStops = scheduleForm?.shipStops?.sort(function (a, b) {
    //   return new Date(a.departureOn).getTime() - new Date(b.departureOn).getTime();
    // });
    const sortedShipStopsForm = sortShipStopsByDepartureOn(scheduleForm.shipStops);
    const updatedSailing = await scheduleService.updateSailingName(sailingId, scheduleForm.name);
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
        daysInPort: datesDifferenceInDays(formShipStops[i].arrivalOn, formShipStops[i].departureOn)
      };
      newShipStops.push(newShipStop);
    }
    await scheduleService.createShipStops(newShipStops);

    // const sailingsPortsShips = await this.queryAllSailingsPortsShips();
    // const result = {
    //   sailingId: updatedSailing._id,
    //   ...sailingsPortsShips
    // };

    return { success: true, message: Messages.ScheduleUpdatedSuccessfully };
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log('Error while updating schedule: ', error);
    return { success: false, message: error?.message || Messages.FailedUpdateSchedule };
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
  };
}

export const schedulesController = SchedulesController.getInstance();*/
