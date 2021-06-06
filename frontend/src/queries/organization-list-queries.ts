import {
  GetOrganizationsDocument,
  GetOrganizationsQuery,
  GetOrganizationsQueryVariables,
  useCreateOrganizationMutation,
} from '@/types/graphql';
import { TypeUtil } from '@/utils/type-helper';
import { ApolloCache, gql } from '@apollo/client';

export class OrganizationListQueries {
  /** キャッシュ更新用ヘルパー */
  private static useOrganizationQueryCache = () => {
    return {
      read: <T>(cache: ApolloCache<T>) => {
        let copiedData = TypeUtil.toNonNullable(
          cache.readQuery<GetOrganizationsQuery, GetOrganizationsQueryVariables>({
            query: GetOrganizationsDocument,
            variables: {},
          }),
        );
        copiedData = JSON.parse(JSON.stringify(copiedData)) as typeof copiedData;
        return copiedData;
      },
      write: <T, U>(cache: ApolloCache<T>, data: U) => {
        return cache.writeQuery<U, GetOrganizationsQueryVariables>({
          query: GetOrganizationsDocument,
          variables: {},
          data: data,
        });
      },
    };
  };

  static useCreateOrganization = () => {
    const userAreaQueryCache = OrganizationListQueries.useOrganizationQueryCache();
    return useCreateOrganizationMutation({
      update: (cache, result) => {
        const data = TypeUtil.toNonNullable(result.data);
        const cacheData = userAreaQueryCache.read(cache);

        // クエリに対するキャッシュデータ書き換え
        cacheData.organizations.push(data.createOrganization);

        userAreaQueryCache.write(cache, cacheData);
      },
    });
  };
}
