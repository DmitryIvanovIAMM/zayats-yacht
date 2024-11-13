import Port from '../models/Port';

export default class PortService {

  public getAllPorts = () => {
    return Port.find({});
  };

}
