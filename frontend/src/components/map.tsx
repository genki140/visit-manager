// import zIndex from '@material-ui/core/styles/zIndex';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

// const containerStyle = {
//   width: '100%',
//   height: '100%',
// };

const center = {
  lat: 35.69575,
  lng: 139.77521,
};

// import React, { useCallback, useRef } from 'react';
// import { GoogleMap, useLoadScript } from '@react-google-maps/api';

// // import mapStyles from "./mapUtils/mapStyles";
// // 地図のデザインを指定することができます。
// // デザインは https://snazzymaps.com からインポートすることができます。

// const libraries = ['places'];
// const mapContainerStyle = {
//   height: '60vh',
//   width: '100%',
// };
// // 地図の大きさを指定します。

// const options = {
//   // styles: mapStyles,
//   disableDefaultUI: true,
//   // デフォルトUI（衛星写真オプションなど）をキャンセルします。
//   zoomControl: true,
// };

const Map = () => {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyD44R5U7ckGYHVBK-iDrgvlKL7Kr7lIspQ"
      libraries={[]}
    >
      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: '100%',
        }}
        options={{
          disableDefaultUI: true,
        }}
        center={center}
        zoom={17}
      ></GoogleMap>
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
