import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

export function useNetwork() {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [isInternetReachable, setIsInternetReachable] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected ?? false);
      setIsInternetReachable(state.isInternetReachable);
    });

    return () => unsubscribe();
  }, []);

  return {
    isOnline,
    isInternetReachable,
  };
}