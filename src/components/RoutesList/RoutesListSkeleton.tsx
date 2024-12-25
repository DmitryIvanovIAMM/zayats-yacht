import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
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
  mainInfoStyle,
  routeWihImageBoxSx,
  titleStyle
} from '@/components/RouteWithImage/RouteWithImage.style';
import { Box } from '@mui/material';
import Image from 'next/image';
import { Port } from '@/models/Port';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { calculateDaysInTransit, calculateMilesForRoute } from '@/utils/routeCalculators';
import Button from '@mui/material/Button';
import { PATHS } from '@/app/helpers/paths';
import { RouteWithImageSkeleton } from '@/components/RouteWithImage/RouteWithImageSkeleton';

export interface RoutesListSkeletonProps {
  itemsNumber?: number;
}
export default function RoutesListSkeleton({ itemsNumber = 3 }: RoutesListSkeletonProps) {
  const SkeletonList = [];
  for (let index = 0; index < itemsNumber; index++) {
    SkeletonList.push(<RouteWithImageSkeleton key={`route-skeleton-${index}`} />);
  }

  return <>{SkeletonList}</>;
}
