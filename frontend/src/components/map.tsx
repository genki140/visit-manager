import { mapStyles } from '@/styles/map-styles';
import { GoogleMap } from '@react-google-maps/api';
import React, { forwardRef, ReactNode, useImperativeHandle, useState } from 'react';
import { actions, MapEditType, useAppDispatch, useStoreState } from '@/ducks/store';
import { useGetUserAreaQuery } from '@/types/graphql';
import { useRouterParams } from '@/utils/use-router-params';
import { MapQueries } from '@/queries/map-edit-queries';
import Head from 'next/head';

const center = { lat: 37.94181358543269, lng: 139.10948906051917 };

export type MapOutput = {
  getInfo: () => {
    zoom: number;
    center: {
      latitude: number;
      longitude: number;
    };
    bounds: {
      northEast: {
        latitude: number;
        longitude: number;
      };
      southWest: {
        latitude: number;
        longitude: number;
      };
    };
    map: google.maps.Map | undefined;
  };
};

const Map = forwardRef<
  MapOutput | undefined,
  {
    children: ReactNode;
  }
>((props, ref) => {
  const [mapRef, setMapRef] = useState<google.maps.Map | undefined>(undefined);
  const mapEditType = useStoreState((x) => x.map.editType);

  const dispatch = useAppDispatch();

  // router
  const routerParams = useRouterParams();

  // queries
  const getUserAreaResult = useGetUserAreaQuery({
    variables: { organizationId: routerParams.organizationName, areaId: routerParams.areaName },
    skip: !routerParams.hasOrganizationAndArea,
  });
  const userArea = getUserAreaResult.data?.userAreas?.[0];

  // mutations
  const [createResidence] = MapQueries.useCreateResidence();

  // fowardRef
  const getInfo = () => ({
    center: {
      latitude: (mapRef?.getCenter()?.toJSON()?.lat ?? 0) as number,
      longitude: (mapRef?.getCenter()?.toJSON()?.lng ?? 0) as number,
    },
    bounds: {
      northEast: {
        latitude: (mapRef?.getBounds()?.getNorthEast()?.toJSON()?.lat ?? 0) as number,
        longitude: (mapRef?.getBounds()?.getNorthEast()?.toJSON()?.lng ?? 0) as number,
      },
      southWest: {
        latitude: (mapRef?.getBounds()?.getSouthWest()?.toJSON()?.lat ?? 0) as number,
        longitude: (mapRef?.getBounds()?.getSouthWest()?.toJSON()?.lng ?? 0) as number,
      },
    },
    zoom: mapRef?.getZoom() ?? (0 as number),
    map: mapRef,
  });
  useImperativeHandle(ref, () => ({ getInfo }));

  // render
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0,width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
        />
      </Head>

      <GoogleMap
        onLoad={(map) => setMapRef(map)}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        options={{
          styles: mapStyles as any,
          disableDefaultUI: true,
          clickableIcons: false,
          draggableCursor: mapEditType !== MapEditType.Residence ? undefined : 'copy',
        }}
        // center={center}
        zoom={18} // ズームをUIで任意の位置で止める方法が分からない！！！
        onClick={async (e) => {
          if (mapEditType !== MapEditType.Residence) {
            return;
          }

          if (userArea != null) {
            const result = await createResidence({
              variables: {
                areaId: userArea.area.id,
                latitude: e.latLng.lat(),
                longitude: e.latLng.lng(),
              },
              // 楽観的更新
              optimisticResponse: (v) => ({
                __typename: 'Mutation',
                createResidence: {
                  __typename: 'Residence',
                  id: 'residence:' + new Date().getTime(),
                  latitude: v.latitude,
                  longitude: v.longitude,
                  name: '',
                  residents: [],
                },
              }),
            });
            if (result.data != null) {
              dispatch(actions.setSelectedResidenceId({ residenceId: Number(result.data.createResidence.id) }));
            }
          }
        }}
      >
        {props.children}
      </GoogleMap>
    </>
  );
});

export default Map;
