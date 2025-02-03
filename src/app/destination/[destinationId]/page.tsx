import React from 'react';
import Destination from '@/components/Destination/Destination';

export default async function DestinationPage({
  params
}: {
  params: Promise<{ destinationId: string }>;
}) {
  const awaitedParams = await params;
  return <Destination destinationId={awaitedParams?.destinationId ?? null} />;
}
