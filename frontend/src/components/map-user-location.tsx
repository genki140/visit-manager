import { Marker } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';

/** 現在位置表示アイコン */
const HailPath =
  'M12 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm5-4h2v.4c-.1 2.2-.8 3.9-2.3 5.1-.5.4-1.1.7-1.7.9V22h-2v-6h-2v6H9V10.1c-.3.1-.5.2-.6.3-.9.7-1.39 1.6-1.4 3.1v.5H5v-.5c0-2 .71-3.59 2.11-4.79C8.21 7.81 10 7 12 7s2.68-.46 3.48-1.06C16.48 5.14 17 4 17 2.5V2zM4 16h3v6H4v-6z';

interface GeolocationPositionError {
  readonly code: number;
  readonly message: string;
  readonly PERMISSION_DENIED: number;
  readonly POSITION_UNAVAILABLE: number;
  readonly TIMEOUT: number;
}

export const usePosition = () => {
  const [position, setPosition] = useState<{ latitude: number; longitude: number } | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const onChange = (props: { coords: { latitude: number; longitude: number } }) => {
    // 本当はGeolocationPositionの型名を使いたいがビルドエラーになるので緯度経度のみ抜粋
    setPosition({
      latitude: props.coords.latitude,
      longitude: props.coords.longitude,
    });
  };
  const onError = (error: GeolocationPositionError) => {
    setError(error.message);
  };
  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError('Geolocation is not supported');
      return;
    }
    const watcher = geo.watchPosition(onChange, onError);
    return () => geo.clearWatch(watcher);
  }, []);
  return { data: position, error };
};

const MapUserLocation = () => {
  const position = usePosition();
  // render
  return position.data != null ? (
    <Marker
      position={{ lat: position.data.latitude, lng: position.data.longitude }}
      icon={{
        fillColor: 'orange',
        strokeColor: 'darkorange', //枠の色
        fillOpacity: 1.0,
        strokeWeight: 1.0,
        anchor: new window.google.maps.Point(12, 12),
        path: HailPath,
        scale: 1.5,
      }}
      clickable={false}
    />
  ) : null;
};
export default MapUserLocation;
