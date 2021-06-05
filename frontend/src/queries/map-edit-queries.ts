import { ApolloCache, gql } from '@apollo/client';

import {
  DeleteOutlineMutationVariables,
  DeleteResidenceMutationVariables,
  GetUserAreaDocument,
  GetUserAreaQuery,
  GetUserAreaQueryVariables,
  UpdateOutlineMutationVariables,
  UpdateResidenceMutationVariables,
  useCreateOutlineMutation,
  useCreateResidenceMutation,
  useDeleteOutlineMutation,
  useDeleteResidenceMutation,
  useGetUserAreaQuery,
  useUpdateOutlineMutation,
  useUpdateResidenceMutation,
} from '@/types/graphql';
import Enumerable from 'linq';
import equal from 'fast-deep-equal';
import { TypeUtil } from '@/utils/type-helper';
import { useRouterParams } from '@/utils/use-router-params';

export class MapQueries {
  /** キャッシュ更新用ヘルパー */
  private static useUserAreaQueryCache = () => {
    const routerParams = useRouterParams();
    const getUserAreaResultVariables = {
      organizationId: routerParams.getOrganizationId(),
      areaId: routerParams.areaName,
    };

    return {
      read: <T>(cache: ApolloCache<T>) => {
        let copiedData = TypeUtil.toNonNullable(
          cache.readQuery<GetUserAreaQuery, GetUserAreaQueryVariables>({
            query: GetUserAreaDocument,
            variables: getUserAreaResultVariables,
          }),
        );
        copiedData = JSON.parse(JSON.stringify(copiedData)) as typeof copiedData;
        return copiedData;
      },
      write: <T, U>(cache: ApolloCache<T>, data: U) => {
        return cache.writeQuery({
          query: GetUserAreaDocument,
          variables: getUserAreaResultVariables,
          data: data,
        });
      },
    };
  };

  /** キャッシュを自動更新するミューテーション */
  static useCreateResidence = () => {
    const userAreaQueryCache = MapQueries.useUserAreaQueryCache();
    return useCreateResidenceMutation({
      update: (cache, result) => {
        const data = TypeUtil.toNonNullable(result.data);
        const cacheData = userAreaQueryCache.read(cache);

        // クエリに対するキャッシュデータ書き換え
        cacheData.userAreas[0].area.residences.push(data?.createResidence);

        userAreaQueryCache.write(cache, cacheData);
      },
    });
  };

  /** 住宅座標を更新 */
  static useUpdateResidence = () => {
    const userAreaQueryCache = MapQueries.useUserAreaQueryCache();
    const [updateResidence] = useUpdateResidenceMutation();
    const result = (variables: UpdateResidenceMutationVariables) =>
      updateResidence({
        variables: variables,
        optimisticResponse: {
          __typename: 'Mutation',
          updateResidence: {
            __typename: 'Residence',
            id: variables.id,
            name: '',
            latitude: variables.latitude,
            longitude: variables.longitude,
            residents: [],
          },
        },
        update: (cache, result) => {
          const data = TypeUtil.toNonNullable(result.data);
          const cacheData = userAreaQueryCache.read(cache);

          // クエリに対するキャッシュデータ書き換え
          const outline = Enumerable.from(cacheData.userAreas[0]?.area?.outlines ?? [])
            .selectMany((x) => x.points)
            .first((x) => x.id === variables.id);
          outline.latitude = data.updateResidence.latitude;
          outline.longitude = data.updateResidence.longitude;

          userAreaQueryCache.write(cache, cacheData);
        },
      });
    return result;
  };

  static useDeleteResidence = () => {
    const userAreaQueryCache = MapQueries.useUserAreaQueryCache();
    const [deleteResidenceMutation] = useDeleteResidenceMutation();
    const resultFunction = async (variables: DeleteResidenceMutationVariables) => {
      return deleteResidenceMutation({
        variables: variables,
        update: (cache) => {
          // const data = TypeUtil.toNonNullable(result.data);
          const cacheData = userAreaQueryCache.read(cache);
          // クエリに対するキャッシュデータ書き換え
          const area = cacheData.userAreas[0].area;
          area.residences = area.residences.filter((x) => x.id !== variables.id);
          userAreaQueryCache.write(cache, cacheData);
        },
      });
    };
    return resultFunction;
  };

  /** アウトラインを生成し、キャッシュを更新 */
  static useCreateOutline = () => {
    const userAreaQueryCache = MapQueries.useUserAreaQueryCache();
    return useCreateOutlineMutation({
      update: (cache, result) => {
        const data = TypeUtil.toNonNullable(result.data);
        const cacheData = userAreaQueryCache.read(cache);

        // クエリに対するキャッシュデータ書き換え
        const outlines = TypeUtil.toNonNullable(cacheData?.userAreas?.[0]?.area?.outlines);
        outlines.push(data.createOutline);

        userAreaQueryCache.write(cache, cacheData);
      },
    });
  };

  /** アウトラインを更新し、キャッシュを更新 */
  static useUpdateOutline = () => {
    const userAreaQueryCache = MapQueries.useUserAreaQueryCache();

    // queries
    const routerParams = useRouterParams();
    const getUserAreaResult = useGetUserAreaQuery({
      variables: { organizationId: routerParams.getOrganizationId(), areaId: routerParams.areaName },
      skip: !routerParams.hasOrganizationAndArea,
    });
    const userArea = getUserAreaResult.data?.userAreas?.[0];

    // mutations
    const [updateOutlineMutation] = useUpdateOutlineMutation();

    const resultFunction = async (variables: UpdateOutlineMutationVariables) => {
      const prevPoints = userArea?.area?.outlines?.find((x) => x.id === variables.id)?.points ?? [];
      // 変化がなければスキップ
      {
        const orderdPoints = Enumerable.from(prevPoints)
          .orderBy((x) => x.order)
          .select((x) => ({ lat: x.latitude, lng: x.longitude }))
          .toArray();
        const orderdNewPoints = Enumerable.from(TypeUtil.toArray(variables.points))
          .orderBy((x) => x.order)
          .select((x) => ({ lat: x.latitude, lng: x.longitude }))
          .toArray();
        if (equal(orderdPoints, orderdNewPoints)) {
          return;
        }
      }

      // この部分はポリゴン変形で再度走らないので、prevPointsとの比較でおかしくなっている。
      // console.log('prevPoints');
      // console.log(prevPoints);

      return updateOutlineMutation({
        variables: variables,
        // 期待値の構築
        optimisticResponse: {
          __typename: 'Mutation',
          updateOutline: {
            __typename: 'Outline',
            id: variables.id,
            points: (Array.isArray(variables.points) ? variables.points : [variables.points]).map((x) => ({
              __typename: 'OutlinePoint',
              id: prevPoints.find((y) => y.order === x.order)?.id ?? 'OutlinePoint:' + new Date().getDate(),
              order: TypeUtil.toNonNullable(x.order),
              latitude: TypeUtil.toNonNullable(x.latitude),
              longitude: TypeUtil.toNonNullable(x.longitude),
            })),
          },
        },
        update: (cache, result) => {
          const data = TypeUtil.toNonNullable(result.data);
          const cacheData = userAreaQueryCache.read(cache);

          // クエリに対するキャッシュデータ書き換え
          const outline = TypeUtil.toNonNullable(
            cacheData.userAreas[0].area.outlines.find((x) => x.id === variables.id),
          );
          outline.points = data.updateOutline.points;

          // InMemoryCache の設定で自動マージしています
          userAreaQueryCache.write(cache, cacheData);
        },
      });
    };
    return resultFunction;
  };

  /** アウトラインを削除し、キャッシュを更新 */
  static useDeleteOutline = () => {
    const userAreaQueryCache = MapQueries.useUserAreaQueryCache();
    const [deleteOutlineMutation] = useDeleteOutlineMutation();

    const resultFunction = async (variables: DeleteOutlineMutationVariables) => {
      return deleteOutlineMutation({
        variables: variables,
        update: (cache) => {
          // const data = TypeUtil.toNonNullable(result.data);
          const cacheData = userAreaQueryCache.read(cache);

          // クエリに対するキャッシュデータ書き換え
          const area = cacheData.userAreas[0].area;
          area.outlines = area.outlines.filter((x) => x.id !== variables.id);

          userAreaQueryCache.write(cache, cacheData);

          // // キャッシュから削除
          // cache.evict({ id: cache.identify({ id: variables.id, __typename: 'Outline' }) });
          // cache.gc(); // 関連ポイントを削除
        },
      });
    };
    return resultFunction;
  };
}

// ユーザーエリアの全情報を取得
gql`
  query getUserArea($organizationId: Int!, $areaId: ID!) {
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
        outlines {
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
  mutation deleteResidence($id: ID!) {
    deleteResidence(id: $id)
  }
`;

gql`
  mutation createOutline($areaId: ID!, $points: [CreateOutlinePointInput!]!) {
    createOutline(outline: { areaId: $areaId, points: $points }) {
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
  mutation updateOutline($id: ID!, $points: [UpdateOutlinePointInput!]!) {
    updateOutline(outline: { id: $id, points: $points }) {
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
  mutation deleteOutline($id: ID!) {
    deleteOutline(id: $id)
  }
`;
