import { DESTINATIONS } from './destinations';
import NotFound from '@/components/NotFound/NotFound';
import React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import {
  clippedTitleSx,
  destinationNameSx,
  fullImageSX,
  fullImageSx,
  rowSx,
  sectionImageSx,
  sectionTextStyle,
  sectionTitleStyle,
  sidePaddingSx,
  subheaderContentSx,
  subheaderSx
} from '@/components/Destination/destination-style';

export interface DestinationProps {
  destinationId?: string;
}

const Destination = ({ destinationId }: DestinationProps) => {
  const getDestinationImageSourceByName = (imageName: string) => {
    return `/images/destinations/${imageName}`;
  };

  const destination = destinationId
    ? DESTINATIONS.find((destination) => destination._id === destinationId)
    : null;
  if (!destination) {
    return <NotFound />;
  }

  return (
    <div>
      <Box
        sx={{
          ...subheaderSx,
          backgroundImage: {
            xs: `url(${getDestinationImageSourceByName(destination.headerImageNameSm)})`,
            md: `url(${getDestinationImageSourceByName(destination.headerImageName)})`
          }
        }}
      >
        <Box sx={subheaderContentSx}>
          <Typography sx={destinationNameSx}>{destination.name}</Typography>
          <Box sx={clippedTitleSx}>
            <p style={{ margin: 0, lineHeight: 'inherit' }}>{destination.description}</p>
          </Box>
        </Box>
      </Box>
      <Box sx={sidePaddingSx}>
        <Box sx={fullImageSx}>
          <picture>
            <source
              media="(max-width: 600px)"
              srcSet={getDestinationImageSourceByName(destination.mapImageNameSm)}
            />
            <img
              src={getDestinationImageSourceByName(destination.mapImageName)}
              alt="desination-map-image"
            />
          </picture>
        </Box>
        <div style={{ display: 'flex', flexDirection: 'column', flexBasis: '100%' }}>
          <Box sx={rowSx}>
            <Box
              sx={{
                flexBasis: { xs: '100%', sm: '100%', md: '40%' },
                marginRight: { sm: '0px', md: '15px' }
              }}
            >
              <div style={sectionTitleStyle}>{destination.firstSectionTitle}</div>
              {destination?.firstSectionText && (
                <Box sx={sectionTextStyle}>{destination.firstSectionText}</Box>
              )}
            </Box>
            <Box
              sx={{
                flexBasis: { xs: '100%', sm: '100%', md: '60%' },
                ...sectionTitleStyle,
                ...sectionImageSx
              }}
            >
              <picture>
                <img
                  src={getDestinationImageSourceByName(destination.firstSectionImageName)}
                  alt="destination image"
                />
              </picture>
            </Box>
          </Box>
          <Box sx={rowSx}>
            <Box
              sx={{
                flexBasis: { xs: '100%', sm: '100%', md: '60%' },
                ...sectionImageSx
              }}
            >
              <picture>
                <img
                  src={getDestinationImageSourceByName(destination.secondSectionImageName)}
                  alt="destination image"
                />
              </picture>
            </Box>
            <Box
              sx={{
                flexBasis: { xs: '100%', sm: '100%', md: '40%' },
                marginLeft: { sm: '0px', md: '15px' },
                ...sectionImageSx
              }}
            >
              <div style={sectionTitleStyle}>{destination.secondSectionTitle}</div>
              {destination?.sectionText && (
                <Box sx={sectionTextStyle}>{destination.sectionText}</Box>
              )}
            </Box>
          </Box>
        </div>
        <Box sx={fullImageSX}>
          <picture>
            <img src={getDestinationImageSourceByName(destination.lastImageName)} alt="Port" />
          </picture>
        </Box>
      </Box>
    </div>
  );
};

export default Destination;
