import { GetAreasDocument, GetAreasQuery, GetAreasQueryVariables, useCreateAreaMutation } from '@/types/graphql';
import { TypeUtil } from '@/utils/type-helper';
import { useRouterParams } from '@/utils/use-router-params';
import { ApolloCache } from '@apollo/client';

export class AreaListQueries {
  /** キャッシュ更新用ヘルパー */
  private static useAreaQueryCache = () => {
    const routerParams = useRouterParams();
    return {
      read: <T>(cache: ApolloCache<T>) => {
        let copiedData = TypeUtil.toNonNullable(
          cache.readQuery<GetAreasQuery, GetAreasQueryVariables>({
            query: GetAreasDocument,
            variables: {
              organizationId: routerParams.getOrganizationId(),
            },
          }),
        );
        copiedData = JSON.parse(JSON.stringify(copiedData)) as typeof copiedData;
        return copiedData;
      },
      write: <T, U>(cache: ApolloCache<T>, data: U) => {
        return cache.writeQuery<U, GetAreasQueryVariables>({
          query: GetAreasDocument,
          variables: {
            organizationId: routerParams.getOrganizationId(),
          },
          data: data,
        });
      },
    };
  };

  static useCreateArea = () => {
    const userAreaQueryCache = AreaListQueries.useAreaQueryCache();
    return useCreateAreaMutation({
      update: (cache, result) => {
        const data = TypeUtil.toNonNullable(result.data);
        const cacheData = userAreaQueryCache.read(cache);

        // クエリに対するキャッシュデータ書き換え
        cacheData.areas.push(data.createArea);

        userAreaQueryCache.write(cache, cacheData);
      },
    });
  };
}
