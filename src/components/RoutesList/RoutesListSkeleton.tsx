import * as React from 'react';
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
