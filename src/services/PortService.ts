import { PortModel } from '../models/Port';

export default class PortService {
  public getAllPorts = () => {
    return PortModel.find({});
  };
}
