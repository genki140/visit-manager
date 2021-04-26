import { actions, useAppDispatch } from '@/ducks/store';
import { Polygon, Residence, useUpdateResidenceMutation } from '@/types/graphql';
import { Marker, Polygon as MapPolygon } from '@react-google-maps/api';
import React, { memo } from 'react';
import equal from 'fast-deep-equal';
import { useRef } from 'react';
import { useCallback } from 'react';

export const MapOutline = memo(
  (props: { polygon: Polygon; editable: boolean }) => {
    const dispatch = useAppDispatch();

    // ------編集検出ロジック------
    const polygonRef = useRef<any | undefined>();
    const listenersRef = useRef<Array<any>>([]);
    const onEdit = () => {
      if (polygonRef.current) {
        const nextPath = polygonRef.current
          .getPath()
          .getArray()
          .map((latLng: any) => {
            return { lat: latLng.lat(), lng: latLng.lng() };
          });
        console.log(nextPath);
        // setPath(nextPath);
      }
    };
    const onLoad = (polygon: any) => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
      listenersRef.current.push(
        path.addListener('set_at', onEdit),
        path.addListener('insert_at', onEdit),
        path.addListener('remove_at', onEdit),
      );
    };
    const onUnmount = () => {
      listenersRef.current.forEach((lis) => lis.remove());
      polygonRef.current = null;
    };
    // ----------------------------

    return (
      <MapPolygon
        editable={props.editable} // ポイント移動を許可
        draggable={props.editable} // エッジ追加を許可
        options={{
          fillOpacity: 0, // 塗りつぶし無し
          geodesic: false,
          clickable: false, // 全体のクリック禁止
          strokeColor: props.editable ? 'blue' : 'black',
        }}
        path={props.polygon.points.map((x) => ({ lat: x.latitude, lng: x.longitude }))}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onDragEnd={onEdit}
      />
    );
  },
  (prev, next) => equal(prev, next),
);
