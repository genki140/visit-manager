import { ApolloCache } from '@apollo/client';

import {
  DeleteOutlineMutationVariables,
  DeleteResidenceMutationVariables,
  GetAreaDocument,
  GetAreaQuery,
  GetAreaQueryVariables,
  UpdateOutlineMutationVariables,
  UpdateResidenceMutationVariables,
  useCreateOutlineMutation,
  useCreateResidenceMutation,
  useDeleteOutlineMutation,
  useDeleteResidenceMutation,
  useGetAreaQuery,
  useUpdateOutlineMutation,
  useUpdateResidenceMutation,
} from '@/types/graphql';
import Enumerable from 'linq';
import equal from 'fast-deep-equal';
import { TypeUtil } from '@/utils/type-helper';
import { useRouterParams } from '@/utils/use-router-params';

export class AreaQueries {
  /** キャッシュ更新用ヘルパー */
  private static useAreaQueryCache = () => {
    const routerParams = useRouterParams();
    const getAreaResultVariables = {
      organizationId: routerParams.getOrganizationId(),
      areaId: routerParams.getAreaId(),
    };

    return {
      read: <T>(cache: ApolloCache<T>) => {
        let copiedData = TypeUtil.toNonNullable(
          cache.readQuery<GetAreaQuery, GetAreaQueryVariables>({
            query: GetAreaDocument,
            variables: getAreaResultVariables,
          }),
        );
        copiedData = JSON.parse(JSON.stringify(copiedData)) as typeof copiedData;
        return copiedData;
      },
      write: <T, U>(cache: ApolloCache<T>, data: U) => {
        return cache.writeQuery<U, GetAreaQueryVariables>({
          query: GetAreaDocument,
          variables: getAreaResultVariables,
          data: data,
        });
      },
    };
  };

  /** キャッシュを自動更新するミューテーション */
  static useCreateResidence = () => {
    const areaQueryCache = AreaQueries.useAreaQueryCache();
    return useCreateResidenceMutation({
      update: (cache, result) => {
        const data = TypeUtil.toNonNullable(result.data);
        const cacheData = areaQueryCache.read(cache);

        // クエリに対するキャッシュデータ書き換え
        cacheData.areas[0].residences.push(data.createResidence);

        areaQueryCache.write(cache, cacheData);
      },
    });
  };

  /** 住宅座標を更新 */
  static useUpdateResidence = () => {
    const areaQueryCache = AreaQueries.useAreaQueryCache();
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
          const cacheData = areaQueryCache.read(cache);

          // クエリに対するキャッシュデータ書き換え
          const outline = Enumerable.from(cacheData.areas[0].outlines)
            .selectMany((x) => x.points)
            .first((x) => x.id === variables.id);
          outline.latitude = data.updateResidence.latitude;
          outline.longitude = data.updateResidence.longitude;

          areaQueryCache.write(cache, cacheData);
        },
      });
    return result;
  };

  static useDeleteResidence = () => {
    const areaQueryCache = AreaQueries.useAreaQueryCache();
    const [deleteResidenceMutation] = useDeleteResidenceMutation();
    const resultFunction = async (variables: DeleteResidenceMutationVariables) => {
      return deleteResidenceMutation({
        variables: variables,
        update: (cache) => {
          const cacheData = areaQueryCache.read(cache);
          // クエリに対するキャッシュデータ書き換え
          const area = cacheData.areas[0];
          area.residences = area.residences.filter((x) => x.id !== variables.id);
          areaQueryCache.write(cache, cacheData);
        },
      });
    };
    return resultFunction;
  };

  /** アウトラインを生成し、キャッシュを更新 */
  static useCreateOutline = () => {
    const areaQueryCache = AreaQueries.useAreaQueryCache();
    return useCreateOutlineMutation({
      update: (cache, result) => {
        const data = TypeUtil.toNonNullable(result.data);
        const cacheData = areaQueryCache.read(cache);

        // クエリに対するキャッシュデータ書き換え
        const outlines = TypeUtil.toNonNullable(cacheData.areas[0].outlines);
        outlines.push(data.createOutline);

        areaQueryCache.write(cache, cacheData);
      },
    });
  };

  /** アウトラインを更新し、キャッシュを更新 */
  static useUpdateOutline = () => {
    const areaQueryCache = AreaQueries.useAreaQueryCache();

    // queries
    const routerParams = useRouterParams();
    const getAreaResult = useGetAreaQuery({
      variables: { organizationId: routerParams.getOrganizationId(), areaId: routerParams.getAreaId() },
      skip: !routerParams.hasOrganizationAndArea,
    });
    const area = getAreaResult.data?.areas[0];

    // mutations
    const [updateOutlineMutation] = useUpdateOutlineMutation();

    const resultFunction = async (variables: UpdateOutlineMutationVariables) => {
      const prevPoints = area?.outlines?.find((x) => x.id === variables.id)?.points ?? [];
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
              id: prevPoints.find((y) => y.order === x.order)?.id ?? -new Date().getDate(), // マイナスのID
              order: TypeUtil.toNonNullable(x.order),
              latitude: TypeUtil.toNonNullable(x.latitude),
              longitude: TypeUtil.toNonNullable(x.longitude),
            })),
          },
        },
        update: (cache, result) => {
          const data = TypeUtil.toNonNullable(result.data);
          const cacheData = areaQueryCache.read(cache);

          // クエリに対するキャッシュデータ書き換え
          const outline = TypeUtil.toNonNullable(cacheData.areas[0].outlines.find((x) => x.id === variables.id));
          outline.points = data.updateOutline.points;

          // InMemoryCache の設定で自動マージしています
          areaQueryCache.write(cache, cacheData);
        },
      });
    };
    return resultFunction;
  };

  /** アウトラインを削除し、キャッシュを更新 */
  static useDeleteOutline = () => {
    const areaQueryCache = AreaQueries.useAreaQueryCache();
    const [deleteOutlineMutation] = useDeleteOutlineMutation();

    const resultFunction = async (variables: DeleteOutlineMutationVariables) => {
      return deleteOutlineMutation({
        variables: variables,
        update: (cache) => {
          // const data = TypeUtil.toNonNullable(result.data);
          const cacheData = areaQueryCache.read(cache);

          // クエリに対するキャッシュデータ書き換え
          const area = cacheData.areas[0];
          area.outlines = area.outlines.filter((x) => x.id !== variables.id);

          areaQueryCache.write(cache, cacheData);

          // // キャッシュから削除
          // cache.evict({ id: cache.identify({ id: variables.id, __typename: 'Outline' }) });
          // cache.gc(); // 関連ポイントを削除
        },
      });
    };
    return resultFunction;
  };
}
