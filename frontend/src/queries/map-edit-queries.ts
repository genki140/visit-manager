import { gql } from '@apollo/client';

gql`
  # ユーザーエリアの全情報を取得
  query getUserArea($organizationId: ID!, $areaId: ID!) {
    userAreas(organizationId: $organizationId, ids: [$areaId]) {
      area {
        id
        name
        description
        residences {
          id
          name
          latitude
          longitude
          residents {
            id
            room
            floor
          }
        }
        polygons {
          id
          points {
            id
            latitude
            longitude
          }
        }
      }
    }
  }
`;

gql`
  mutation createResidence($areaId: ID!, $latitude: Float!, $longitude: Float!) {
    createResidence(residence: { areaId: $areaId, name: "", latitude: $latitude, longitude: $longitude }) {
      id
      latitude
      longitude
      name
      residents {
        id
        room
        floor
      }
    }
  }
`;

gql`
  mutation updateResidence($id: ID!, $latitude: Float!, $longitude: Float!) {
    updateResidence(residence: { id: $id, name: "", latitude: $latitude, longitude: $longitude }) {
      id
      latitude
      longitude
      name
      residents {
        id
        room
        floor
      }
    }
  }
`;

gql`
  mutation createPolygon($areaId: ID!, $points: [CreatePolygonPointInput!]!) {
    createPolygon(polygon: { areaId: $areaId, points: $points }) {
      id
      points {
        id
        order
        latitude
        longitude
      }
      area {
        id
      }
    }
  }
`;

import { GetUserAreaDocument, GetUserAreaQueryVariables, useCreateResidenceMutation } from '@/types/graphql';

/** キャッシュを自動更新するミューテーション */
export const useCreateResidenceMutationWithCacheUpdate = (variables: GetUserAreaQueryVariables | undefined) =>
  useCreateResidenceMutation({
    update: (cache, { data }) => {
      // こんな感じで書きたい
      // RefreshCache(getUserAreaResult,(cache)=>cache.userAreas[0].area.residences.push(data?.createResidence));

      // キャッシュデータ取得
      const copiedData = JSON.parse(
        JSON.stringify(
          cache.readQuery({
            query: GetUserAreaDocument,
            variables: variables,
          }),
        ),
      );

      // クエリに対するキャッシュデータ書き換え
      copiedData.userAreas[0].area.residences.push(data?.createResidence);

      // キャッシュデータ更新
      cache.writeQuery({
        query: GetUserAreaDocument,
        variables: variables,
        data: copiedData,
      });
    },
  });
