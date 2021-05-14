import { useGetGoogleMapApiKeyQuery } from '@/types/graphql';
import { gql } from '@apollo/client';
import { LoadScript } from '@react-google-maps/api';
import React, { useState } from 'react';
import { Loading } from '../loading';

// とりあえず実装。初期設定取得径はまとめたクエリにするとレスポンス良さげ。何ならSSR出来たらもっといい。
gql`
  query getGoogleMapApiKey {
    googleMapApiKey
  }
`;

export const GoogleMapProvider = (props: { children: any }) => {
  const [mapApiLoaded, setMapApiLoaded] = useState(false);

  // フロントエンドの動的環境変数がうまく行かないのでバックエンドから取得する
  const getGoogleMapApiKeyResult = useGetGoogleMapApiKeyQuery();

  if (getGoogleMapApiKeyResult.data == null) {
    return <Loading />;
  }

  return (
    <>
      <LoadScript
        googleMapsApiKey={getGoogleMapApiKeyResult.data?.googleMapApiKey ?? ''}
        onLoad={() => setMapApiLoaded(true)}
      >
        {mapApiLoaded && props.children()}
      </LoadScript>
    </>
  );
};
