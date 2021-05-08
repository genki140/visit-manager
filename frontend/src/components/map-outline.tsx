import { actions, useAppDispatch, useStoreState } from '@/ducks/store';
import { Polygon } from '@/types/graphql';
import { Marker, Polygon as MapPolygon } from '@react-google-maps/api';
import React, { memo } from 'react';
import equal from 'fast-deep-equal';
import { useRef } from 'react';
import Enumerable from 'linq';
import { MapQueries } from '@/queries/map-edit-queries';

// 頂点取得や削除の参考資料
// https://developers.google.com/maps/documentation/javascript/examples/delete-vertex-menu

const CirclePath = 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2z';

export const MapOutline = memo(
  (props: { polygon: Polygon; editable: boolean }) => {
    // redux states
    const dispatch = useAppDispatch();
    const selectedPolygonId = useStoreState((x) => x.map.selectedPolygonId);
    const selectedPolygonPointId = useStoreState((x) => x.map.selectedPolygonPointId);

    console.log('MapOutline');

    // mutations
    const updatePolygon = MapQueries.useUpdatePolygon();

    const orderdPoints = Enumerable.from(props.polygon.points)
      .orderBy((x) => x.order)
      .select((x) => ({ lat: x.latitude, lng: x.longitude }))
      .toArray();

    // ------編集検出ロジック------
    const polygonRef = useRef<any>();
    const onEdit = async (e: any) => {
      if (polygonRef.current) {
        // データ更新
        const resultPromise = updatePolygon({
          id: props.polygon.id,
          points: (polygonRef.current.getPath().getArray() as any[]).map((latLng: any, i: number) => ({
            order: i,
            latitude: latLng.lat(),
            longitude: latLng.lng(),
          })),
        });

        const polygonId = Number(props.polygon.id);

        // 頂点の選択
        if (e.vertex != null) {
          const pointId = Number(props.polygon.points.find((x) => x.order === Number(e.vertex))?.id);
          console.log(pointId);
          dispatch(
            actions.setSelectedPolygonPointId({
              pointId: pointId,
            }),
          );
        }

        // ポリゴンを選択状態とする
        dispatch(actions.setSelectedPolygonId({ polygonId: polygonId }));

        const result = await resultPromise;

        // エッジの選択
        if (result?.data?.updatePolygon != null && e.edge != null) {
          const newId = Number(result.data.updatePolygon.points.find((x) => x.order == Number(e.edge) + 1)?.id);
          dispatch(
            actions.setSelectedPolygonPointId({
              pointId: Number(newId),
            }),
          );
        }
      }
    };

    const isSelected = selectedPolygonId === Number(props.polygon.id);
    const selectedPoint = props.polygon.points.find((x) => Number(x.id) === selectedPolygonPointId);
    // console.log('selectedPoint');
    // console.log(selectedPoint);
    // console.log(props.polygon.points);

    return (
      <>
        <MapPolygon
          editable={props.editable} // ポイント移動を許可
          options={{
            fillOpacity: 0, // 塗りつぶし無し
            geodesic: false,
            clickable: false, // 全体のクリック禁止
            strokeColor: props.editable ? (isSelected ? '#0000FF' : '#8888FF') : 'black',
          }}
          path={orderdPoints}
          onLoad={(polygon) => (polygonRef.current = polygon)}
          onMouseUp={onEdit}
        />

        {selectedPoint != null && (
          <Marker
            position={{ lat: selectedPoint.latitude, lng: selectedPoint.longitude }}
            icon={{
              fillColor: '#0000FF', //塗り潰し色
              strokeColor: '#0000FF', //枠の色
              fillOpacity: 1.0,
              strokeOpacity: 1.0,
              strokeWeight: 1.0, //枠の透過率
              anchor: new window.google.maps.Point(12.5, 12.5),
              path: CirclePath,
              scale: 1.0,
            }}
            draggable={false}
            clickable={false}
          />
        )}
      </>
    );
  },
  (prev, next) => equal(prev, next),
);
