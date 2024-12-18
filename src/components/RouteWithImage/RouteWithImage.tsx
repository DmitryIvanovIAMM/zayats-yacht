import React, { FC, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Grid } from '@mui/system';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { PATHS } from '@/app/helpers/paths';
import { getInternationalDateFormat } from '@/utils/date-time';
import {
  actionsSmSx,
  cardImgSx,
  cardTitleSx,
  dateValueStyle,
  destinationPortNameStyle,
  footerTitleStyle,
  footerValueStyle,
  getQuoteButtonSx,
  getQuoteTypographySx,
  lightGrayColor,
  routeWihImageBoxSx,
  titleStyle
} from '@/components/RouteWithImage/RouteWithImage.style';
import { ShipStop } from '@/models/ShipStop';
import { Port } from '@/models/Port';
import { calculateDaysInTransit, calculateMilesForRoute } from '@/utils/routeCalculators';
import { Box } from '@mui/material';

export interface SelectedRoute {
  fromWhere: string;
  toWhere: string;
  when: Date | string;
}

export interface RouteWithImageBoxProps {
  route: ShipStop[];
  onShareRoute: (route: ShipStop[]) => void;
  onUserGetRouteSelect: (selectedRoute: SelectedRoute) => void;
}

const RouteWithImage: FC<RouteWithImageBoxProps> = ({ route, onUserGetRouteSelect }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleUserGetRouteSelect = () => {
    const departurePortName = route[0].departurePort?.portName || '';
    const destinationPortName = route[route.length - 1].departurePort?.portName || '';
    const loadingDate = getInternationalDateFormat(route[0].arrivalOn);
    const data = {
      fromWhere: departurePortName,
      toWhere: destinationPortName,
      when: loadingDate
    };
    onUserGetRouteSelect(data);
  };

  const loadingDateFormatted = useMemo(() => {
    const date = new Date(route[0].arrivalOn);
    return getInternationalDateFormat(date);
  }, [route]);

  const arrivalDateFormatted = useMemo(() => {
    const date = new Date(route[route.length - 1].arrivalOn);
    return getInternationalDateFormat(date);
  }, [route]);

  return (
    <Box
      sx={{ ...routeWihImageBoxSx, marginRight: '10px', marginLeft: '10px' }}
      data-cy="schedule-route-card"
    >
      <Box sx={{ ...cardImgSx, height: '263px' }}>
        <Image
          src={`/images/${(route[route.length - 1].departurePort as Port).imageFileName}`}
          alt={'logo'}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: '263px' }} // optional
        />
      </Box>
      <div
        style={{
          minHeight: '194px',
          width: '100%',
          padding: `0px 16px 16px 16px`,
          flexGrow: 1,
          margin: 'auto',
          marginTop: 0
        }}
      >
        <Box
          sx={{
            ...cardTitleSx,
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'inherit'
          }}
        >
          <p>{route[route.length - 1].sailing?.name || ''}</p>
        </Box>
        <div style={{ marginTop: 20, marginBottom: 20 }}>
          <table>
            <tbody>
              <tr>
                <th style={{ verticalAlign: 'top', textAlign: 'start', paddingRight: '10px' }}>
                  <Typography style={titleStyle}>Loading Port</Typography>
                </th>
                <th style={{ verticalAlign: 'top', textAlign: 'left' }}>
                  <Link
                    style={destinationPortNameStyle}
                    href={`destination/${route[0].departurePort?._id}`}
                  >
                    {route[0].departurePort?.portName}
                  </Link>
                </th>
              </tr>
              <tr>
                <th style={{ verticalAlign: 'top', textAlign: 'start', paddingRight: '10px' }}>
                  <Typography style={titleStyle}>Destination Port</Typography>
                </th>
                <th style={{ verticalAlign: 'top', textAlign: 'left' }}>
                  <Typography style={destinationPortNameStyle} data-cy="destination-port">
                    {route[route.length - 1].departurePort?.portName || ''}
                  </Typography>
                </th>
              </tr>
              <tr>
                <th style={{ verticalAlign: 'top', textAlign: 'start', paddingRight: '10px' }}>
                  <Typography style={titleStyle}>Loading Date</Typography>
                </th>
                <th style={{ verticalAlign: 'top', textAlign: 'left' }}>
                  <Typography style={dateValueStyle} data-cy="loading-date">
                    {loadingDateFormatted}
                  </Typography>
                </th>
              </tr>
              <tr>
                <th style={{ verticalAlign: 'top', textAlign: 'start', paddingRight: '10px' }}>
                  <Typography style={titleStyle}>Arrival Date</Typography>
                </th>
                <th style={{ verticalAlign: 'top', textAlign: 'left' }}>
                  <Typography style={dateValueStyle} data-cy="arrival-date">
                    {arrivalDateFormatted}
                  </Typography>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
        <hr
          style={{
            border: `0.5px solid ${lightGrayColor}`
          }}
        />
        <div>
          <div style={{ whiteSpace: 'nowrap', display: 'table' }}>
            <Typography style={footerTitleStyle}>MILES &nbsp;&nbsp;</Typography>
            <Typography style={footerValueStyle}>
              {calculateMilesForRoute(route)}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Typography>
          </div>
          <div style={{ whiteSpace: 'nowrap', display: 'table' }}>
            <Typography style={footerTitleStyle}>TRANSIT TIME &nbsp;&nbsp;</Typography>
            <Typography style={footerValueStyle}>
              {calculateDaysInTransit(route)} days
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Typography>
          </div>
        </div>
        <Box sx={actionsSmSx}>
          <Button data-testid="get-quote-xs" sx={getQuoteButtonSx} href={PATHS.quoteRequest}>
            <Typography sx={getQuoteTypographySx}>Get&nbsp;Quote</Typography>
          </Button>
        </Box>
      </div>
      <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
        <Button
          data-testid="get-quote-smUp"
          size="small"
          sx={getQuoteButtonSx}
          href={PATHS.quoteRequest}
        >
          <Typography sx={getQuoteTypographySx}>Get&nbsp;Quote</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default RouteWithImage;
