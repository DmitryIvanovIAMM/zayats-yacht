import { ShipStopWithPortFrontend } from '@/models/ShipStopFrontend';
import { formatInMonthDayYear } from '@/utils/date-time';
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

export const RouteTable = ({ shipStops = [] }: RouteTableProps) => {
  return (
    <div style={{ width: '100%' }}>
      <Table style={{ width: '100%' }}>
        <TableHead>
          <TableRow>
            <TableCell style={headerCellStyle}>Arrival</TableCell>
            <TableCell style={headerCellStyle}>Departure</TableCell>
            <TableCell style={headerCellStyle}>Ports</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <>
            {shipStops.map((shipStop, index) => (
              <TableRow key={index}>
                <TableCell style={{ ...cellStyle, width: '30%' }}>
                  {formatInMonthDayYear(shipStop.arrivalOn)}
                </TableCell>
                <TableCell style={{ ...cellStyle, width: '30%' }}>
                  {formatInMonthDayYear(shipStop.departureOn)}
                </TableCell>
                <TableCell style={{ ...cellStyle, width: '40%' }}>
                  {shipStop.port.portName}
                </TableCell>
              </TableRow>
            ))}
          </>
        </TableBody>
      </Table>
    </div>
  );
};
