import { useGetGoogleMapApiKeyQuery } from '@/types/graphql';
import { gql } from '@apollo/client';
import { LoadScript } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';
import { Loading } from '../loading';

// とりあえず実装。初期設定取得径はまとめたクエリにするとレスポンス良さげ。何ならSSR出来たらもっといい。
gql`
  query getGoogleMapApiKey {
    googleMapApiKey
  }
`;

export const GoogleMapProvider = (props: { children: any }) => {
  const [mapApiKey, setMapApiKey] = useState('');
  const [mapApiLoaded, setMapApiLoaded] = useState(false);

  // フロントエンドの動的環境変数がうまく行かないのでバックエンドから取得する
  const getGoogleMapApiKeyResult = useGetGoogleMapApiKeyQuery();
  const resultKey = getGoogleMapApiKeyResult.loading ? '' : getGoogleMapApiKeyResult.data?.googleMapApiKey ?? 'error';

  // キーを取得出来たら保持しておく
  useEffect(() => {
    if (mapApiKey === '') {
      setMapApiKey(resultKey);
    }
  }, [resultKey]);

  // キーが取得できるまではロード中
  if (mapApiKey === '') {
    return <Loading />;
  }

  // LoadScriptが完了したら中身を表示
  return (
    <>
      <LoadScript googleMapsApiKey={mapApiKey} onLoad={() => setMapApiLoaded(true)}>
        {mapApiLoaded && props.children()}
      </LoadScript>
    </>
  );
};
