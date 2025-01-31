import React from 'react';
import {
  cardImgSx,
  cardTitleSx,
  lightGrayColor,
  mainInfoStyle,
  routeWihImageBoxSx
} from '@/components/RouteWithImage/RouteWithImage.style';
import { Box } from '@mui/material';
import Image from 'next/image';

export interface ServiceCardProps {
  index: number;
  title: string;
  description: string;
  image: string;
}

const ServiceCard = ({ title, description, image, index }: ServiceCardProps) => {
  return (
    <Box sx={routeWihImageBoxSx} data-cy="schedule-route-card">
      <Box sx={cardImgSx}>
        <Image
          src={image}
          alt={'logo'}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: '263px' }} // optional
        />
      </Box>
      <div style={mainInfoStyle}>
        <Box sx={cardTitleSx}>
          <p>{`${index}. ${title}`}</p>
        </Box>
        <div style={{ marginTop: 20, marginBottom: 20 }}>{description}</div>
        <hr
          style={{
            border: `0.5px solid ${lightGrayColor}`
          }}
        />
      </div>
    </Box>
  );
};

export default ServiceCard;
