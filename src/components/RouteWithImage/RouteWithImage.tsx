import React, { FC, useMemo } from 'react';
import Link from 'next/link';
import { Grid, Theme } from '@mui/system';
import Typography from '@mui/material/Typography';
//import Link from 'next/link';
import Button from '@mui/material/Button';
import { PATHS } from '@/app/helpers/paths';
//import { calculateDaysInTransit, calculateMilesForRoute } from '@/utils/routeCalculators';
import { getInternationalDateFormat } from '@/utils/date-time';
import { lightGrayColor, useRouteStyles } from '@/components/RouteWithImage/RouteWithImage.style';
import { ShipStop } from '@/models/ShipStop';
import { Port } from '@/models/Port';
import { calculateDaysInTransit, calculateMilesForRoute } from '@/utils/routeCalculators';
import { Hidden } from '@mui/material';

/*interface Route {
  departurePort: {
    _id: string;
    portName: string;
    imageFileName: string;
  };
  sailing: {
    name: string;
  };
  arrivalOn: string;
}*/

export interface SelectedRoute {
  fromWhere: string;
  toWhere: string;
  when: Date | string;
}

interface RouteWithImageBoxProps {
  route: ShipStop[];
  onShareRoute: (route: ShipStop[]) => void;
  onUserGetRouteSelect: (selectedRoute: SelectedRoute) => void;
}

const RouteWithImage: FC<RouteWithImageBoxProps> = ({ route, onUserGetRouteSelect }) => {
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

  const classes = useRouteStyles();

  const loadingDateFormatted = useMemo(() => {
    const date = new Date(route[0].arrivalOn);
    return getInternationalDateFormat(date);
  }, [route]);

  const arrivalDateFormatted = useMemo(() => {
    const date = new Date(route[route.length - 1].arrivalOn);
    return getInternationalDateFormat(date);
  }, [route]);

  return (
    <Grid className={classes.routeWihImageBox} data-cy="schedule-route-card">
      <img
        className={classes.cardImg}
        src={`/assets/images/${(route[route.length - 1].departurePort as Port).imageFileName}`}
        alt={'logo'}
        height="263"
      />
      <div
        style={{
          minHeight: '194px',
          width: '100%',
          padding: `0 16px 16px`,
          flexGrow: 1
        }}
      >
        <Grid
          container
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'inherit'
          }}
        >
          <div className={classes.cardTitle}>
            <p>{route[route.length - 1].sailing?.name || ''}</p>
          </div>
        </Grid>
        <Grid container style={{ marginTop: 20, marginBottom: 20 }}>
          <table>
            <tbody>
              <tr>
                <th style={{ verticalAlign: 'top', textAlign: 'start' }}>
                  <Typography className={classes.title}>Loading Port</Typography>
                </th>
                <th style={{ verticalAlign: 'top', textAlign: 'left' }}>
                  {/*<Link
                    className={classes.destinationPortName}
                    component={NavLink}
                    to={`destination/${route[0].departurePort._id}`}
                  >
                    {route[0].departurePort.portName}
                  </Link>*/}
                </th>
              </tr>
              <tr>
                <th style={{ verticalAlign: 'top', textAlign: 'start' }}>
                  <Typography className={classes.title}>Destination Port</Typography>
                </th>
                <th style={{ verticalAlign: 'top', textAlign: 'left' }}>
                  <Typography className={classes.destinationPortName} data-cy="destination-port">
                    {route[route.length - 1].departurePort?.portName || ''}
                  </Typography>
                </th>
              </tr>
              <tr>
                <th style={{ verticalAlign: 'top', textAlign: 'start' }}>
                  <Typography className={classes.title}>Loading Date</Typography>
                </th>
                <th style={{ verticalAlign: 'top', textAlign: 'left' }}>
                  <Typography className={classes.dateValue} data-cy="loading-date">
                    {loadingDateFormatted}
                  </Typography>
                </th>
              </tr>
              <tr>
                <th style={{ verticalAlign: 'top', textAlign: 'start' }}>
                  <Typography className={classes.title}>Arrival Date</Typography>
                </th>
                <th style={{ verticalAlign: 'top', textAlign: 'left' }}>
                  <Typography className={classes.dateValue} data-cy="arrival-date">
                    {arrivalDateFormatted}
                  </Typography>
                </th>
              </tr>
            </tbody>
          </table>
        </Grid>
        <hr
          style={{
            border: `0.5px solid ${lightGrayColor}`
          }}
        />
        <Grid container>
          <div style={{ whiteSpace: 'nowrap', display: 'table' }}>
            <Typography className={classes.footerTitle}>Miles &nbsp;&nbsp;</Typography>
            <Typography className={classes.footerValue}>
              {calculateMilesForRoute(route)}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Typography>
          </div>
          <div style={{ whiteSpace: 'nowrap', display: 'table' }}>
            <Typography className={classes.footerTitle}>transit time &nbsp;&nbsp;</Typography>
            <Typography className={classes.footerValue}>
              {calculateDaysInTransit(route)} days
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Typography>
          </div>
        </Grid>
        <Hidden smUp>
          <div className={classes.actionsSm}>
            <Button
              data-cy="get-quote-xs"
              className={classes.getQuoteButton}
              href={PATHS.quoteRequest}
            >
              <Typography className={classes.getQuoteTypography}>Get&nbsp;Quote</Typography>
            </Button>
          </div>
        </Hidden>
      </div>
      <Hidden xsDown>
        <Button
          data-cy="get-quote-smUp"
          size="small"
          className={classes.getQuoteButton}
          href={PATHS.quoteRequest}
        >
          <Typography className={classes.getQuoteTypography}>Get&nbsp;Quote</Typography>
        </Button>
      </Hidden>
    </Grid>
  );
};

export default RouteWithImage;
