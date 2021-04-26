import { actions, MapEditType, useAppDispatch, useStoreState } from '@/ducks/store';
import { Polygon, Residence, useGetUserAreaQuery, useUpdateResidenceMutation } from '@/types/graphql';
import { useRouterParams } from '@/utils/use-router-params';
import { DrawingManager, Marker } from '@react-google-maps/api';
import React, { memo } from 'react';
import { MapOutline } from './map-outline';
import { MapResidence } from './map-residence';

const MapData = () => {
  // local state
  // const [markerDragging, setMarkerDragging] = useState(false);

  // redux state

  const dispatch = useAppDispatch();
  const selectedResidenceId = useStoreState((x) => x.map.selectedResidenceId);
  const mapEditType = useStoreState((x) => x.map.editType);

  // router
  const routerParams = useRouterParams();

  // queries
  const getUserAreaResult = useGetUserAreaQuery({
    variables: { organizationId: routerParams.organizationName, areaId: routerParams.areaName },
    skip: !routerParams.hasOrganizationAndArea,
  });
  const userArea = getUserAreaResult.data?.userAreas?.[0];

  // render
  return userArea != null ? (
    <>
      {userArea.area.residences.map((residence) => {
        return (
          <MapResidence
            key={'residence:' + residence.id}
            draggable={mapEditType === MapEditType.Residence}
            selected={selectedResidenceId === Number(residence.id)}
            selectable={mapEditType === MapEditType.Residence || mapEditType === MapEditType.Room}
            residence={residence as Residence}
          />
        );
      })}

      {userArea.area.polygons.map((polygon) => {
        return (
          <MapOutline
            key={'polygon:' + polygon.id}
            polygon={polygon as Polygon}
            editable={mapEditType === MapEditType.Polygon}
          />
          // <Polygon
          //   key={'polygon:' + polygon.id}
          //   editable={mapEditType === MapEditType.Polygon} // ポイント移動を許可
          //   draggable={mapEditType === MapEditType.Polygon} // エッジ追加を許可
          //   options={{
          //     fillOpacity: 0, // 塗りつぶし無し
          //     geodesic: false,
          //     clickable: false, // 全体のクリック禁止
          //     strokeColor: 'blue',
          //   }}
          //   path={polygon.points.map((x) => ({ lat: x.latitude, lng: x.longitude }))}
          //   onDragEnd={(e) => {
          //     console.log(e);
          //   }}
          // />
        );
      })}
    </>
  ) : null;
};
export default MapData;
