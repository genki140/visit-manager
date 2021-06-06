import {
  GetUserOrganizationsDocument,
  GetUserOrganizationsQuery,
  GetUserOrganizationsQueryVariables,
  UpdateUserOrganizationMutationVariables,
  useCreateUserOrganizationMutation,
  useUpdateUserOrganizationMutation,
} from '@/types/graphql';
import { TypeUtil } from '@/utils/type-helper';
import { ApolloCache } from '@apollo/client';

export class OrganizationListQueries {
  /** キャッシュ更新用ヘルパー */
  private static useUserOrganizationsQueryCache = () => {
    return {
      read: <T>(cache: ApolloCache<T>) => {
        let copiedData = TypeUtil.toNonNullable(
          cache.readQuery<GetUserOrganizationsQuery, GetUserOrganizationsQueryVariables>({
            query: GetUserOrganizationsDocument,
            variables: {},
          }),
        );
        copiedData = JSON.parse(JSON.stringify(copiedData)) as typeof copiedData;
        return copiedData;
      },
      write: <T, U>(cache: ApolloCache<T>, data: U) => {
        return cache.writeQuery<U, GetUserOrganizationsQueryVariables>({
          query: GetUserOrganizationsDocument,
          variables: {},
          data: data,
        });
      },
    };
  };

  static useCreateUserOrganization = () => {
    const organizationQueryCache = OrganizationListQueries.useUserOrganizationsQueryCache();
    return useCreateUserOrganizationMutation({
      update: (cache, result) => {
        const data = TypeUtil.toNonNullable(result.data);
        const cacheData = organizationQueryCache.read(cache);

        // クエリに対するキャッシュデータ書き換え
        cacheData.userOrganizations.push(data.createUserOrganization);

        organizationQueryCache.write(cache, cacheData);
      },
    });
  };

  static useUpdateUserOrganization = () => {
    const organizationsQueryCache = OrganizationListQueries.useUserOrganizationsQueryCache();
    const [updateUserOrganization] = useUpdateUserOrganizationMutation();
    const result = (variables: UpdateUserOrganizationMutationVariables) =>
      updateUserOrganization({
        variables: variables,
        optimisticResponse: {
          __typename: 'Mutation',
          updateUserOrganization: {
            __typename: 'UserOrganization',
            id: variables.id,
            order: variables.order,
          },
        },
        // update: (cache, result) => {
        //   const data = TypeUtil.toNonNullable(result.data);
        //   const cacheData = organizationsQueryCache.read(cache);

        //   // cacheData.organizations.find((x) => x.id == data.updateUserOrganization.id)?.order =
        //   //   data.updateUserOrganization.order;

        //   organizationsQueryCache.write(cache, cacheData);
        // },
      });
    return result;
  };
}
