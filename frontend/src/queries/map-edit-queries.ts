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
            order
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

gql`
  mutation deletePolygon($id: ID!) {
    deletePolygon(id: $id)
  }
`;

import {
  GetUserAreaDocument,
  GetUserAreaQuery,
  GetUserAreaQueryVariables,
  Polygon,
  UpdatePolygonMutationVariables,
  useCreatePolygonMutation,
  useCreateResidenceMutation,
  useUpdatePolygonMutation,
} from '@/types/graphql';
import Enumerable from 'linq';
import equal from 'fast-deep-equal';
import { TypeUtil } from '@/utils/type-helper';

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

/** キャッシュを自動更新するミューテーション */
export const useUpdatePolygonMutationWithCacheUpdate = (target: Polygon, variables: GetUserAreaQueryVariables) => {
  const [updatePolygonMutation] = useUpdatePolygonMutation();

  const orderdPoints = Enumerable.from(target.points)
    .orderBy((x) => x.order)
    .select((x) => ({ lat: x.latitude, lng: x.longitude }))
    .toArray();

  const resultFunction = async (mutationVariables: UpdatePolygonMutationVariables) => {
    // 変化がなければスキップ
    const orderdNewPoints = Enumerable.from(TypeUtil.toArray(mutationVariables.points))
      .orderBy((x) => x.order)
      .select((x) => ({ lat: x.latitude, lng: x.longitude }))
      .toArray();
    if (equal(orderdPoints, orderdNewPoints)) {
      return;
    }

    return updatePolygonMutation({
      variables: mutationVariables,
      // 期待値の構築
      optimisticResponse: {
        __typename: 'Mutation',
        updatePolygon: {
          __typename: 'Polygon',
          id: mutationVariables.id,
          points: (Array.isArray(mutationVariables.points) ? mutationVariables.points : [mutationVariables.points]).map(
            (x) => ({
              __typename: 'PolygonPoint',
              id: target.points.find((y) => y.order === x.order)?.id ?? 'PolygonPoint:' + new Date().getDate(),
              order: TypeUtil.toNonNullable(x.order),
              latitude: TypeUtil.toNonNullable(x.latitude),
              longitude: TypeUtil.toNonNullable(x.longitude),
            }),
          ),
        },
      },
      update: (cache, { data }) => {
        if (data == null) {
          return;
        }

        // キャッシュデータ取得
        let copiedData = cache.readQuery<GetUserAreaQuery, GetUserAreaQueryVariables>({
          query: GetUserAreaDocument,
          variables: variables,
        });
        copiedData = JSON.parse(JSON.stringify(copiedData)) as typeof copiedData;

        const polygon = copiedData?.userAreas[0].area.polygons.find((x) => x.id === mutationVariables.id);
        if (polygon == null) {
          return;
        }

        console.log('update');
        polygon.points = data.updatePolygon.points;

        // キャッシュデータ更新
        cache.writeQuery({
          query: GetUserAreaDocument,
          variables: variables,
          data: copiedData,
        });
      },
    });
  };
  return resultFunction;
};

// // この辺も全部含めて切り出せそう。
// const [updatePolygon] = useUpdatePolygonMutation();
// const updatePolygonTest = async (points: UpdatePolygonPointInput[]) => {
//   // 変化がなければスキップ
//   const orderdNewPoints = Enumerable.from(points)
//     .orderBy((x) => x.order)
//     .select((x) => ({ lat: x.latitude, lng: x.longitude }))
//     .toArray();
//   if (equal(orderdPoints, orderdNewPoints)) {
//     return;
//   }

//   return await updatePolygon({
//     variables: {
//       id: props.polygon.id,
//       points: points,
//     },
//     // 期待値の構築
//     optimisticResponse: {
//       __typename: 'Mutation',
//       updatePolygon: {
//         __typename: 'Polygon',
//         id: props.polygon.id,
//         points: points.map((x) => ({
//           __typename: 'PolygonPoint',
//           id: props.polygon.points.find((y) => y.order === x.order)?.id ?? 'PolygonPoint:' + new Date().getDate(),
//           order: toNonNullable(x.order),
//           latitude: toNonNullable(x.latitude),
//           longitude: toNonNullable(x.longitude),
//         })),
//       },
//     },
//     update: (cache, { data }) => {
//       console.log('update');
//       if (data == null) {
//         return;
//       }

//       // キャッシュデータ取得
//       let copiedData = cache.readQuery<GetUserAreaQuery, GetUserAreaQueryVariables>({
//         query: GetUserAreaDocument,
//         variables: getUserAreaResultVariables,
//       });
//       copiedData = JSON.parse(JSON.stringify(copiedData)) as typeof copiedData;

//       const polygon = copiedData?.userAreas[0].area.polygons.find((x) => x.id === selectedPolygonId?.toString());
//       if (polygon == null) {
//         return;
//       }

//       console.log('data');
//       console.log(JSON.parse(JSON.stringify(data.updatePolygon.points)));

//       console.log('before');
//       console.log(JSON.parse(JSON.stringify(polygon.points)));

//       polygon.points = data.updatePolygon.points;

//       console.log('after');
//       console.log(JSON.parse(JSON.stringify(polygon.points)));

//       // .map((x) => {
//       //   return {
//       //     id: x.id,
//       //     latitude: x.latitude,
//       //     longitude: x.longitude,
//       //     __typename: x.__typename,
//       //     order: x.order,
//       //   };
//       // });

//       // キャッシュ書き換え
//       // ここがうまく行ってない！
//       // polygon.points = newPoints
//       //   .map((x) => polygon.points.find((y) => y.order === x.order))
//       //   .filter((x): x is NonNullable<typeof x> => x != null)
//       //   .map((x) => {
//       //     x.latitude =
//       //     __typename: x.__typename,
//       //     id: x.id,
//       //     latitude: x.latitude,
//       //     longitude: x.longitude,
//       //     order: x.order,
//       //   });

//       // キャッシュデータ更新
//       cache.writeQuery({
//         query: GetUserAreaDocument,
//         variables: getUserAreaResultVariables,
//         data: copiedData,
//       });
//     },
//   });
// };
