import { actions, MapEditType, useAppDispatch, useStoreState } from '@/ducks/store';
import { useGetUserAreaQuery, useUpdateResidenceMutation } from '@/types/graphql';
import { Marker, Polygon } from '@react-google-maps/api';
import { useRouter } from 'next/router';
import React from 'react';

// https://fonts.google.com/icons?selected=Material+Icons&icon.query=house
const HousePath = 'M19,9.3V4h-3v2.6L12,3L2,12h3v8h5v-6h4v6h5v-8h3L19,9.3z M10,10c0-1.1,0.9-2,2-2s2,0.9,2,2H10z';
const ApartmentPath =
  'M17,11V3H7v4H3v14h8v-4h2v4h8V11H17z M7,19H5v-2h2V19z M7,15H5v-2h2V15z M7,11H5V9h2V11z M11,15H9v-2h2V15z M11,11H9V9h2 V11z M11,7H9V5h2V7z M15,15h-2v-2h2V15z M15,11h-2V9h2V11z M15,7h-2V5h2V7z M19,19h-2v-2h2V19z M19,15h-2v-2h2V15z';

const MapData = () => {
  // local state
  // const [markerDragging, setMarkerDragging] = useState(false);

  // redux state

  const dispatch = useAppDispatch();
  const mapLoaded = useStoreState((x) => x.map.loaded);
  const selectedResidenceId = useStoreState((x) => x.map.selectedResidenceId);
  // const selectedPolygonId = useStoreState((x) => x.map.selectedPolygonId);
  const mapEditType = useStoreState((x) => x.map.editType);

  // router

  const router = useRouter();
  const organizationName = (router.query.organizationName ?? '').toString();
  // const organizationPath = '/' + organizationName;
  const areaName = (router.query.areaName ?? '').toString();
  // const areaPath = (organizationName === '' ? '' : '/' + organizationName) + (areaName === '' ? '' : '/' + areaName);
  // if (organizationName === '' || areaName === '') {
  //   return null;
  // }

  // queries

  const getUserAreaResult = useGetUserAreaQuery({ variables: { organizationId: organizationName, areaId: areaName } });
  const userArea = getUserAreaResult.data?.userAreas?.[0];

  // mutations

  const [updateResidence] = useUpdateResidenceMutation();

  // render

  // console.log(markerDragging);

  return userArea != null && mapLoaded ? (
    <>
      {userArea.area.residences.map((residence) => {
        const isSelected = selectedResidenceId === Number(residence.id);
        return (
          <Marker
            key={'residence:' + residence.id}
            position={{ lat: residence.latitude, lng: residence.longitude }}
            cursor={mapEditType === MapEditType.Residence ? 'grab' : 'pointer'}
            icon={{
              fillColor: isSelected ? '#0000FF' : '#8888FF', //塗り潰し色
              strokeColor: '#6666AA', //枠の色
              fillOpacity: 1.0,
              strokeOpacity: 1.0,
              strokeWeight: 1.0, //枠の透過率
              anchor: new window.google.maps.Point(12, 12),
              path: residence.residents.length > 2 ? ApartmentPath : HousePath,
              scale: 1.5,
            }}
            draggable={mapEditType === MapEditType.Residence}
            onClick={
              // mapEditType === MapEditType.Residence
              //   ? undefined :
              () => dispatch(actions.setSelectedResidenceId(Number(residence.id)))
            }
            onDragEnd={(e) => {
              updateResidence({
                variables: {
                  id: residence.id,
                  latitude: e.latLng.lat(),
                  longitude: e.latLng.lng(),
                },
                optimisticResponse: {
                  updateResidence: Object.assign({}, residence, {
                    __typename: 'Residence',
                    latitude: e.latLng.lat(),
                    longitude: e.latLng.lng(),
                  }),
                },
              });
            }}
          />
        );
      })}

      {userArea.area.polygons.map((polygon) => {
        // const isSelected = selectedPolygonId === Number(polygon.id);
        return (
          <Polygon
            key={'polygon:' + polygon.id}
            editable={true} // ポイント移動を許可
            draggable={true} // エッジ追加を許可
            options={{
              fillOpacity: 0, // 塗りつぶし無し
              geodesic: false,
              clickable: false, // 全体のクリック禁止
              strokeColor: 'blue',
            }}
          />
        );
      })}
    </>
  ) : null;
};
export default MapData;
