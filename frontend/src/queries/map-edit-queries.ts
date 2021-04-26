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
    }
  }
`;

gql`
  mutation updatePolygon($id: ID!, $points: [UpdatePolygonPointInput!]!) {
    updatePolygon(polygon: { id: $id, points: $points }) {
      id
      points {
        id
        order
        latitude
        longitude
      }
    }
  }
`;

import {
  GetUserAreaDocument,
  GetUserAreaQueryVariables,
  useCreatePolygonMutation,
  useCreateResidenceMutation,
} from '@/types/graphql';

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
    // // 楽観的更新
    // optimisticResponse: (v) => ({
    //   createResidence: {
    //     id: 'residence:' + new Date().getTime(),
    //     latitude: v.latitude,
    //     longitude: v.longitude,
    //     name: '',
    //     residents: [],
    //   },
    // }),
  });

// export const useUpdateResidenceMutationWithCacheUpdate = () =>
//   useUpdateResidenceMutation({
//     // 楽観的更新
//     optimisticResponse: (v) => ({
//       // __typename: 'Mutation',
//       updateResidence: {
//         // __typename: 'Residence',
//         id: v.id,
//         // name: '',
//         latitude: v.latitude,
//         longitude: v.longitude,
//         // residents: [],
//       },
//     }),
//   });

/** キャッシュを自動更新するミューテーション */
export const useCreatePolygonMutationWithCacheUpdate = (variables: GetUserAreaQueryVariables | undefined) =>
  useCreatePolygonMutation({
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
      copiedData.userAreas[0].area.polygons.push(data?.createPolygon);

      // キャッシュデータ更新
      cache.writeQuery({
        query: GetUserAreaDocument,
        variables: variables,
        data: copiedData,
      });
    },
  });
