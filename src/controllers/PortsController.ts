'use server';

import { scheduleService } from '@/services/ScheduleService';
import { portService } from '@/services/PortService';
import { Port } from '@/models/Port';
import { ShipStop } from '@/models/ShipStop';
import { BackendDataFetchArgs } from '@/components/Table/types';
import { mapPortsToFrontend } from '@/models/mappers';
import { PortForm } from '@/components/AdminDashboard/AdminPorts/Port/types';
import { ActionData, ActionResult } from '@/utils/types';
import { User } from '@/models/User';
import { Messages } from '@/helpers/messages';
import { Types } from 'mongoose';
import fs from 'fs';
import path from 'path';
import { insertRandomBeforeExtension } from '@/utils/randomString';

export const getActivePorts = async () => {
  try {
    const ports: Port[] = await portService.getAllPorts();
    const shipStops: ShipStop[] = await scheduleService.getActiveShipStops();
    const usedPortsId: string[] = shipStops.map((shipStop) => shipStop.portId.toString());
    const uniqueUsedPortsIds = Array.from(new Set(usedPortsId));
    const usedPorts: Port[] = ports.filter(
      (port) => uniqueUsedPortsIds.indexOf(port._id.toString()) > -1
    );

    return {
      ports: mapPortsToFrontend(usedPorts),
      message: null
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Error while fetching ports: ', err);
    //logger.info(err);
    return { ports: [], destinations: [], message: 'Error while fetching ports' };
  }
};

export const getFilteredPorts = async (fetchParams: BackendDataFetchArgs) => {
  const { data, total } = await portService.getFilteredPorts(fetchParams);

  return {
    data: mapPortsToFrontend(data),
    total: total
  };
};

export const getPort = async (User: User, _id: string): Promise<ActionData<PortForm | null>> => {
  try {
    const port = await portService.getPortFromDB(_id);
    if (!port) {
      return { success: false, message: Messages.PortNotFound, data: null };
    }
    const portForm: PortForm = {
      portName: port.portName,
      destinationName: port.destinationName
    };
    return { success: true, data: portForm };
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log('Error while fetching port: ', error);
    return { success: false, message: error?.message || Messages.FailedGetPort, data: null };
  }
};

export const addPort = async (user: User, portFormData: FormData): Promise<ActionResult> => {
  try {
    let fileName = '';
    const file = portFormData.get('port-image') as File;
    if (file) {
      fileName = insertRandomBeforeExtension(file.name as string);
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Save the file to the filesystem (or cloud storage)
      //const filePath = `./public/images/${fileName}`;
      // path.join(__dirname,  'public')
      //const filePath = process.cwd() + `./public/images/uploads/${fileName}`;
      //const filePath = path.join(process.cwd(), `./public/images/${fileName}`);
      // const filePath = path.join(__dirname, `../../../../../../public/images/${fileName}`);
      //const filePath = path.join(process.cwd(), `./public/images/${fileName}`);
      const filePath = process.cwd() + `./public/images/${fileName}`;
      try {
        fs.writeFileSync(filePath, buffer);
      } catch (err) {
        fileName = '';
        // eslint-disable-next-line no-console
        console.error('Error writing file:', err);
        throw new Error(Messages.CannotUploadMedia);
      }
    }

    const port: Port = {
      _id: new Types.ObjectId(),
      portName: portFormData.get('portName') as string,
      destinationName: portFormData.get('destinationName') as string,
      imageFileName: `./${fileName}` || 'FortLauderdale.jpg'
    };
    await portService.addPortInDB(port);
    return { success: true, message: Messages.PortAddedSuccessfully };
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log('error: ', error);
    return { success: false, message: Messages.FailedAddPort };
  }
};

export const updatePort = async (
  user: User,
  portForm: PortForm & { _id: string }
): Promise<ActionResult> => {
  try {
    const port: Port = {
      _id: new Types.ObjectId(portForm._id),
      portName: portForm.portName,
      destinationName: portForm.destinationName,
      imageFileName: 'FortLauderdale.jpg'
    };
    await portService.updatePortInDB(port);
    return { success: true, message: Messages.PortUpdatedSuccessfully };
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log('error: ', error);
    return { success: false, message: Messages.FailedUpdatePort };
  }
};

export const deletePort = async (user: User, portId: string): Promise<ActionResult> => {
  try {
    await portService.softDeletePortFromDB(portId, user);
    return { success: true, message: Messages.PortDeletedSuccessfully };
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log('error: ', error);
    return { success: false, message: Messages.FailedDeletePort };
  }
};
