export function getDestinationsFormPorts(ports) {
  const groupedGyDestinationPorts = getGroupedBy(ports, 'destinationName');

  return groupedGyDestinationPorts.map(group => {
    const ports = group.map(port => {
      return { _id: port.id, portName: port.portName };
    });

    return {
      destinationName: group[0].destinationName,
      ports: ports
    };
  });
}

export function getGroupedBy(ports, key) {
  const groups = {},
    result = [];

  ports.forEach(port => {
    if (!(port[key] in groups)) {
      groups[port[key]] = [];
      result.push(groups[port[key]]);
    }
    groups[port[key]].push(port);
  });

  return result;
}
