import { Port } from '@/models/Port';

export function getDestinationsFormPorts(ports: Port[]) {
  const groupedGyDestinationPorts = getGroupedBy(ports, 'destinationName');

  return groupedGyDestinationPorts.map((group) => {
    const ports = group.map((port: Port) => {
      return { _id: port.id, portName: port.portName };
    });

    return {
      destinationName: group[0].destinationName,
      ports: ports
    };
  });
}

export const getGroupedBy = (ports: Port[], key: string): any[] => {
  const groups = {};
  const result = [];

  ports.forEach((port: Port) => {
    if (!(port[key] in groups)) {
      groups[port[key]] = [];
      result.push(groups[port[key]]);
    }
    groups[port[key]].push(port);
  });

  return result;
};

type Serializable = string | number | bigint | boolean | null | undefined;
function groupBy<T extends Record<K, Serializable>, K extends keyof T>(data: T[], key: K) {
  return data.reduce<{ [P in `${T[K]}`]?: T[] }>((acc, item) => {
    const group: `${T[K]}` = `${item[key]}`;
    const arr: T[] = (acc[group] = acc[group] ?? []);
    arr.push(item);
    return acc;
  }, {});
}