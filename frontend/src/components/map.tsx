// import zIndex from '@material-ui/core/styles/zIndex';
import { mapStyles } from '@/styles/map-styles';
import { Button, Drawer } from '@material-ui/core';
import { GoogleMap, LoadScript, Marker, Polygon } from '@react-google-maps/api';
import React, { useState } from 'react';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import BlockRoundedIcon from '@material-ui/icons/BlockRounded';
import KeyboardBackspaceRoundedIcon from '@material-ui/icons/KeyboardBackspaceRounded';

// import mapStyles from './mapUtils/mapStyles';
// 地図のデザインを指定することができます。
// デザインは https://snazzymaps.com からインポートすることができます。

const center = {
  lat: 37.94181358543269,
  lng: 139.10948906051917,
};

// const divStyle = {
//   background: 'white',
//   fontSize: 7.5,
// };

const places = [
  {
    id: 1,
    lat: 37.94181358543269,
    lng: 139.10948906051917,
    name: 'テスト1',
  },
  {
    id: 2,
    lat: 37.94181358543269,
    lng: 139.10908906051917,
    name: 'テスト2',
  },
];

const Map = () => {
  const [roomEditTargetRoomId, setRoomEditTargetRoomId] = useState<number | undefined>();
  const [roomSelectTargetPlaceId, setRoomSelectTargetPlaceId] = useState<number | undefined>();
  // const [infoWindowPixelOffset, setInfoWindowPixelOffset] = useState<undefined | google.maps.Size>(undefined);

  return (
    <>
      <LoadScript
        googleMapsApiKey="AIzaSyD44R5U7ckGYHVBK-iDrgvlKL7Kr7lIspQ"
        // onLoad={() => {
        //   setInfoWindowPixelOffset(new window.google.maps.Size(0, -45));
        // }}
      >
        <GoogleMap
          mapContainerStyle={{
            width: '100%',
            height: '100%',
          }}
          options={{
            styles: mapStyles as any,
            disableDefaultUI: true,
            clickableIcons: false,
          }}
          center={center}
          zoom={18}
          onClick={(e) => {
            console.log(e);
          }}
        >
          {places.map((place) => {
            return (
              <Marker
                key={'m:' + place.id}
                position={{
                  lat: place.lat,
                  lng: place.lng,
                }}
                // icon={{
                //   fillColor: '#FF0000', //塗り潰し色
                //   fillOpacity: 0.8, //塗り潰し透過率
                //   path: google.maps.SymbolPath.CIRCLE, //円を指定
                //   scale: 16, //円のサイズ
                //   strokeColor: '#FF0000', //枠の色
                //   strokeWeight: 1.0, //枠の透過率
                // }}
                draggable={true}
                onClick={() => {
                  setRoomSelectTargetPlaceId(place.id);
                }}
                // label={{ text: 'A', color: 'white' }}
              />
            );
          })}

          {/* <InfoWindow
                  key={'i:' + place.id}
                  position={{
                    lat: place.lat,
                    lng: place.lng,
                  }}
                  options={{ pixelOffset: infoWindowPixelOffset }}
                >
                  <div style={divStyle}>
                    <h1>秋葉原オフィス</h1>
                  </div>
                </InfoWindow> */}

          <Polygon
            editable={true} // ポイント移動を許可
            draggable={true} // エッジ追加を許可
            options={{
              fillOpacity: 0, // 塗りつぶし無し
              geodesic: false,
              clickable: false, // 全体のクリック禁止
              strokeColor: 'blue',
            }}
            onClick={(e) => {
              console.log(e);
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
        </GoogleMap>
      </LoadScript>

      {/* 部屋選択 */}
      <Drawer
        anchor="bottom"
        open={roomSelectTargetPlaceId != null && roomEditTargetRoomId == null}
        onClose={() => setRoomSelectTargetPlaceId(undefined)}
      >
        <div>部屋選択</div>
        <div
          style={{
            display: 'grid',
            gridTemplateRows: 'repeat(3,50)',
            gridTemplateColumns: 'repeat(15,1fr)',
            gap: 5,
            margin: 5,
          }}
        >
          <Button
            variant="contained"
            style={{
              gridColumn: 1,
              gridRow: 3,
              minWidth: 0,
            }}
          >
            101
          </Button>
          <Button
            variant="contained"
            style={{
              gridColumn: 2,
              gridRow: 3,
              minWidth: 0,
            }}
          >
            101
          </Button>
          <Button
            variant="contained"
            style={{
              gridColumn: 2,
              gridRow: 2,
              minWidth: 0,
            }}
          >
            202
          </Button>
          <Button
            variant="contained"
            style={{
              gridColumn: 3,
              gridRow: 2,
              minWidth: 0,
            }}
          >
            203
          </Button>
          <Button
            variant="contained"
            style={{
              gridColumn: 4,
              gridRow: 2,
              minWidth: 0,
            }}
          >
            204
          </Button>
          <Button
            variant="contained"
            style={{
              gridColumn: 15,
              gridRow: 1,
              minWidth: 0,
            }}
            onClick={() => {
              setRoomEditTargetRoomId(1);
            }}
          >
            3015
          </Button>
        </div>
      </Drawer>

      <Drawer
        anchor="bottom"
        open={roomEditTargetRoomId != null}
        onClose={() => {
          setRoomSelectTargetPlaceId(undefined);
          setRoomEditTargetRoomId(undefined);
        }}
      >
        <div>操作</div>

        <Button variant="contained" startIcon={<DoneRoundedIcon />}>
          完了
        </Button>
        <Button variant="contained" startIcon={<BlockRoundedIcon />}>
          拒否
        </Button>
        <Button variant="contained">不在</Button>

        <Button
          variant="contained"
          startIcon={<KeyboardBackspaceRoundedIcon />}
          onClick={() => {
            setRoomEditTargetRoomId(undefined);
          }}
        >
          部屋一覧
        </Button>
      </Drawer>
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
