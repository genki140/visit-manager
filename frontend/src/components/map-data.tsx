import { MapEditType, useStoreState } from '@/ducks/store';
import { Outline, Residence, useGetUserAreaQuery, UserArea } from '@/types/graphql';
import { useRouterParams } from '@/utils/use-router-params';
import Enumerable from 'linq';
import { MutableRefObject, useEffect, useState } from 'react';
import { MapOutput } from './map';
import { MapOutline } from './map-outline';
import { MapResidence } from './map-residence';

export const getMapBoundsFromArea = (userArea: UserArea | undefined) => {
  const allLatLngEnum = Enumerable.from(
    Enumerable.from(userArea?.area.outlines ?? [])
      .selectMany((x) => x.points)
      .select((x) => ({ lat: x.latitude, lng: x.longitude }))
      .concat(Enumerable.from(userArea?.area.residences ?? []).select((x) => ({ lat: x.latitude, lng: x.longitude })))
      .toArray(),
  );
  let bounds: google.maps.LatLngBounds | undefined = undefined;
  if (allLatLngEnum.count() > 0) {
    const sw = new google.maps.LatLng(
      allLatLngEnum.min((x) => x.lat),
      allLatLngEnum.min((x) => x.lng),
    );
    const ne = new google.maps.LatLng(
      allLatLngEnum.max((x) => x.lat),
      allLatLngEnum.max((x) => x.lng),
    );
    bounds = new google.maps.LatLngBounds(sw, ne);
  }
  return bounds;
};

const useFitBoundsEffect = (mapRef: MutableRefObject<MapOutput | undefined>, userArea: UserArea | undefined) => {
  const bounds = getMapBoundsFromArea(userArea);
  const [fitted, setFitted] = useState(false);

  // データ読み込み後マップをセンターに移動する
  useEffect(() => {
    // 非同期実行
    let unmounted = false;
    const f = async () => {
      // マップが初期化されるタイミングが分からないため繰り返し実行する
      while (unmounted === false) {
        const map = mapRef.current?.getInfo().map;
        if (map != null && bounds != null) {
          unmounted = true;
          map.fitBounds(bounds, 0);
          setFitted(true);
        }
        await new Promise((r) => setTimeout(r, 200)); // 少し待機
      }
    };
    if (fitted === false) {
      f();
    }
    return () => {
      unmounted = true;
    };
  }, [bounds]);
};

const MapData = (props: { map: MutableRefObject<MapOutput | undefined> }) => {
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

  // 地図の表示サイズ設定
  useFitBoundsEffect(props.map, userArea as UserArea | undefined);

  if (userArea == null) {
    return null;
  }

  // render
  return (
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

      {userArea.area.outlines.map((outline) => {
        return (
          <MapOutline
            key={'outline:' + outline.id}
            outline={outline as Outline}
            editable={mapEditType === MapEditType.Outline}
          />
        );
      })}
    </>
  );
};
export default MapData;
