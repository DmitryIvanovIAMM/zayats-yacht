import Skeleton from 'react-loading-skeleton';
import React from 'react';

export default function RoutesSkeleton() {
  return <Skeleton count={3} containerClassName="flex-1" />;
}
