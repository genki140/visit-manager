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
  organizationId: Scalars['Float'];
  userAreas: Array<UserArea>;
  residences: Array<Residence>;
  outlines: Array<Outline>;
};

export type CreateAreaInput = {
  organizationId?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type CreateOrganizationInput = {
  name?: Maybe<Scalars['String']>;
};

export type CreateOutlineInput = {
  points?: Maybe<Array<CreateOutlinePointInput>>;
  areaId: Scalars['ID'];
};

export type CreateOutlinePointInput = {
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
  deleteUser?: Maybe<User>;
  createOrganization: Organization;
  addTest: Scalars['Float'];
  createArea: Area;
  createOutline: Outline;
  updateOutline: Outline;
  deleteOutline: Scalars['Boolean'];
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


export type MutationCreateOrganizationArgs = {
  organization: CreateOrganizationInput;
};


export type MutationCreateAreaArgs = {
  area: CreateAreaInput;
};


export type MutationCreateOutlineArgs = {
  outline: CreateOutlineInput;
};


export type MutationUpdateOutlineArgs = {
  outline: UpdateOutlineInput;
};


export type MutationDeleteOutlineArgs = {
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
  userOrganizations: Array<UserOrganization>;
};

export type Outline = {
  __typename?: 'Outline';
  id: Scalars['ID'];
  points: Array<OutlinePoint>;
  area: Area;
};

export type OutlinePoint = {
  __typename?: 'OutlinePoint';
  id: Scalars['ID'];
  order: Scalars['Float'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  outline: Outline;
};

export type Query = {
  __typename?: 'Query';
  organizations: Array<Organization>;
  googleMapApiKey: Scalars['String'];
  getTest: Scalars['Float'];
  userAreas: Array<UserArea>;
};


export type QueryUserAreasArgs = {
  ids?: Maybe<Array<Scalars['Int']>>;
  organizationId: Scalars['Int'];
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
  userOrganization: Array<UserOrganization>;
  abilities: Array<Ability>;
};

export type Subscription = {
  __typename?: 'Subscription';
  testAdded: Scalars['Float'];
};

export type UpdateOutlineInput = {
  id?: Maybe<Scalars['ID']>;
  points?: Maybe<Array<UpdateOutlinePointInput>>;
};

export type UpdateOutlinePointInput = {
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
  userOrganizations: Array<UserOrganization>;
  userAreas: Array<UserArea>;
};

export type UserArea = {
  __typename?: 'UserArea';
  id: Scalars['ID'];
  user: User;
  area: Area;
};

export type UserOrganization = {
  __typename?: 'UserOrganization';
  id: Scalars['ID'];
  organization: Organization;
  user: User;
  roles: Array<Role>;
};

export type CreateAreaMutationVariables = Exact<{
  organizationId: Scalars['Int'];
  name: Scalars['String'];
  description: Scalars['String'];
}>;


export type CreateAreaMutation = (
  { __typename?: 'Mutation' }
  & { createArea: (
    { __typename?: 'Area' }
    & Pick<Area, 'id' | 'name'>
  ) }
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

export type GetGoogleMapApiKeyQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGoogleMapApiKeyQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'googleMapApiKey'>
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

export type GetUserAreasQueryVariables = Exact<{
  organizationId: Scalars['Int'];
}>;


export type GetUserAreasQuery = (
  { __typename?: 'Query' }
  & { userAreas: Array<(
    { __typename?: 'UserArea' }
    & Pick<UserArea, 'id'>
    & { area: (
      { __typename?: 'Area' }
      & Pick<Area, 'id' | 'name' | 'description'>
    ) }
  )> }
);

export type GetUserAreaQueryVariables = Exact<{
  organizationId: Scalars['Int'];
  areaId: Scalars['Int'];
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
      )>, outlines: Array<(
        { __typename?: 'Outline' }
        & Pick<Outline, 'id'>
        & { points: Array<(
          { __typename?: 'OutlinePoint' }
          & Pick<OutlinePoint, 'id' | 'order' | 'latitude' | 'longitude'>
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

export type CreateOutlineMutationVariables = Exact<{
  areaId: Scalars['ID'];
  points: Array<CreateOutlinePointInput> | CreateOutlinePointInput;
}>;


export type CreateOutlineMutation = (
  { __typename?: 'Mutation' }
  & { createOutline: (
    { __typename?: 'Outline' }
    & Pick<Outline, 'id'>
    & { points: Array<(
      { __typename?: 'OutlinePoint' }
      & Pick<OutlinePoint, 'id' | 'order' | 'latitude' | 'longitude'>
    )> }
  ) }
);

export type UpdateOutlineMutationVariables = Exact<{
  id: Scalars['ID'];
  points: Array<UpdateOutlinePointInput> | UpdateOutlinePointInput;
}>;


export type UpdateOutlineMutation = (
  { __typename?: 'Mutation' }
  & { updateOutline: (
    { __typename?: 'Outline' }
    & Pick<Outline, 'id'>
    & { points: Array<(
      { __typename?: 'OutlinePoint' }
      & Pick<OutlinePoint, 'id' | 'order' | 'latitude' | 'longitude'>
    )> }
  ) }
);

export type DeleteOutlineMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteOutlineMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteOutline'>
);

export type GetOrganizationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrganizationsQuery = (
  { __typename?: 'Query' }
  & { organizations: Array<(
    { __typename?: 'Organization' }
    & Pick<Organization, 'id' | 'name'>
  )> }
);

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


export const CreateAreaDocument = gql`
    mutation createArea($organizationId: Int!, $name: String!, $description: String!) {
  createArea(
    area: {organizationId: $organizationId, name: $name, description: $description}
  ) {
    id
    name
  }
}
    `;
export type CreateAreaMutationFn = Apollo.MutationFunction<CreateAreaMutation, CreateAreaMutationVariables>;

/**
 * __useCreateAreaMutation__
 *
 * To run a mutation, you first call `useCreateAreaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAreaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAreaMutation, { data, loading, error }] = useCreateAreaMutation({
 *   variables: {
 *      organizationId: // value for 'organizationId'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateAreaMutation(baseOptions?: Apollo.MutationHookOptions<CreateAreaMutation, CreateAreaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAreaMutation, CreateAreaMutationVariables>(CreateAreaDocument, options);
      }
export type CreateAreaMutationHookResult = ReturnType<typeof useCreateAreaMutation>;
export type CreateAreaMutationResult = Apollo.MutationResult<CreateAreaMutation>;
export type CreateAreaMutationOptions = Apollo.BaseMutationOptions<CreateAreaMutation, CreateAreaMutationVariables>;
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
export const GetUserAreasDocument = gql`
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
export const GetUserAreaDocument = gql`
    query getUserArea($organizationId: Int!, $areaId: Int!) {
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
export const CreateOutlineDocument = gql`
    mutation createOutline($areaId: ID!, $points: [CreateOutlinePointInput!]!) {
  createOutline(outline: {areaId: $areaId, points: $points}) {
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
export type CreateOutlineMutationFn = Apollo.MutationFunction<CreateOutlineMutation, CreateOutlineMutationVariables>;

/**
 * __useCreateOutlineMutation__
 *
 * To run a mutation, you first call `useCreateOutlineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOutlineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOutlineMutation, { data, loading, error }] = useCreateOutlineMutation({
 *   variables: {
 *      areaId: // value for 'areaId'
 *      points: // value for 'points'
 *   },
 * });
 */
export function useCreateOutlineMutation(baseOptions?: Apollo.MutationHookOptions<CreateOutlineMutation, CreateOutlineMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOutlineMutation, CreateOutlineMutationVariables>(CreateOutlineDocument, options);
      }
export type CreateOutlineMutationHookResult = ReturnType<typeof useCreateOutlineMutation>;
export type CreateOutlineMutationResult = Apollo.MutationResult<CreateOutlineMutation>;
export type CreateOutlineMutationOptions = Apollo.BaseMutationOptions<CreateOutlineMutation, CreateOutlineMutationVariables>;
export const UpdateOutlineDocument = gql`
    mutation updateOutline($id: ID!, $points: [UpdateOutlinePointInput!]!) {
  updateOutline(outline: {id: $id, points: $points}) {
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
export type UpdateOutlineMutationFn = Apollo.MutationFunction<UpdateOutlineMutation, UpdateOutlineMutationVariables>;

/**
 * __useUpdateOutlineMutation__
 *
 * To run a mutation, you first call `useUpdateOutlineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOutlineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOutlineMutation, { data, loading, error }] = useUpdateOutlineMutation({
 *   variables: {
 *      id: // value for 'id'
 *      points: // value for 'points'
 *   },
 * });
 */
export function useUpdateOutlineMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOutlineMutation, UpdateOutlineMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOutlineMutation, UpdateOutlineMutationVariables>(UpdateOutlineDocument, options);
      }
export type UpdateOutlineMutationHookResult = ReturnType<typeof useUpdateOutlineMutation>;
export type UpdateOutlineMutationResult = Apollo.MutationResult<UpdateOutlineMutation>;
export type UpdateOutlineMutationOptions = Apollo.BaseMutationOptions<UpdateOutlineMutation, UpdateOutlineMutationVariables>;
export const DeleteOutlineDocument = gql`
    mutation deleteOutline($id: ID!) {
  deleteOutline(id: $id)
}
    `;
export type DeleteOutlineMutationFn = Apollo.MutationFunction<DeleteOutlineMutation, DeleteOutlineMutationVariables>;

/**
 * __useDeleteOutlineMutation__
 *
 * To run a mutation, you first call `useDeleteOutlineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOutlineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOutlineMutation, { data, loading, error }] = useDeleteOutlineMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteOutlineMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOutlineMutation, DeleteOutlineMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteOutlineMutation, DeleteOutlineMutationVariables>(DeleteOutlineDocument, options);
      }
export type DeleteOutlineMutationHookResult = ReturnType<typeof useDeleteOutlineMutation>;
export type DeleteOutlineMutationResult = Apollo.MutationResult<DeleteOutlineMutation>;
export type DeleteOutlineMutationOptions = Apollo.BaseMutationOptions<DeleteOutlineMutation, DeleteOutlineMutationVariables>;
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