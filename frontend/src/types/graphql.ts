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

export type CreateOrganizationInput = {
  name?: Maybe<Scalars['String']>;
};

export type CreatePolygonInput = {
  points: Array<CreatePolygonPointInput>;
  areaId?: Maybe<Scalars['ID']>;
};

export type CreatePolygonPointInput = {
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
};

export type CreateResidenceInput = {
  areaId?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
};

export type CreateUserInput = {
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};


export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  deleteUser?: Maybe<Ability>;
  deleteRole?: Maybe<Role>;
  createOrganization: Organization;
  addTest: Scalars['Float'];
  createPolygon: Polygon;
  updatePolygon: Polygon;
  deletePolygon: Scalars['Boolean'];
  createResidence: Residence;
  updateResidence: Residence;
  deleteResidence: Scalars['Boolean'];
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


export type MutationCreateOrganizationArgs = {
  organization: CreateOrganizationInput;
};


export type MutationCreatePolygonArgs = {
  polygon: CreatePolygonInput;
};


export type MutationUpdatePolygonArgs = {
  polygon: UpdatePolygonInput;
};


export type MutationDeletePolygonArgs = {
  id: Scalars['ID'];
};


export type MutationCreateResidenceArgs = {
  residence: CreateResidenceInput;
};


export type MutationUpdateResidenceArgs = {
  residence: UpdateResidenceInput;
};


export type MutationDeleteResidenceArgs = {
  id: Scalars['ID'];
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
  order: Scalars['Float'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  polygon: Polygon;
};

export type Query = {
  __typename?: 'Query';
  currentUser: User;
  users: Array<User>;
  role?: Maybe<Role>;
  categories: Array<Role>;
  ability?: Maybe<Ability>;
  abilities: Array<Ability>;
  organizations: Array<Organization>;
  googleMapApiKey: Scalars['String'];
  getTest: Scalars['Float'];
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
  name: Scalars['String'];
  floor: Scalars['Float'];
  room: Scalars['Float'];
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

export type Subscription = {
  __typename?: 'Subscription';
  testAdded: Scalars['Float'];
};

export type UpdatePolygonInput = {
  id?: Maybe<Scalars['ID']>;
  points?: Maybe<Array<UpdatePolygonPointInput>>;
};

export type UpdatePolygonPointInput = {
  order?: Maybe<Scalars['Float']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
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

export type CreateOrganizationMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateOrganizationMutation = (
  { __typename?: 'Mutation' }
  & { createOrganization: (
    { __typename?: 'Organization' }
    & Pick<Organization, 'id' | 'name'>
  ) }
);

export type GetGoogleMapApiKeyQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGoogleMapApiKeyQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'googleMapApiKey'>
);

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

export type CreateUserMutationVariables = Exact<{
  user: CreateUserInput;
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
  ) }
);

export type TestAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type TestAddedSubscription = (
  { __typename?: 'Subscription' }
  & Pick<Subscription, 'testAdded'>
);

export type AddTestMutationVariables = Exact<{ [key: string]: never; }>;


export type AddTestMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addTest'>
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
          & Pick<PolygonPoint, 'id' | 'order' | 'latitude' | 'longitude'>
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

export type DeleteResidenceMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteResidenceMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteResidence'>
);

export type CreatePolygonMutationVariables = Exact<{
  areaId: Scalars['ID'];
  points: Array<CreatePolygonPointInput> | CreatePolygonPointInput;
}>;


export type CreatePolygonMutation = (
  { __typename?: 'Mutation' }
  & { createPolygon: (
    { __typename?: 'Polygon' }
    & Pick<Polygon, 'id'>
    & { points: Array<(
      { __typename?: 'PolygonPoint' }
      & Pick<PolygonPoint, 'id' | 'order' | 'latitude' | 'longitude'>
    )> }
  ) }
);

export type UpdatePolygonMutationVariables = Exact<{
  id: Scalars['ID'];
  points: Array<UpdatePolygonPointInput> | UpdatePolygonPointInput;
}>;


export type UpdatePolygonMutation = (
  { __typename?: 'Mutation' }
  & { updatePolygon: (
    { __typename?: 'Polygon' }
    & Pick<Polygon, 'id'>
    & { points: Array<(
      { __typename?: 'PolygonPoint' }
      & Pick<PolygonPoint, 'id' | 'order' | 'latitude' | 'longitude'>
    )> }
  ) }
);

export type DeletePolygonMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeletePolygonMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePolygon'>
);

export type GetOrganizationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrganizationsQuery = (
  { __typename?: 'Query' }
  & { organizations: Array<(
    { __typename?: 'Organization' }
    & Pick<Organization, 'id' | 'name'>
  )> }
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

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'name'>
    & { roledUsers: Array<(
      { __typename?: 'RoledUser' }
      & { organization: (
        { __typename?: 'Organization' }
        & Pick<Organization, 'name'>
      ), roles: Array<(
        { __typename?: 'Role' }
        & Pick<Role, 'id' | 'name'>
        & { abilities: Array<(
          { __typename?: 'Ability' }
          & Pick<Ability, 'id' | 'name'>
        )> }
      )> }
    )> }
  ) }
);


export const CreateOrganizationDocument = gql`
    mutation createOrganization($name: String!) {
  createOrganization(organization: {name: $name}) {
    id
    name
  }
}
    `;
export type CreateOrganizationMutationFn = Apollo.MutationFunction<CreateOrganizationMutation, CreateOrganizationMutationVariables>;

/**
 * __useCreateOrganizationMutation__
 *
 * To run a mutation, you first call `useCreateOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrganizationMutation, { data, loading, error }] = useCreateOrganizationMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrganizationMutation, CreateOrganizationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrganizationMutation, CreateOrganizationMutationVariables>(CreateOrganizationDocument, options);
      }
export type CreateOrganizationMutationHookResult = ReturnType<typeof useCreateOrganizationMutation>;
export type CreateOrganizationMutationResult = Apollo.MutationResult<CreateOrganizationMutation>;
export type CreateOrganizationMutationOptions = Apollo.BaseMutationOptions<CreateOrganizationMutation, CreateOrganizationMutationVariables>;
export const GetGoogleMapApiKeyDocument = gql`
    query getGoogleMapApiKey {
  googleMapApiKey
}
    `;

/**
 * __useGetGoogleMapApiKeyQuery__
 *
 * To run a query within a React component, call `useGetGoogleMapApiKeyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGoogleMapApiKeyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGoogleMapApiKeyQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetGoogleMapApiKeyQuery(baseOptions?: Apollo.QueryHookOptions<GetGoogleMapApiKeyQuery, GetGoogleMapApiKeyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGoogleMapApiKeyQuery, GetGoogleMapApiKeyQueryVariables>(GetGoogleMapApiKeyDocument, options);
      }
export function useGetGoogleMapApiKeyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGoogleMapApiKeyQuery, GetGoogleMapApiKeyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGoogleMapApiKeyQuery, GetGoogleMapApiKeyQueryVariables>(GetGoogleMapApiKeyDocument, options);
        }
export type GetGoogleMapApiKeyQueryHookResult = ReturnType<typeof useGetGoogleMapApiKeyQuery>;
export type GetGoogleMapApiKeyLazyQueryHookResult = ReturnType<typeof useGetGoogleMapApiKeyLazyQuery>;
export type GetGoogleMapApiKeyQueryResult = Apollo.QueryResult<GetGoogleMapApiKeyQuery, GetGoogleMapApiKeyQueryVariables>;
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
export const CreateUserDocument = gql`
    mutation createUser($user: CreateUserInput!) {
  createUser(user: $user) {
    id
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const TestAddedDocument = gql`
    subscription testAdded {
  testAdded
}
    `;

/**
 * __useTestAddedSubscription__
 *
 * To run a query within a React component, call `useTestAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTestAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestAddedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useTestAddedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<TestAddedSubscription, TestAddedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<TestAddedSubscription, TestAddedSubscriptionVariables>(TestAddedDocument, options);
      }
export type TestAddedSubscriptionHookResult = ReturnType<typeof useTestAddedSubscription>;
export type TestAddedSubscriptionResult = Apollo.SubscriptionResult<TestAddedSubscription>;
export const AddTestDocument = gql`
    mutation addTest {
  addTest
}
    `;
export type AddTestMutationFn = Apollo.MutationFunction<AddTestMutation, AddTestMutationVariables>;

/**
 * __useAddTestMutation__
 *
 * To run a mutation, you first call `useAddTestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTestMutation, { data, loading, error }] = useAddTestMutation({
 *   variables: {
 *   },
 * });
 */
export function useAddTestMutation(baseOptions?: Apollo.MutationHookOptions<AddTestMutation, AddTestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTestMutation, AddTestMutationVariables>(AddTestDocument, options);
      }
export type AddTestMutationHookResult = ReturnType<typeof useAddTestMutation>;
export type AddTestMutationResult = Apollo.MutationResult<AddTestMutation>;
export type AddTestMutationOptions = Apollo.BaseMutationOptions<AddTestMutation, AddTestMutationVariables>;
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
          order
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
export const DeleteResidenceDocument = gql`
    mutation deleteResidence($id: ID!) {
  deleteResidence(id: $id)
}
    `;
export type DeleteResidenceMutationFn = Apollo.MutationFunction<DeleteResidenceMutation, DeleteResidenceMutationVariables>;

/**
 * __useDeleteResidenceMutation__
 *
 * To run a mutation, you first call `useDeleteResidenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteResidenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteResidenceMutation, { data, loading, error }] = useDeleteResidenceMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteResidenceMutation(baseOptions?: Apollo.MutationHookOptions<DeleteResidenceMutation, DeleteResidenceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteResidenceMutation, DeleteResidenceMutationVariables>(DeleteResidenceDocument, options);
      }
export type DeleteResidenceMutationHookResult = ReturnType<typeof useDeleteResidenceMutation>;
export type DeleteResidenceMutationResult = Apollo.MutationResult<DeleteResidenceMutation>;
export type DeleteResidenceMutationOptions = Apollo.BaseMutationOptions<DeleteResidenceMutation, DeleteResidenceMutationVariables>;
export const CreatePolygonDocument = gql`
    mutation createPolygon($areaId: ID!, $points: [CreatePolygonPointInput!]!) {
  createPolygon(polygon: {areaId: $areaId, points: $points}) {
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
export type CreatePolygonMutationFn = Apollo.MutationFunction<CreatePolygonMutation, CreatePolygonMutationVariables>;

/**
 * __useCreatePolygonMutation__
 *
 * To run a mutation, you first call `useCreatePolygonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePolygonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPolygonMutation, { data, loading, error }] = useCreatePolygonMutation({
 *   variables: {
 *      areaId: // value for 'areaId'
 *      points: // value for 'points'
 *   },
 * });
 */
export function useCreatePolygonMutation(baseOptions?: Apollo.MutationHookOptions<CreatePolygonMutation, CreatePolygonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePolygonMutation, CreatePolygonMutationVariables>(CreatePolygonDocument, options);
      }
export type CreatePolygonMutationHookResult = ReturnType<typeof useCreatePolygonMutation>;
export type CreatePolygonMutationResult = Apollo.MutationResult<CreatePolygonMutation>;
export type CreatePolygonMutationOptions = Apollo.BaseMutationOptions<CreatePolygonMutation, CreatePolygonMutationVariables>;
export const UpdatePolygonDocument = gql`
    mutation updatePolygon($id: ID!, $points: [UpdatePolygonPointInput!]!) {
  updatePolygon(polygon: {id: $id, points: $points}) {
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
export type UpdatePolygonMutationFn = Apollo.MutationFunction<UpdatePolygonMutation, UpdatePolygonMutationVariables>;

/**
 * __useUpdatePolygonMutation__
 *
 * To run a mutation, you first call `useUpdatePolygonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePolygonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePolygonMutation, { data, loading, error }] = useUpdatePolygonMutation({
 *   variables: {
 *      id: // value for 'id'
 *      points: // value for 'points'
 *   },
 * });
 */
export function useUpdatePolygonMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePolygonMutation, UpdatePolygonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePolygonMutation, UpdatePolygonMutationVariables>(UpdatePolygonDocument, options);
      }
export type UpdatePolygonMutationHookResult = ReturnType<typeof useUpdatePolygonMutation>;
export type UpdatePolygonMutationResult = Apollo.MutationResult<UpdatePolygonMutation>;
export type UpdatePolygonMutationOptions = Apollo.BaseMutationOptions<UpdatePolygonMutation, UpdatePolygonMutationVariables>;
export const DeletePolygonDocument = gql`
    mutation deletePolygon($id: ID!) {
  deletePolygon(id: $id)
}
    `;
export type DeletePolygonMutationFn = Apollo.MutationFunction<DeletePolygonMutation, DeletePolygonMutationVariables>;

/**
 * __useDeletePolygonMutation__
 *
 * To run a mutation, you first call `useDeletePolygonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePolygonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePolygonMutation, { data, loading, error }] = useDeletePolygonMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePolygonMutation(baseOptions?: Apollo.MutationHookOptions<DeletePolygonMutation, DeletePolygonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePolygonMutation, DeletePolygonMutationVariables>(DeletePolygonDocument, options);
      }
export type DeletePolygonMutationHookResult = ReturnType<typeof useDeletePolygonMutation>;
export type DeletePolygonMutationResult = Apollo.MutationResult<DeletePolygonMutation>;
export type DeletePolygonMutationOptions = Apollo.BaseMutationOptions<DeletePolygonMutation, DeletePolygonMutationVariables>;
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
export const GetCurrentUserDocument = gql`
    query getCurrentUser {
  currentUser {
    id
    username
    name
    roledUsers {
      organization {
        name
      }
      roles {
        id
        name
        abilities {
          id
          name
        }
      }
    }
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;