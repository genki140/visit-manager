import { LoadScript } from '@react-google-maps/api';
import getConfig from 'next/config';
import React, { useState } from 'react';

// next.config.jsで設定した値を取得する
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

export const GoogleMapProvider = (props: { children: any }) => {
  const [mapApiLoaded, setMapApiLoaded] = useState(false);

  return (
    <>
      <LoadScript googleMapsApiKey={publicRuntimeConfig.GOOGLE_MAP_API_KEY ?? ''} onLoad={() => setMapApiLoaded(true)}>
        {mapApiLoaded && props.children()}
      </LoadScript>
    </>
  );
};

export const getServerSideProps = () => {
  return {
    props: {
      GOOGLE_MAP_API_KEY: publicRuntimeConfig.GOOGLE_MAP_API_KEY,
    },
  };
};
