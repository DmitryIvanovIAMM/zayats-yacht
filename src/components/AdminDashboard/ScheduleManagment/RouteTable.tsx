import { ShipStopWithPortFrontend } from '@/models/ShipStopFrontend';
import { formatInLongMonthDayYear } from '@/utils/date-time';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const cellStyle = {
  padding: '5px 10px'
};
const headerCellStyle = {
  ...cellStyle,
  fontWeight: 'bold'
};
export interface RouteTableProps {
  shipStops: ShipStopWithPortFrontend[];
}
const oddRowsGrayColor = {
  '&:nth-of-type(odd)': {
    backgroundColor: 'action.hover'
  }
};

export const RouteTable = ({ shipStops = [] }: RouteTableProps) => {
  return (
    <Table style={{ width: '100%' }}>
      <TableHead>
        <TableRow sx={{ borderTop: '1px solid rgba(224, 224, 224, 1)', background: '#ecf9f2' }}>
          <TableCell style={headerCellStyle}>Arrival</TableCell>
          <TableCell style={headerCellStyle}>Departure</TableCell>
          <TableCell style={headerCellStyle}>Port</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <>
          {shipStops.map((shipStop, index) => (
            <TableRow key={index} sx={oddRowsGrayColor}>
              <TableCell style={{ ...cellStyle, width: '30%' }}>
                {formatInLongMonthDayYear(shipStop.arrivalOn)}
              </TableCell>
              <TableCell style={{ ...cellStyle, width: '30%' }}>
                {formatInLongMonthDayYear(shipStop.departureOn)}
              </TableCell>
              <TableCell style={{ ...cellStyle, width: '40%' }}>{shipStop.port.portName}</TableCell>
            </TableRow>
          ))}
        </>
      </TableBody>
    </Table>
  );
};
