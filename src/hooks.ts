import {useEffect, useState} from 'react';

import {
  AirplayConnectivityContext,
  ExternalPlaybackAvailabilityContext,
  onAirplayConnectivityChanged,
  onExternalPlaybackAvailabilityChanged,
} from './airplayModule';

export type UseExternalPlaybackAvailabilityOptions = {
  useCachedValue?: boolean;
};

export const useExternalPlaybackAvailability = (
  options?: UseExternalPlaybackAvailabilityOptions,
) => {
  const [isExternalPlaybackAvailable, setIsExternalPlaybackAvailable] =
    useState(false);

  useEffect(() => {
    if (options?.useCachedValue ?? false) return;

    const subscription = onExternalPlaybackAvailabilityChanged(
      setIsExternalPlaybackAvailable,
    );

    ExternalPlaybackAvailabilityContext?.fetchExternalPlaybackAvailability().then(
      setIsExternalPlaybackAvailable,
    );

    return subscription.remove.bind(subscription);
  }, [options?.useCachedValue ?? false]);

  return isExternalPlaybackAvailable;
};

export const useAirplayConnectivity = () => {
  const [isAirplayConnected, setIsAirplayConnected] = useState(false);

  useEffect(() => {
    const subscription = onAirplayConnectivityChanged(setIsAirplayConnected);

    AirplayConnectivityContext?.fetchAirplayConnectivity().then(
      setIsAirplayConnected,
    );

    return subscription.remove.bind(subscription);
  }, []);

  return isAirplayConnected;
};
