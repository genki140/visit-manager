import { mapStyles } from '@/styles/map-styles';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import React, { forwardRef, ReactNode, useImperativeHandle, useState } from 'react';
import { actions, useAppDispatch } from '@/ducks/store';

// import mapStyles from './mapUtils/mapStyles';
// 地図のデザインを指定することができます。
// デザインは https://snazzymaps.com からインポートすることができます。
const center = {
  lat: 37.94181358543269,
  lng: 139.10948906051917,
};

export type MapOutput = {
  getInfo: () => {
    zoom: number;
    center: {
      latitude: number;
      longitude: number;
    };
  };
};

const Map = forwardRef<
  MapOutput,
  {
    children: ReactNode;
  }
>((props, ref) => {
  const dispatch = useAppDispatch();
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);

  useImperativeHandle(ref, () => ({
    getInfo: () => ({
      center: {
        latitude: mapRef?.getCenter()?.toJSON().lat as number,
        longitude: mapRef?.getCenter()?.toJSON().lng as number,
      },
      zoom: mapRef?.getZoom() as number,
    }),
  }));

  return (
    <>
      <LoadScript
        googleMapsApiKey="AIzaSyD44R5U7ckGYHVBK-iDrgvlKL7Kr7lIspQ"
        onLoad={() => {
          console.log('onLoad');
          dispatch(actions.setMapLoaded());
        }}
      >
        <GoogleMap
          onLoad={(map) => setMapRef(map)}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            styles: mapStyles as any,
            disableDefaultUI: true,
            clickableIcons: false,
          }}
          center={center}
          zoom={18}
        >
          {props.children}
        </GoogleMap>
      </LoadScript>
    </>
  );
});

export default Map;
