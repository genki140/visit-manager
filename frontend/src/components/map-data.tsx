import { MapEditType, useStoreState } from '@/ducks/store';
import { Polygon, Residence, useGetUserAreaQuery } from '@/types/graphql';
import { useRouterParams } from '@/utils/use-router-params';
import { MapOutline } from './map-outline';
import { MapResidence } from './map-residence';

const MapData = () => {
  // redux state
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
            selectable={
              mapEditType === MapEditType.None ||
              mapEditType === MapEditType.Residence ||
              mapEditType === MapEditType.Room
            }
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
        );
      })}
    </>
  ) : null;
};
export default MapData;
