// import zIndex from '@material-ui/core/styles/zIndex';
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
  Polygon,
  Polyline,
  useJsApiLoader,
  useLoadScript,
} from '@react-google-maps/api';
import React, { useCallback, useRef, useState } from 'react';

// import mapStyles from './mapUtils/mapStyles';
// 地図のデザインを指定することができます。
// デザインは https://snazzymaps.com からインポートすることができます。

const center = {
  lat: 35.69575,
  lng: 139.77521,
};

const divStyle = {
  background: 'white',
  fontSize: 7.5,
};

const Map = () => {
  const [selected, setSelected] = useState<any>();

  return (
    <LoadScript googleMapsApiKey="AIzaSyD44R5U7ckGYHVBK-iDrgvlKL7Kr7lIspQ">
      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: '100%',
        }}
        options={{
          disableDefaultUI: true,
          clickableIcons: false,
        }}
        center={center}
        zoom={17}
        onClick={(e) => {
          console.log(e);
        }}
      >
        <Marker
          position={center}
          draggable={true}
          onMouseOver={() => {
            setSelected(1);
            // マウスオーバーで<InfoWindow>が描画されます。
          }}
        />

        <Polygon
          editable={true}
          options={{
            fillOpacity: 0,
            geodesic: false,
            clickable: false,
          }}
          path={[
            {
              lat: 35.69575,
              lng: 139.77521,
            },
            {
              lat: 36.69575,
              lng: 138.77521,
            },
            {
              lat: 36.69575,
              lng: 139.77521,
            },
          ]}
        ></Polygon>

        <InfoWindow position={center}>
          <div style={divStyle}>
            <h1>秋葉原オフィス</h1>
          </div>
        </InfoWindow>
      </GoogleMap>
    </LoadScript>
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
