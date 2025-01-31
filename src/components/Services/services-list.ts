import { ServiceCardProps } from '@/components/Services/ServiceCard';

export const INCLUDED_SERVICES: ServiceCardProps[] = [
  {
    index: 1,
    title: 'Marine Cargo Insurance',
    description:
      'Cargo Insurance is always provided to cover the full value of your yacht in any event that would require it.',
    image: '/images/services/Insurance.jpg'
  },
  {
    index: 2,
    title: 'Taxi boats',
    description:
      'Taxi boats will be available to take yacht owners, crew and captains to and from the ship at each port.',
    image: '/images/services/TaxiBoatYachtTrasport.jpg'
  },
  {
    index: 3,
    title: 'Operational elements',
    description:
      'All operational elements such as loading, discharging, cradling, and other equipment are always included in your yacht transport booking contract with Allied Yacht Transport.',
    image: '/images/services/Operations1.jpg'
  },
  {
    index: 4,
    title: 'Customs clearance at the origin port',
    description:
      'No matter what country your yacht is being transported from, it is necessary to declare the export. Our agents in each port fully handle this process for you.',
    image: '/images/services/Paperwork1.jpg'
  },
  {
    index: 5,
    title: 'Customs clearance at the discharge port',
    description:
      'This process is done by our highly experienced agents at every destination which our ships call. This makes your yacht transport experience worry-free. Once your yacht is discharged, you are ready to start cruising.',
    image: '/images/services/Paperwork1.jpg'
  }
];

export const OPTIONAL_SERVICES: ServiceCardProps[] = [
  {
    index: 1,
    title: 'Bait Freezer',
    description:
      'Allied Yacht Transport is the first yacht transport company to provide bait freezers on every sailing that customers can use to store their frozen bait in. This alleviates the hassle and liability of carrying the bait in the yacht’s freezers. The bait is delivered to the port and is then stored in Allied Yacht Transport’s reefers at temperatures as low as -20 degrees Fahrenheit.',
    image: '/images/services/Baitfreezer.jpg'
  },
  {
    index: 2,
    title: 'Power',
    description:
      'Allied Yacht Transport provides boat plugs to yachts that want to have their battery chargers running during the trip. The power specifications are: 220 Volts x 50 Hertz x 15 Amps',
    image: '/images/services/Power2.jpg'
  }
];
/*
<Grid item className={classes.routeWihImageBox} >
      <img
        className={classes.cardImg}
        src={'/assets/images/Insurance.jpg'}
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
            <p>1. Marine Cargo Insurance</p>
          </div>
        </Grid>
        <Grid container style={{ marginTop: 20, marginBottom: 20 }}>
          <table>
            <tbody>
              <tr>
              Cargo Insurance is always provided to cover the
                full value of your yacht in any event that would require it.               </tr>
            </tbody>
          </table>
        </Grid>
        </div>
    </Grid>
    <br/>
    <Grid item className={classes.routeWihImageBox} >
      <img
        className={classes.cardImg}
        src={'/assets/images/TaxiBoatYachtTrasport.jpg'}
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
            <p>2. Taxi boats</p>
          </div>
        </Grid>
        <Grid container style={{ marginTop: 20, marginBottom: 20 }}>
          <table>
            <tbody>
              <tr>
              Taxi boats will be available to take yacht owners,
              crew and captains to and from the ship at each port.               </tr>
            </tbody>
          </table>
        </Grid>
</div>
    </Grid>
    <br/>
    <Grid item className={classes.routeWihImageBox} >
      <img
        className={classes.cardImg}
        src={'/assets/images/Operations1.jpg'}
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
            <p>3. Operational elements</p>
          </div>
        </Grid>
        <Grid container style={{ marginTop: 20, marginBottom: 20 }}>
          <table>
            <tbody>
              <tr>
              All operational elements such as loading,
              discharging, cradling, and other equipment are always included in your yacht transport booking contract with
             Allied Yacht Transport.              </tr>
            </tbody>
          </table>
        </Grid>
      </div>
    </Grid>
    <br/>
    <Grid item className={classes.routeWihImageBox} >
      <img
        className={classes.cardImg}
        src={'/assets/images/Paperwork1.jpg'}
        alt={'logo'}
        height='400'
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
            <p>4. Customs clearance at the origin port</p>
          </div>
        </Grid>
        <Grid container style={{ marginTop: 20, marginBottom: 20 }}>
          <table>
            <tbody>
              <tr>
              No matter what country your yacht is being transported from, it is necessary to declare the export. Our agents in each port fully handle this process for you.
              </tr>
              <br/>
              <br/>
              <br/>
              <br/>
              <tr>          <div className={classes.cardTitle}>
            <p>5. Customs clearance at the discharge port</p>
          </div>
          </tr>
          <br/>
          <tr>
          This process is done by our highly experienced agents at every
                destination which our ships call. This makes your yacht transport experience worry-free.
                Once your yacht is discharged, you are ready to start cruising.
          </tr>
            </tbody>
          </table>
        </Grid>
        </div>
    </Grid>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
            <SectionTitle>Optional Services</SectionTitle>
            <br/>
            <br/>
            <Grid item className={classes.routeWihImageBox} >
      <img
        className={classes.cardImg}
        src={'/assets/images/Baitfreezer.jpg'}
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
            <p>1. Bait Freezer</p>
          </div>
        </Grid>
        <Grid container style={{ marginTop: 20, marginBottom: 20 }}>
          <table>
            <tbody>
              <tr>
             Allied Yacht Transport is the first yacht transport company to provide bait freezers on every
                sailing that customers can use to store their frozen bait in. This alleviates the hassle and liability of carrying the
                bait in the yacht’s freezers. The bait is delivered to the port and is then stored inAllied Yacht Transport’s reefers
                at temperatures as low as -20 degrees Fahrenheit.        </tr>
            </tbody>
          </table>
        </Grid>
      </div>
    </Grid>
    <br/>
    <Grid item className={classes.routeWihImageBox} >
      <img
        className={classes.cardImg}
        src={'/assets/images/Power2.jpg'}
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
            <p>2. Power</p>
          </div>
        </Grid>
        <Grid container style={{ marginTop: 20, marginBottom: 20 }}>
          <table>
            <tbody>
              <tr>
             Allied Yacht Transport provides boat
                plugs to yachts that want to have their battery chargers running during the trip.
                The power specifications are: 220 Volts x 50 Hertz x 15 Amps   </tr>
            </tbody>
          </table>
        </Grid>
      </div>
    </Grid>
 */
