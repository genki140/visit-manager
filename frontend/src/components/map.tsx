// import zIndex from '@material-ui/core/styles/zIndex';
import { mapStyles } from '@/styles/map-styles';
import { GoogleMap, LoadScript, Marker, Polygon } from '@react-google-maps/api';
import React, { ReactNode, useState } from 'react';
import { actions, useAppDispatch } from '@/ducks/store';

// import mapStyles from './mapUtils/mapStyles';
// 地図のデザインを指定することができます。
// デザインは https://snazzymaps.com からインポートすることができます。
const center = {
  lat: 37.94181358543269,
  lng: 139.10948906051917,
};

export type MapPosition = {
  latitude: number;
  longitude: number;
};

const Map = (props: {
  children: ReactNode;
  onCenterChanged?: (position: MapPosition) => void;
  onZoomChanged?: (zoom: number) => void;
}) => {
  // const dispatch = useAppDispatch();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapRef, setMapRef] = useState<any>(null);

  return (
    <>
      <LoadScript googleMapsApiKey="AIzaSyD44R5U7ckGYHVBK-iDrgvlKL7Kr7lIspQ" onLoad={() => setMapLoaded(true)}>
        {mapLoaded && (
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
            onClick={(e) => {
              // console.log(e);
            }}
            onIdle={() => {
              const center = mapRef?.getCenter()?.toJSON();
              if (center != null && props.onCenterChanged != null) {
                props.onCenterChanged({ latitude: center.lat, longitude: center.lng });
              }
            }}
            onCenterChanged={() => {
              const center = mapRef?.getCenter()?.toJSON();
              if (center != null && props.onCenterChanged != null) {
                props.onCenterChanged({ latitude: center.lat, longitude: center.lng });
              }
            }}
            onZoomChanged={() => {
              const zoom = mapRef?.getZoom();
              if (zoom != null && props.onZoomChanged != null) {
                props.onZoomChanged(zoom);
                // dispatch(actions.setMapZoom({ zoom: zoom }));
              }
            }}
          >
            {props.children}
          </GoogleMap>
        )}
      </LoadScript>
    </>
  );
};

export default Map;

// export default function GoogleMapComponent() {
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: 'AIzaSyD44R5U7ckGYHVBK-iDrgvlKL7Kr7lIspQ', // process.env.REACT_APP_googleMapsApiKey,
//     // ここにAPIキーを入力します。今回は.envに保存しています。
//     libraries: Libraries,
//   });

//   const mapRef = useRef();
//   const onMapLoad = useCallback((map) => {
//     mapRef.current = map;
//   }, []);
//   //API読み込み後に再レンダーを引き起こさないため、useStateを使わず、useRefとuseCallbackを使っています。

//   if (loadError) return 'Error';
//   if (!isLoaded) return 'Loading...';

//   return (
//     <GoogleMap
//       id="map"
//       mapContainerStyle={mapContainerStyle}
//       zoom={8} // デフォルトズーム倍率を指定します。
//       center={{
//         lat: 43.048225,
//         lng: 141.49701,
//       }} // 札幌周辺にデフォルトのセンターを指定しました。
//       options={options}
//       onLoad={onMapLoad}
//     ></GoogleMap>
//   );
// }

// // api key
// // AIzaSyD44R5U7ckGYHVBK-iDrgvlKL7Kr7lIspQ
