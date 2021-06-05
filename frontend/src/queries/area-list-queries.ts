import {
  GetOrganizationsDocument,
  GetOrganizationsQuery,
  GetOrganizationsQueryVariables,
  GetUserAreasDocument,
  GetUserAreasQuery,
  GetUserAreasQueryVariables,
  useCreateAreaMutation,
  useCreateOrganizationMutation,
} from '@/types/graphql';
import { TypeUtil } from '@/utils/type-helper';
import { ApolloCache, gql } from '@apollo/client';

// export class AreaListQueries {
//   /** キャッシュ更新用ヘルパー */
//   private static useUserAreasQueryCache = () => {
//     return {
//       read: <T>(cache: ApolloCache<T>) => {
//         let copiedData = TypeUtil.toNonNullable(
//           cache.readQuery<GetUserAreasQuery, GetUserAreasQueryVariables>({
//             query: GetUserAreasDocument,
//             variables: {
//               organizationId,
//             },
//           }),
//         );
//         copiedData = JSON.parse(JSON.stringify(copiedData)) as typeof copiedData;
//         return copiedData;
//       },
//       write: <T, U>(cache: ApolloCache<T>, data: U) => {
//         return cache.writeQuery<U, GetUserAreasQueryVariables>({
//           query: GetOrganizationsDocument,
//           variables: {
//             organizationId,
//           },
//           data: data,
//         });
//       },
//     };
//   };

//   static useCreateOrganization = () => {
//     const userAreaQueryCache = AreaListQueries.useUserAreasQueryCache();
//     return useCreateAreaMutation({
//       update: (cache, result) => {
//         const data = TypeUtil.toNonNullable(result.data);
//         const cacheData = userAreaQueryCache.read(cache);

//         // クエリに対するキャッシュデータ書き換え
//         cacheData.userAreas.push(data.createArea);

//         userAreaQueryCache.write(cache, cacheData);
//       },
//     });
//   };
// }

// ----------------------------------------gql----------------------------------------

gql`
  query getUserAreas($organizationId: Int!) {
    userAreas(organizationId: $organizationId) {
      id
      area {
        id
        name
        description
      }
    }
  }
`;

// gql`
//   query GetOrganizations {
//     organizations {
//       id
//       name
//     }
//   }
// `;

// gql`
//   mutation createOrganization($name: String!) {
//     createOrganization(organization: { name: $name }) {
//       id
//       name
//     }
//   }
// `;

// gql`
//   query getUserAreas($organizationId: Int!) {
//     userAreas(organizationId: $organizationId) {
//       id
//       area {
//         id
//         name
//         description
//       }
//     }
//   }
// `;
