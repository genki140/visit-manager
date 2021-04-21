import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
};

export type Ability = {
  __typename?: 'Ability';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Area = {
  __typename?: 'Area';
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  organization: Organization;
  userAreas: Array<UserArea>;
  residences: Array<Residence>;
  polygons: Array<Polygon>;
};

export type CreateResidenceInput = {
  areaId?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
};

export type CreateUserInput = {
  userId?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};


export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  deleteUser?: Maybe<Ability>;
  deleteRole?: Maybe<Role>;
  createResidence: Residence;
  updateResidence: Residence;
};


export type MutationCreateUserArgs = {
  user: CreateUserInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteRoleArgs = {
  id: Scalars['ID'];
};


export type MutationCreateResidenceArgs = {
  residence: CreateResidenceInput;
};


export type MutationUpdateResidenceArgs = {
  residence: UpdateResidenceInput;
};

export type Organization = {
  __typename?: 'Organization';
  id: Scalars['ID'];
  name: Scalars['String'];
  roledUsers: Array<RoledUser>;
};

export type Polygon = {
  __typename?: 'Polygon';
  id: Scalars['ID'];
  points: Array<PolygonPoint>;
  area: Area;
};

export type PolygonPoint = {
  __typename?: 'PolygonPoint';
  id: Scalars['ID'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  polygon: Polygon;
};

export type Query = {
  __typename?: 'Query';
  users: Array<User>;
  role?: Maybe<Role>;
  categories: Array<Role>;
  ability?: Maybe<Ability>;
  abilities: Array<Ability>;
  organizations: Array<Organization>;
  areas: Array<Area>;
  userAreas: Array<UserArea>;
};


export type QueryUsersArgs = {
  ids?: Maybe<Array<Scalars['ID']>>;
  organizationId: Scalars['ID'];
};


export type QueryRoleArgs = {
  id: Scalars['ID'];
};


export type QueryAbilityArgs = {
  id: Scalars['ID'];
};


export type QueryAreasArgs = {
  organizationId: Scalars['ID'];
};


export type QueryUserAreasArgs = {
  ids?: Maybe<Array<Scalars['ID']>>;
  organizationId: Scalars['ID'];
};

export type Residence = {
  __typename?: 'Residence';
  id: Scalars['ID'];
  name: Scalars['String'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  residents: Array<Resident>;
  area: Area;
};

export type Resident = {
  __typename?: 'Resident';
  id: Scalars['ID'];
  room: Scalars['String'];
  floor: Scalars['Float'];
  residence: Residence;
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['ID'];
  name: Scalars['String'];
  roledUser: Array<RoledUser>;
  abilities: Array<Ability>;
};

export type RoledUser = {
  __typename?: 'RoledUser';
  id: Scalars['ID'];
  organization: Organization;
  user: User;
  roles: Array<Role>;
};

export type UpdateResidenceInput = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  createdAt: Scalars['Date'];
  username: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
  roledUsers: Array<RoledUser>;
  userAreas: Array<UserArea>;
};

export type UserArea = {
  __typename?: 'UserArea';
  id: Scalars['ID'];
  user: User;
  area: Area;
};

export type GetAreasQueryVariables = Exact<{
  organizationId: Scalars['ID'];
}>;


export type GetAreasQuery = (
  { __typename?: 'Query' }
  & { areas: Array<(
    { __typename?: 'Area' }
    & Pick<Area, 'id' | 'name'>
  )> }
);

export type GetUserAreaQueryVariables = Exact<{
  organizationId: Scalars['ID'];
  areaId: Scalars['ID'];
}>;


export type GetUserAreaQuery = (
  { __typename?: 'Query' }
  & { userAreas: Array<(
    { __typename?: 'UserArea' }
    & { area: (
      { __typename?: 'Area' }
      & Pick<Area, 'id' | 'name' | 'description'>
      & { residences: Array<(
        { __typename?: 'Residence' }
        & Pick<Residence, 'id' | 'name' | 'latitude' | 'longitude'>
        & { residents: Array<(
          { __typename?: 'Resident' }
          & Pick<Resident, 'id' | 'room' | 'floor'>
        )> }
      )>, polygons: Array<(
        { __typename?: 'Polygon' }
        & Pick<Polygon, 'id'>
        & { points: Array<(
          { __typename?: 'PolygonPoint' }
          & Pick<PolygonPoint, 'id' | 'latitude' | 'longitude'>
        )> }
      )> }
    ) }
  )> }
);

export type CreateResidenceMutationVariables = Exact<{
  areaId: Scalars['ID'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
}>;


export type CreateResidenceMutation = (
  { __typename?: 'Mutation' }
  & { createResidence: (
    { __typename?: 'Residence' }
    & Pick<Residence, 'id' | 'latitude' | 'longitude' | 'name'>
    & { residents: Array<(
      { __typename?: 'Resident' }
      & Pick<Resident, 'id' | 'room' | 'floor'>
    )> }
  ) }
);

export type UpdateResidenceMutationVariables = Exact<{
  id: Scalars['ID'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
}>;


export type UpdateResidenceMutation = (
  { __typename?: 'Mutation' }
  & { updateResidence: (
    { __typename?: 'Residence' }
    & Pick<Residence, 'id' | 'latitude' | 'longitude' | 'name'>
    & { residents: Array<(
      { __typename?: 'Resident' }
      & Pick<Resident, 'id' | 'room' | 'floor'>
    )> }
  ) }
);

export type GetUserAreasQueryVariables = Exact<{
  organizationId: Scalars['ID'];
}>;


export type GetUserAreasQuery = (
  { __typename?: 'Query' }
  & { userAreas: Array<(
    { __typename?: 'UserArea' }
    & Pick<UserArea, 'id'>
    & { area: (
      { __typename?: 'Area' }
      & Pick<Area, 'name'>
    ) }
  )> }
);

export type GetOrganizationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrganizationsQuery = (
  { __typename?: 'Query' }
  & { organizations: Array<(
    { __typename?: 'Organization' }
    & Pick<Organization, 'id' | 'name'>
  )> }
);


export const GetAreasDocument = gql`
    query getAreas($organizationId: ID!) {
  areas(organizationId: $organizationId) {
    id
    name
  }
}
    `;

/**
 * __useGetAreasQuery__
 *
 * To run a query within a React component, call `useGetAreasQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAreasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAreasQuery({
 *   variables: {
 *      organizationId: // value for 'organizationId'
 *   },
 * });
 */
export function useGetAreasQuery(baseOptions: Apollo.QueryHookOptions<GetAreasQuery, GetAreasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAreasQuery, GetAreasQueryVariables>(GetAreasDocument, options);
      }
export function useGetAreasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAreasQuery, GetAreasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAreasQuery, GetAreasQueryVariables>(GetAreasDocument, options);
        }
export type GetAreasQueryHookResult = ReturnType<typeof useGetAreasQuery>;
export type GetAreasLazyQueryHookResult = ReturnType<typeof useGetAreasLazyQuery>;
export type GetAreasQueryResult = Apollo.QueryResult<GetAreasQuery, GetAreasQueryVariables>;
export const GetUserAreaDocument = gql`
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

/**
 * __useGetUserAreaQuery__
 *
 * To run a query within a React component, call `useGetUserAreaQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserAreaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserAreaQuery({
 *   variables: {
 *      organizationId: // value for 'organizationId'
 *      areaId: // value for 'areaId'
 *   },
 * });
 */
export function useGetUserAreaQuery(baseOptions: Apollo.QueryHookOptions<GetUserAreaQuery, GetUserAreaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserAreaQuery, GetUserAreaQueryVariables>(GetUserAreaDocument, options);
      }
export function useGetUserAreaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserAreaQuery, GetUserAreaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserAreaQuery, GetUserAreaQueryVariables>(GetUserAreaDocument, options);
        }
export type GetUserAreaQueryHookResult = ReturnType<typeof useGetUserAreaQuery>;
export type GetUserAreaLazyQueryHookResult = ReturnType<typeof useGetUserAreaLazyQuery>;
export type GetUserAreaQueryResult = Apollo.QueryResult<GetUserAreaQuery, GetUserAreaQueryVariables>;
export const CreateResidenceDocument = gql`
    mutation createResidence($areaId: ID!, $latitude: Float!, $longitude: Float!) {
  createResidence(
    residence: {areaId: $areaId, name: "", latitude: $latitude, longitude: $longitude}
  ) {
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
export type CreateResidenceMutationFn = Apollo.MutationFunction<CreateResidenceMutation, CreateResidenceMutationVariables>;

/**
 * __useCreateResidenceMutation__
 *
 * To run a mutation, you first call `useCreateResidenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateResidenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createResidenceMutation, { data, loading, error }] = useCreateResidenceMutation({
 *   variables: {
 *      areaId: // value for 'areaId'
 *      latitude: // value for 'latitude'
 *      longitude: // value for 'longitude'
 *   },
 * });
 */
export function useCreateResidenceMutation(baseOptions?: Apollo.MutationHookOptions<CreateResidenceMutation, CreateResidenceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateResidenceMutation, CreateResidenceMutationVariables>(CreateResidenceDocument, options);
      }
export type CreateResidenceMutationHookResult = ReturnType<typeof useCreateResidenceMutation>;
export type CreateResidenceMutationResult = Apollo.MutationResult<CreateResidenceMutation>;
export type CreateResidenceMutationOptions = Apollo.BaseMutationOptions<CreateResidenceMutation, CreateResidenceMutationVariables>;
export const UpdateResidenceDocument = gql`
    mutation updateResidence($id: ID!, $latitude: Float!, $longitude: Float!) {
  updateResidence(
    residence: {id: $id, name: "", latitude: $latitude, longitude: $longitude}
  ) {
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
export type UpdateResidenceMutationFn = Apollo.MutationFunction<UpdateResidenceMutation, UpdateResidenceMutationVariables>;

/**
 * __useUpdateResidenceMutation__
 *
 * To run a mutation, you first call `useUpdateResidenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateResidenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateResidenceMutation, { data, loading, error }] = useUpdateResidenceMutation({
 *   variables: {
 *      id: // value for 'id'
 *      latitude: // value for 'latitude'
 *      longitude: // value for 'longitude'
 *   },
 * });
 */
export function useUpdateResidenceMutation(baseOptions?: Apollo.MutationHookOptions<UpdateResidenceMutation, UpdateResidenceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateResidenceMutation, UpdateResidenceMutationVariables>(UpdateResidenceDocument, options);
      }
export type UpdateResidenceMutationHookResult = ReturnType<typeof useUpdateResidenceMutation>;
export type UpdateResidenceMutationResult = Apollo.MutationResult<UpdateResidenceMutation>;
export type UpdateResidenceMutationOptions = Apollo.BaseMutationOptions<UpdateResidenceMutation, UpdateResidenceMutationVariables>;
export const GetUserAreasDocument = gql`
    query getUserAreas($organizationId: ID!) {
  userAreas(organizationId: $organizationId) {
    id
    area {
      name
    }
  }
}
    `;

/**
 * __useGetUserAreasQuery__
 *
 * To run a query within a React component, call `useGetUserAreasQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserAreasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserAreasQuery({
 *   variables: {
 *      organizationId: // value for 'organizationId'
 *   },
 * });
 */
export function useGetUserAreasQuery(baseOptions: Apollo.QueryHookOptions<GetUserAreasQuery, GetUserAreasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserAreasQuery, GetUserAreasQueryVariables>(GetUserAreasDocument, options);
      }
export function useGetUserAreasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserAreasQuery, GetUserAreasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserAreasQuery, GetUserAreasQueryVariables>(GetUserAreasDocument, options);
        }
export type GetUserAreasQueryHookResult = ReturnType<typeof useGetUserAreasQuery>;
export type GetUserAreasLazyQueryHookResult = ReturnType<typeof useGetUserAreasLazyQuery>;
export type GetUserAreasQueryResult = Apollo.QueryResult<GetUserAreasQuery, GetUserAreasQueryVariables>;
export const GetOrganizationsDocument = gql`
    query GetOrganizations {
  organizations {
    id
    name
  }
}
    `;

/**
 * __useGetOrganizationsQuery__
 *
 * To run a query within a React component, call `useGetOrganizationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrganizationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrganizationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOrganizationsQuery(baseOptions?: Apollo.QueryHookOptions<GetOrganizationsQuery, GetOrganizationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrganizationsQuery, GetOrganizationsQueryVariables>(GetOrganizationsDocument, options);
      }
export function useGetOrganizationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrganizationsQuery, GetOrganizationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrganizationsQuery, GetOrganizationsQueryVariables>(GetOrganizationsDocument, options);
        }
export type GetOrganizationsQueryHookResult = ReturnType<typeof useGetOrganizationsQuery>;
export type GetOrganizationsLazyQueryHookResult = ReturnType<typeof useGetOrganizationsLazyQuery>;
export type GetOrganizationsQueryResult = Apollo.QueryResult<GetOrganizationsQuery, GetOrganizationsQueryVariables>;