import { Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ContactUs from '@/components/ContactUs/ContactUs';
import SectionTitle from '@/components/SectionTitle/SectionTitle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { centeredSectionSx } from '@/components/AboutUs/AboutUs';

const rootSx = {
  color: 'secondary.dark',
  '& .MuiAccordionSummary-root': {
    backgroundColor: '#00000007'
  }
};
const faqSx = {
  display: 'flex',
  flexDirection: 'column',
  marginTop: { sx: '0px' }
};
const emphasizedTextStyle = {
  fontWeight: 'bold'
};
const sectionTextStyle = {
  fontWeight: 500,
  fontSize: `1.2em`,
  lineHeight: '150%',
  fontFamily: 'Montserrat',
  //color: '#777777'
  color: 'secondary.dark'
};

const secondaryDarkColorSx = {
  color: 'secondary.dark',
  fontSize: '0.9em',
  lineHeight: '150%',
  fontFamily: 'Montserrat',
  '& .MuiAccordionSummary-root': {
    backgroundColor: '#00000007'
  }
};
/*const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiAccordionSummary-root': {
      backgroundColor: '#00000007'
    }
  },
  quote: {
    position: 'relative',
    paddingLeft: '1em',
    borderLeft: `0.2em solid ${theme.palette.primary.main}`,
    fontSize: '16px',
    color: theme.palette.grey['600'],
    fontWeight: 100,
    margin: 0,
    padding: 0,
    border: 0,
    outline: 0,
    '&:before, &:after': {
      content: "'\\201C'",
      color: theme.palette.grey['600']
    }
  },
  sectionText: {
    fontWeight: 500,
    fontSize: `1.3em`,
    fontFamily: 'Montserrat',
    lineHeight: '183.5%',
    color: '#777777'
  },
  image: {
    width: '100%'
  },
  emphasizedText: {
    fontWeight: 'bold'
  },

  faq: {
    [theme.breakpoints.down('md')]: {
      marginTop: '-0px'
    }
  }
}));*/

export default async function Instructions() {
  return (
    <Box id="faq" sx={{ ...centeredSectionSx, color: 'secondary.dark' }}>
      <SectionTitle title="Yacht Transport Instructions" />
      <div style={sectionTextStyle}>
        <span style={emphasizedTextStyle}>Allied Yacht Transport</span> is pleased to provide our
        customers with the following instructions and information to ensure a successful transit
        facilitated by properly preparing vessels and their representatives to work with our
        experienced, professional team in support of safely loading, stowing, and transporting
        vessels aboard our ships.
        <br />
        <br />
        <br />
        <Accordion sx={secondaryDarkColorSx}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel2a-header"
          >
            <h4>INSURANCE</h4>
          </AccordionSummary>
          <AccordionDetails>
            <span style={emphasizedTextStyle}>Allied Yacht Transport</span> maintains marine cargo
            insurance coverages. In addition, owners of all vessels to be transported should
            maintain insurance coverage to cover their vessel before and after the shipment.
            <br />
            <br />
          </AccordionDetails>
        </Accordion>
        <Accordion sx={secondaryDarkColorSx}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel3a-header"
          >
            <h4>DOCUMENTATION, PASSPORTS & VISAS</h4>
          </AccordionSummary>
          <AccordionDetails>
            <span style={emphasizedTextStyle}>Allied Yacht Transport</span> will facilitate the
            timely customs filings, port passes, and other formalities required by law on your
            behalf at arrival ports for vessels and riders. The customs agency at the arrival port
            will arrange all necessary clearances.
            <br />
            <br />
            <span style={emphasizedTextStyle}>Allied Yacht Transport</span> will request
            documentation associated with the vessel to be transported. Customs procedures are to be
            strictly adhered to for each country of origin and destination.
            <br />
            <br />
            Customs paperwork must be timely filed with the authorizedAllied Yacht Transport
            representative upon request. Without proper clearances in place, vessels will not be
            able to load or unload, resulting in significant fines from the country of origin,
            demurrage, or potential arrest of the vessel by authorities.
            <br />
            <br />
            Citizens of countries other than the United States aboard anAllied Yacht Transport ship
            as a rider arriving in or passing through the United States are required to hold a valid
            B1/B2 Visa. Without a B1/B2 Visa, riders will not be allowed on anAllied Yacht Transport
            ship.
            <br />
            <br />
            Copies of valid Visas and current passports will be requested by an Allied Ocean
            Transport representative prior to approval.
            <br />
            <br />
            Upon loading, the original will be securely held by the Master on board Allied Ocean
            Transport for the duration of the voyage.
            <br />
            <br />
          </AccordionDetails>
        </Accordion>
        <Accordion sx={secondaryDarkColorSx}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel4a-header"
          >
            <h4>PRIOR TO TRANSPORT, SECURE THE VESSEL</h4>
          </AccordionSummary>
          <AccordionDetails>
            Any loose items on the vessel should be removed or properly stowed aboard the vessel
            prior to loading on an Allied Ocean Transport ship.
            <br />
            <br />
            All hatches should be closed and locked.
            <br />
            <br />
            Personal items and prohibited items should be removed and breakables should be stored.
            <br />
            <br />
          </AccordionDetails>
        </Accordion>
        <Accordion sx={secondaryDarkColorSx}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel5a-header"
          >
            <h4>VESSEL SPECIFICATIONS FOR CRIBBING</h4>
          </AccordionSummary>
          <AccordionDetails>
            For a vessel to be safely secured and stowed on anAllied Yacht Transport ship, all
            measurements provided must include any protrusions including but not limited to
            outriggers, bowsprits, transducers, etc.
            <br />
            <br />
          </AccordionDetails>
        </Accordion>
        <Accordion sx={secondaryDarkColorSx}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel6a-header"
          >
            <h4>PRE-VOYAGE DAMAGE DOCUMENTATION</h4>
          </AccordionSummary>
          <AccordionDetails>
            Prior to loading, vessel should be inspected for damage and pictures should be taken to
            document any pre-existing problems.
            <br />
            <br />
          </AccordionDetails>
        </Accordion>
        <Accordion sx={secondaryDarkColorSx}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel7a-header"
          >
            <h4>SHRINK WRAP FOR EXTRA PROTECTION</h4>
          </AccordionSummary>
          <AccordionDetails>
            Shrink wrapping the vessel is an option to protect the vessel from exposure to the
            elements during transport. Covering stainless steel and chrome fittings or the
            application of an insulator wax can also provide additional protection.
            <br />
            <br />
          </AccordionDetails>
        </Accordion>
        <Accordion sx={secondaryDarkColorSx}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel8a-header"
          >
            <h4>WEIGHT</h4>
          </AccordionSummary>
          <AccordionDetails>
            Weight of the vessel can sometimes require that quantities of fuel and water onboard the
            vessel be reduced as much as possible while maintaining enough onboard for getting to
            and from an Allied Yacht Transport ship.
            <br />
            <br />
            If the vessel to be loaded is of a significant weight, Allied Ocean Transport
            representatives will provide additional guidance.
            <br />
            <br />
            Flammable liquids such as fuel stowed in containers will not be allowed. Bilges should
            be empty and bilge pumps should be switched off. Sewage tanks should be empty and
            switched off.
            <br />
            <br />
          </AccordionDetails>
        </Accordion>
        <Accordion sx={secondaryDarkColorSx}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel9a-header"
          >
            <h4>VESSEL POWER AND WATER DURING TRANSPORT</h4>
          </AccordionSummary>
          <AccordionDetails>
            Prior to loading, everything on the vessel should be powered down with batteries
            unplugged and cables stored. If reserved in advance, 50 amp connections are available
            upon request for an additional charge and will be included in the shipping contract
            prior to execution.
            <br />
            <br />
            Plug-in connections and specifications will be provided. If arrangements have been made
            in advance,Allied Yacht Transport can also provide water connections. Standard 2" water
            connections are available on board and vessels are responsible for supplying their own
            hoses with multiple hoses sometimes required.
            <br />
            <br />
          </AccordionDetails>
        </Accordion>
        <Accordion sx={secondaryDarkColorSx}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel10a-header"
          >
            <h4>FOR SAILING VESSELS</h4>
          </AccordionSummary>
          <AccordionDetails>
            Sails should be removed or protected by covers prior to transport. All sailing vessels
            must meet height requirements.
            <br />
            <br />
          </AccordionDetails>
        </Accordion>
        <Accordion sx={secondaryDarkColorSx}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel11a-header"
          >
            <h4>STRICTLY PROHIBITED AND SUBJECT TO HEAVY FINES OR ARREST</h4>
          </AccordionSummary>
          <AccordionDetails>
            WhileAllied Yacht Transport representatives will never board a vessel, the following are
            strictly prohibited to be aboard a vessel during transport on anAllied Yacht Transport
            ship:
            <ul> 1. Firearms </ul>
            <ul> 2. Ammunitions </ul>
            <ul> 3. Illegal drugs </ul>
            <ul> 4. Perishable food </ul>
            <ul> 5. Plants </ul>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={secondaryDarkColorSx}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel12a-header"
          >
            <h4>POLLUTION</h4>
          </AccordionSummary>
          <AccordionDetails>
            All garbage and waste products including but not limited to oil or oil residues,
            garbage, plastics, and paint residues should be discarded prior to arrival to anAllied
            Yacht Transport ship for loading.
            <br />
            <br />
            Removal of waste from a vessel to the deck of anAllied Yacht Transport ship is strictly
            prohibited.
            <br />
            <br />
          </AccordionDetails>
        </Accordion>
        <Accordion sx={secondaryDarkColorSx}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel13a-header"
          >
            <h4>GENERAL</h4>
          </AccordionSummary>
          <AccordionDetails>
            <span style={emphasizedTextStyle}>Allied Yacht Transport</span> cannot accept deliveries
            for any vessel.
            <br />
            <br />
            When anAllied Yacht Transport ship is anchored offshore, limited launch service will be
            provided.
            <br />
            <br />
            Launch departure locations and times will be provided by authorized Allied Ocean
            Transport representatives.
            <br />
            <br />
            Customers should limit items carried. Customers should be prepared to utilize a rope
            ladder. Two (2) persons are recommended to be on board the vessel during loading and
            un­loading operations.
            <br />
            <br />
          </AccordionDetails>
        </Accordion>
        <Accordion sx={secondaryDarkColorSx}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel14a-header"
          >
            <h4>PREPARATION FOR LOADING</h4>
          </AccordionSummary>
          <AccordionDetails>
            Vessels should be equipped with: Four (4) 50 feet of lines with two (2) on each side,
            forward and aft. Four (4) fenders with two (2) on each side of vessel, forward and aft.
            A two+ (2) person crew.
            <br />
            <br />
          </AccordionDetails>
        </Accordion>
        <Accordion sx={secondaryDarkColorSx}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel15a-header"
          >
            <h4>VESSEL DELIVERY PROCESS</h4>
          </AccordionSummary>
          <AccordionDetails>
            <li>
              Radio check on VHF Channel 17 with theAllied Yacht Transport load master and await
              instruction.
            </li>
            <br />
            <li>
              Berthing alongside anAllied Yacht Transport ship is not permitted without prior
              authorization from theAllied Yacht Transport load master.
            </li>
            <br />
            <li>
              Upon reaching theAllied Yacht Transport ship, ensure fenders and lines are set and
              maintained at correct locations and heights.
            </li>
            <br />
            <li>
              Pay close attention to instructions from crew and theAllied Yacht Transport load
              master and be prepared for line handling.
            </li>
            <br />
            <li>
              Regulations in most ports strictly prohibit vessel representatives from boarding an
              Allied Ocean Trans­port ship.
            </li>
            <br />
            <li>
              Stay on board your vessel until the vessel is properly secured to theAllied Yacht
              Transport ship.
            </li>
            <br />
            <li>
              Switch off generators/main engines as soon as vessel is positioned and before divers
              are in the water. Ensure all vessel equipment and loose items are properly
              sea-fastened.
            </li>
            <br />
            <li>
              Unless instructed otherwise, board the tender provided byAllied Yacht Transport and
              proceed to the designated marina for ground transportation.
            </li>
            <br />
            <li>
              All riders aboard anAllied Yacht Transport ship must be on board one hour before
              scheduled departure.
            </li>
            <br />
            <li>
              If permitted, all visitors must leave theAllied Yacht Transport ship at least one hour
              before scheduled departure
            </li>
            <br />
            <br />
          </AccordionDetails>
        </Accordion>
        <Accordion sx={secondaryDarkColorSx}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel16a-header"
          >
            <h4>ARRIVAL AT PORT OF DISCHARGE</h4>
          </AccordionSummary>
          <AccordionDetails>
            Arrive at designated departure dock to boardAllied Yacht Transport provided tender to be
            transported to the ship.
            <br />
            <br />
            Upon arrival by tender to theAllied Yacht Transport ship, pay close attention to Allied
            Ocean Transport crew instructions.
            <br />
            <br />
          </AccordionDetails>
        </Accordion>
        <Accordion sx={secondaryDarkColorSx}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel17a-header"
          >
            <h4>TIPS FOR VESSEL TRANSPORT RIDERS</h4>
          </AccordionSummary>
          <AccordionDetails>
            <span style={emphasizedTextStyle}>Allied Yacht Transport</span> riders must attend the
            orientation meeting on board the vessel prior to departure in order to familiarize
            themselves with safety protocols, procedures and ask any further questions ofAllied
            Yacht Transport representatives and ship's crew before departure from port.
            <br />
            <br />
            Riders must be physically capable of boarding anAllied Yacht Transport ship from a
            tender and climb a rope ladder.
            <br />
            <br />
            After receiving instructions from anAllied Yacht Transport representatives or ship's
            crew member, riders can proceed to climb the ladder and board the ship.
            <br />
            <br />
            <span style={emphasizedTextStyle}>Allied Yacht Transport</span> does not accept any
            liability whatsoever for accidents associated with ladders utilized to board our ships.
            <br />
            <br />
          </AccordionDetails>
        </Accordion>
        <br />
        <br />
      </div>
      <ContactUs />
    </Box>
  );
}
