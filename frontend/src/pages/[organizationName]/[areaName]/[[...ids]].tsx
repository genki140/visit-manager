import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import { Layout } from '@/components/layout';
import Map, { MapOutput } from '@/components/map';
import MapData from '@/components/map-data';
import { Custom404 } from '@/pages/404';
import { MapControls } from '@/components/map-controls';
import { useRouterParams } from '@/utils/use-router-params';
import { MapResidents } from '@/components/map-residents';
import MapUserLocation from '@/components/map-user-location';

// 地図ページ。設定画面と兼用

// 会衆＆区域でユーザーの区域情報を取得する

const AreaPage = () => {
  // refs
  const mapRef = useRef({} as MapOutput);

  // router
  const router = useRouter();
  const routerParams = useRouterParams();

  // // ユーザーがこの組織に所属していなければ404
  // if (error != null) {
  //   const errorCode = error.graphQLErrors?.[0]?.extensions?.['code'];
  //   if (errorCode === 'NOT_FOUND') {
  //     return <Custom404 />;
  //   }
  // }

  // この区域がユーザーに配られていなければ404を表示する
  if (router.query.id == null) {
    // 通常モード
  } else if (router.query.ids?.[0] === 'settings') {
    // 設定モード
    // 設定モードでは、保存とキャンセルの操作を下に表示？
  } else {
    return <Custom404 />;
  }

  return (
    <Layout title={routerParams.areaName} fillContent={true}>
      <Map ref={mapRef}>
        <MapData />
        <MapUserLocation />
      </Map>

      <MapControls map={mapRef} />
      <MapResidents />
    </Layout>
  );
};
export default AreaPage;
