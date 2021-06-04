import { actions, useAppDispatch, useStoreState } from '@/ducks/store';
import { Outline } from '@/types/graphql';
import { Marker, Polygon } from '@react-google-maps/api';
import React, { memo } from 'react';
import equal from 'fast-deep-equal';
import { useRef } from 'react';
import Enumerable from 'linq';
import { MapQueries } from '@/queries/map-edit-queries';

// 頂点取得や削除の参考資料
// https://developers.google.com/maps/documentation/javascript/examples/delete-vertex-menu

const CirclePath = 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2z';

export const MapOutline = memo(
  (props: { outline: Outline; editable: boolean }) => {
    // redux states
    const dispatch = useAppDispatch();
    const selectedOutlineId = useStoreState((x) => x.map.selectedOutlineId);
    const selectedOutlinePointId = useStoreState((x) => x.map.selectedOutlinePointId);

    // mutations
    const updateOutline = MapQueries.useUpdateOutline();

    const orderdPoints = Enumerable.from(props.outline.points)
      .orderBy((x) => x.order)
      .select((x) => ({ lat: x.latitude, lng: x.longitude }))
      .toArray();

    // ------編集検出ロジック------
    const outlineRef = useRef<any>();
    const onEdit = async (e: any) => {
      if (outlineRef.current) {
        // データ更新
        const resultPromise = updateOutline({
          id: props.outline.id,
          points: (outlineRef.current.getPath().getArray() as any[]).map((latLng: any, i: number) => ({
            order: i,
            latitude: latLng.lat(),
            longitude: latLng.lng(),
          })),
        });

        const outlineId = Number(props.outline.id);

        // 頂点の選択
        if (e.vertex != null) {
          const pointId = Number(props.outline.points.find((x) => x.order === Number(e.vertex))?.id);
          // console.log(pointId);
          dispatch(
            actions.setSelectedOutlinePointId({
              pointId: pointId,
            }),
          );
        }

        // ポリゴンを選択状態とする
        dispatch(actions.setSelectedOutlineId({ outlineId: outlineId }));
        // ポリゴン追加の場合はポイント選択を解除する
        if (e.edge != null) {
          dispatch(actions.setSelectedOutlinePointId({ pointId: undefined }));
        }

        const result = await resultPromise;

        // エッジの選択
        if (result?.data?.updateOutline != null && e.edge != null) {
          const newId = Number(result.data.updateOutline.points.find((x) => x.order == Number(e.edge) + 1)?.id);
          dispatch(actions.setSelectedOutlinePointId({ pointId: Number(newId) }));
        }
      }
    };

    const isSelected = selectedOutlineId === Number(props.outline.id);
    const selectedPoint = props.outline.points.find((x) => Number(x.id) === selectedOutlinePointId);
    // console.log('selectedPoint');
    // console.log(selectedPoint);
    // console.log(props.polygon.points);

    return (
      <>
        <Polygon
          editable={props.editable} // ポイント移動を許可
          options={{
            fillOpacity: 0, // 塗りつぶし無し
            geodesic: false,
            clickable: false, // 全体のクリック禁止
            strokeColor: props.editable ? (isSelected ? '#0000FF' : '#8888FF') : 'black',
          }}
          path={orderdPoints}
          onLoad={(outline) => (outlineRef.current = outline)}
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
