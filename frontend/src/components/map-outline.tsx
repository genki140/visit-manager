import { actions, useAppDispatch, useStoreState } from '@/ducks/store';
import {
  GetUserAreaDocument,
  GetUserAreaQuery,
  GetUserAreaQueryVariables,
  Polygon,
  Residence,
  UpdatePolygonPointInput,
  useUpdatePolygonMutation,
  useUpdateResidenceMutation,
} from '@/types/graphql';
import { Marker, Polygon as MapPolygon } from '@react-google-maps/api';
import React, { memo } from 'react';
import equal from 'fast-deep-equal';
import { useRef } from 'react';
import { useCallback } from 'react';
import Enumerable from 'linq';
import { useRouterParams } from '@/utils/use-router-params';
import { toNonNullable } from '@/utils/type-helper';

// 頂点取得や削除の参考資料
// https://developers.google.com/maps/documentation/javascript/examples/delete-vertex-menu

const CirclePath = 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2z';

export const MapOutline = memo(
  (props: { polygon: Polygon; editable: boolean }) => {
    const dispatch = useAppDispatch();
    const selectedPolygonId = useStoreState((x) => x.map.selectedPolygonId);
    const selectedPolygonPointId = useStoreState((x) => x.map.selectedPolygonPointId);

    const orderdPoints = Enumerable.from(props.polygon.points)
      .orderBy((x) => x.order)
      .select((x) => ({ lat: x.latitude, lng: x.longitude }))
      .toArray();

    const routerParams = useRouterParams();
    const getUserAreaResultVariables = { organizationId: routerParams.organizationName, areaId: routerParams.areaName };

    // この辺も全部含めて切り出せそう。
    const [updatePolygon] = useUpdatePolygonMutation();
    const updatePolygonTest = async (points: UpdatePolygonPointInput[]) => {
      // 変化がなければスキップ
      const orderdNewPoints = Enumerable.from(points)
        .orderBy((x) => x.order)
        .select((x) => ({ lat: x.latitude, lng: x.longitude }))
        .toArray();
      if (equal(orderdPoints, orderdNewPoints)) {
        return;
      }

      return await updatePolygon({
        variables: {
          id: props.polygon.id,
          points: points,
        },
        // 期待値の構築
        optimisticResponse: {
          __typename: 'Mutation',
          updatePolygon: {
            __typename: 'Polygon',
            id: props.polygon.id,
            points: points.map((x) => ({
              __typename: 'PolygonPoint',
              id: props.polygon.points.find((y) => y.order === x.order)?.id ?? 'PolygonPoint:' + new Date().getDate(),
              order: toNonNullable(x.order),
              latitude: toNonNullable(x.latitude),
              longitude: toNonNullable(x.longitude),
            })),
          },
        },
        update: (cache, { data }) => {
          console.log('update');
          if (data == null) {
            return;
          }

          // キャッシュデータ取得
          let copiedData = cache.readQuery<GetUserAreaQuery, GetUserAreaQueryVariables>({
            query: GetUserAreaDocument,
            variables: getUserAreaResultVariables,
          });
          copiedData = JSON.parse(JSON.stringify(copiedData)) as typeof copiedData;

          const polygon = copiedData?.userAreas[0].area.polygons.find((x) => x.id === selectedPolygonId?.toString());
          if (polygon == null) {
            return;
          }

          console.log('data');
          console.log(JSON.parse(JSON.stringify(data.updatePolygon.points)));

          console.log('before');
          console.log(JSON.parse(JSON.stringify(polygon.points)));

          polygon.points = data.updatePolygon.points;

          console.log('after');
          console.log(JSON.parse(JSON.stringify(polygon.points)));

          // .map((x) => {
          //   return {
          //     id: x.id,
          //     latitude: x.latitude,
          //     longitude: x.longitude,
          //     __typename: x.__typename,
          //     order: x.order,
          //   };
          // });

          // キャッシュ書き換え
          // ここがうまく行ってない！
          // polygon.points = newPoints
          //   .map((x) => polygon.points.find((y) => y.order === x.order))
          //   .filter((x): x is NonNullable<typeof x> => x != null)
          //   .map((x) => {
          //     x.latitude =
          //     __typename: x.__typename,
          //     id: x.id,
          //     latitude: x.latitude,
          //     longitude: x.longitude,
          //     order: x.order,
          //   });

          // キャッシュデータ更新
          cache.writeQuery({
            query: GetUserAreaDocument,
            variables: getUserAreaResultVariables,
            data: copiedData,
          });
        },
      });
    };

    // ------編集検出ロジック------
    const polygonRef = useRef<any>();
    const onEdit = async (e: any) => {
      if (polygonRef.current) {
        const nextPath = polygonRef.current
          .getPath()
          .getArray()
          .map((latLng: any) => ({ lat: latLng.lat(), lng: latLng.lng() }));
        const newPoints = nextPath.map((x: any, i: any) => ({ order: i, latitude: x.lat, longitude: x.lng }));

        console.log('newPoints');
        console.log(newPoints);

        // 更新
        const result = await updatePolygonTest(newPoints);

        // ポリゴンを選択状態とする
        dispatch(actions.setSelectedPolygonId({ polygonId: Number(props.polygon.id) }));

        // 頂点の選択
        if (e.vertex != null) {
          dispatch(
            actions.setSelectedPolygonPointId({
              pointId: Number(props.polygon.points.find((x) => x.order === Number(e.vertex))?.id),
            }),
          );
        }

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
