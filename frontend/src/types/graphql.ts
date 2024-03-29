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
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Area = {
  __typename?: 'Area';
  id: Scalars['Int'];
  order: Scalars['Int'];
  name: Scalars['String'];
  description: Scalars['String'];
  organization: Organization;
  organizationId: Scalars['Float'];
  areaType: AreaType;
  areaTypeId: Scalars['Float'];
  userAreas: Array<UserArea>;
  residences: Array<Residence>;
  outlines: Array<Outline>;
};

export type AreaType = {
  __typename?: 'AreaType';
  id: Scalars['Int'];
  order: Scalars['Int'];
  name: Scalars['String'];
  description: Scalars['String'];
  organization: Organization;
  organizationId: Scalars['Float'];
  areas: Array<Area>;
};

export type CreateAreaInput = {
  organizationId?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  areaTypeId?: Maybe<Scalars['Int']>;
};

export type CreateOutlineInput = {
  points?: Maybe<Array<CreateOutlinePointInput>>;
  areaId: Scalars['Int'];
};

export type CreateOutlinePointInput = {
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
};

export type CreateResidenceInput = {
  areaId?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
};

export type CreateUserInput = {
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type CreateUserOrganizationInput = {
  name?: Maybe<Scalars['String']>;
  defaultAreaTypeName?: Maybe<Scalars['String']>;
};


export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  deleteUser?: Maybe<User>;
  addTest: Scalars['Float'];
  createUserOrganization: UserOrganization;
  updateUserOrganizations: Array<UserOrganization>;
  createArea: Area;
  updateAreaOrders: Array<Area>;
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
  id: Scalars['Int'];
};


export type MutationCreateUserOrganizationArgs = {
  organization: CreateUserOrganizationInput;
};


export type MutationUpdateUserOrganizationsArgs = {
  userOrganizations: UpdateUserOrganizationsInput;
};


export type MutationCreateAreaArgs = {
  area: CreateAreaInput;
};


export type MutationUpdateAreaOrdersArgs = {
  areaOrders: UpdateAreaOrdersInput;
};


export type MutationCreateOutlineArgs = {
  outline: CreateOutlineInput;
};


export type MutationUpdateOutlineArgs = {
  outline: UpdateOutlineInput;
};


export type MutationDeleteOutlineArgs = {
  id: Scalars['Int'];
};


export type MutationCreateResidenceArgs = {
  residence: CreateResidenceInput;
};


export type MutationUpdateResidenceArgs = {
  residence: UpdateResidenceInput;
};


export type MutationDeleteResidenceArgs = {
  id: Scalars['Int'];
};

export type Organization = {
  __typename?: 'Organization';
  id: Scalars['Int'];
  name: Scalars['String'];
  areas: Array<Area>;
  areaTypes: Array<AreaType>;
  userOrganizations: Array<UserOrganization>;
};

export type Outline = {
  __typename?: 'Outline';
  id: Scalars['Int'];
  points: Array<OutlinePoint>;
  area: Area;
  areaId: Scalars['Int'];
};

export type OutlinePoint = {
  __typename?: 'OutlinePoint';
  id: Scalars['Int'];
  order: Scalars['Float'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  outline: Outline;
};

export type Query = {
  __typename?: 'Query';
  currentUser: User;
  googleMapApiKey: Scalars['String'];
  getTest: Scalars['Float'];
  userOrganizations: Array<UserOrganization>;
  areas: Array<Area>;
  areaTypes: Array<AreaType>;
};


export type QueryAreasArgs = {
  ids?: Maybe<Array<Scalars['Int']>>;
  organizationId?: Maybe<Scalars['Int']>;
};


export type QueryAreaTypesArgs = {
  organizationId: Scalars['Int'];
};

export type Residence = {
  __typename?: 'Residence';
  id: Scalars['Int'];
  name: Scalars['String'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  residents: Array<Resident>;
  area: Area;
};

export type Resident = {
  __typename?: 'Resident';
  id: Scalars['Int'];
  name: Scalars['String'];
  floor: Scalars['Float'];
  room: Scalars['Float'];
  residence: Residence;
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['Int'];
  name: Scalars['String'];
  userOrganization: Array<UserOrganization>;
  abilities: Array<Ability>;
};

export type Subscription = {
  __typename?: 'Subscription';
  testAdded: Scalars['Float'];
};

export type UpdateAreaOrdersInput = {
  items?: Maybe<Array<UpdateAreaOrdersInputItem>>;
};

export type UpdateAreaOrdersInputItem = {
  id?: Maybe<Scalars['Int']>;
  order?: Maybe<Scalars['Int']>;
};

export type UpdateOutlineInput = {
  id?: Maybe<Scalars['Int']>;
  points?: Maybe<Array<UpdateOutlinePointInput>>;
};

export type UpdateOutlinePointInput = {
  order?: Maybe<Scalars['Float']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
};

export type UpdateResidenceInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
};

export type UpdateUserOrganizationsInput = {
  items?: Maybe<Array<UpdateUserOrganizationsInputItem>>;
};

export type UpdateUserOrganizationsInputItem = {
  id?: Maybe<Scalars['Int']>;
  order?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  createdAt: Scalars['Date'];
  username: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
  userOrganizations: Array<UserOrganization>;
  userAreas: Array<UserArea>;
};

export type UserArea = {
  __typename?: 'UserArea';
  id: Scalars['Int'];
  user: User;
  userId: Scalars['Float'];
  area: Area;
  areaId: Scalars['Float'];
};

export type UserOrganization = {
  __typename?: 'UserOrganization';
  id: Scalars['Int'];
  order: Scalars['Int'];
  organization: Organization;
  organizationId: Scalars['Float'];
  user: User;
  userId: Scalars['Int'];
  roles: Array<Role>;
};

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

export type GetAreasQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAreasQuery = (
  { __typename?: 'Query' }
  & { areas: Array<(
    { __typename?: 'Area' }
    & Pick<Area, 'id' | 'order' | 'name' | 'description' | 'organizationId'>
    & { userAreas: Array<(
      { __typename?: 'UserArea' }
      & Pick<UserArea, 'userId'>
    )> }
  )> }
);

export type CreateAreaMutationVariables = Exact<{
  organizationId: Scalars['Int'];
  name: Scalars['String'];
  description: Scalars['String'];
  areaTypeId: Scalars['Int'];
}>;


export type CreateAreaMutation = (
  { __typename?: 'Mutation' }
  & { createArea: (
    { __typename?: 'Area' }
    & Pick<Area, 'id' | 'order' | 'name' | 'description' | 'organizationId'>
    & { userAreas: Array<(
      { __typename?: 'UserArea' }
      & Pick<UserArea, 'userId'>
    )> }
  ) }
);

export type UpdateAreaOrdersMutationVariables = Exact<{
  updateAreaOrdersInput: UpdateAreaOrdersInput;
}>;


export type UpdateAreaOrdersMutation = (
  { __typename?: 'Mutation' }
  & { updateAreaOrders: Array<(
    { __typename?: 'Area' }
    & Pick<Area, 'id' | 'order'>
  )> }
);

export type GetAreaQueryVariables = Exact<{
  organizationId: Scalars['Int'];
  areaId: Scalars['Int'];
}>;


export type GetAreaQuery = (
  { __typename?: 'Query' }
  & { areas: Array<(
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
  )> }
);

export type CreateResidenceMutationVariables = Exact<{
  areaId: Scalars['Int'];
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
  id: Scalars['Int'];
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
  id: Scalars['Int'];
}>;


export type DeleteResidenceMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteResidence'>
);

export type CreateOutlineMutationVariables = Exact<{
  areaId: Scalars['Int'];
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
  id: Scalars['Int'];
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
  id: Scalars['Int'];
}>;


export type DeleteOutlineMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteOutline'>
);

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
    & { userOrganizations: Array<(
      { __typename?: 'UserOrganization' }
      & Pick<UserOrganization, 'id'>
      & { roles: Array<(
        { __typename?: 'Role' }
        & Pick<Role, 'name'>
        & { abilities: Array<(
          { __typename?: 'Ability' }
          & Pick<Ability, 'id' | 'name'>
        )> }
      )> }
    )> }
  ) }
);

export type GetUserOrganizationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserOrganizationsQuery = (
  { __typename?: 'Query' }
  & { userOrganizations: Array<(
    { __typename?: 'UserOrganization' }
    & Pick<UserOrganization, 'id' | 'order'>
    & { organization: (
      { __typename?: 'Organization' }
      & Pick<Organization, 'id' | 'name'>
    ) }
  )> }
);

export type CreateUserOrganizationMutationVariables = Exact<{
  name: Scalars['String'];
  defaultAreaTypeName: Scalars['String'];
}>;


export type CreateUserOrganizationMutation = (
  { __typename?: 'Mutation' }
  & { createUserOrganization: (
    { __typename?: 'UserOrganization' }
    & Pick<UserOrganization, 'id' | 'order'>
    & { organization: (
      { __typename?: 'Organization' }
      & Pick<Organization, 'id' | 'name'>
    ) }
  ) }
);

export type UpdateUserOrganizationsMutationVariables = Exact<{
  updateUserOrganizationsInput: UpdateUserOrganizationsInput;
}>;


export type UpdateUserOrganizationsMutation = (
  { __typename?: 'Mutation' }
  & { updateUserOrganizations: Array<(
    { __typename?: 'UserOrganization' }
    & Pick<UserOrganization, 'id' | 'order'>
  )> }
);

export type GetAreaTypesQueryVariables = Exact<{
  organizationId: Scalars['Int'];
}>;


export type GetAreaTypesQuery = (
  { __typename?: 'Query' }
  & { areaTypes: Array<(
    { __typename?: 'AreaType' }
    & Pick<AreaType, 'id' | 'order' | 'name' | 'description'>
  )> }
);


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
export const GetAreasDocument = gql`
    query getAreas {
  areas {
    id
    order
    name
    description
    organizationId
    userAreas {
      userId
    }
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
 *   },
 * });
 */
export function useGetAreasQuery(baseOptions?: Apollo.QueryHookOptions<GetAreasQuery, GetAreasQueryVariables>) {
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
export const CreateAreaDocument = gql`
    mutation createArea($organizationId: Int!, $name: String!, $description: String!, $areaTypeId: Int!) {
  createArea(
    area: {organizationId: $organizationId, name: $name, description: $description, areaTypeId: $areaTypeId}
  ) {
    id
    order
    name
    description
    organizationId
    userAreas {
      userId
    }
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
 *      areaTypeId: // value for 'areaTypeId'
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
export const UpdateAreaOrdersDocument = gql`
    mutation updateAreaOrders($updateAreaOrdersInput: UpdateAreaOrdersInput!) {
  updateAreaOrders(areaOrders: $updateAreaOrdersInput) {
    id
    order
  }
}
    `;
export type UpdateAreaOrdersMutationFn = Apollo.MutationFunction<UpdateAreaOrdersMutation, UpdateAreaOrdersMutationVariables>;

/**
 * __useUpdateAreaOrdersMutation__
 *
 * To run a mutation, you first call `useUpdateAreaOrdersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAreaOrdersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAreaOrdersMutation, { data, loading, error }] = useUpdateAreaOrdersMutation({
 *   variables: {
 *      updateAreaOrdersInput: // value for 'updateAreaOrdersInput'
 *   },
 * });
 */
export function useUpdateAreaOrdersMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAreaOrdersMutation, UpdateAreaOrdersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAreaOrdersMutation, UpdateAreaOrdersMutationVariables>(UpdateAreaOrdersDocument, options);
      }
export type UpdateAreaOrdersMutationHookResult = ReturnType<typeof useUpdateAreaOrdersMutation>;
export type UpdateAreaOrdersMutationResult = Apollo.MutationResult<UpdateAreaOrdersMutation>;
export type UpdateAreaOrdersMutationOptions = Apollo.BaseMutationOptions<UpdateAreaOrdersMutation, UpdateAreaOrdersMutationVariables>;
export const GetAreaDocument = gql`
    query getArea($organizationId: Int!, $areaId: Int!) {
  areas(organizationId: $organizationId, ids: [$areaId]) {
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
    `;

/**
 * __useGetAreaQuery__
 *
 * To run a query within a React component, call `useGetAreaQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAreaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAreaQuery({
 *   variables: {
 *      organizationId: // value for 'organizationId'
 *      areaId: // value for 'areaId'
 *   },
 * });
 */
export function useGetAreaQuery(baseOptions: Apollo.QueryHookOptions<GetAreaQuery, GetAreaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAreaQuery, GetAreaQueryVariables>(GetAreaDocument, options);
      }
export function useGetAreaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAreaQuery, GetAreaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAreaQuery, GetAreaQueryVariables>(GetAreaDocument, options);
        }
export type GetAreaQueryHookResult = ReturnType<typeof useGetAreaQuery>;
export type GetAreaLazyQueryHookResult = ReturnType<typeof useGetAreaLazyQuery>;
export type GetAreaQueryResult = Apollo.QueryResult<GetAreaQuery, GetAreaQueryVariables>;
export const CreateResidenceDocument = gql`
    mutation createResidence($areaId: Int!, $latitude: Float!, $longitude: Float!) {
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
    mutation updateResidence($id: Int!, $latitude: Float!, $longitude: Float!) {
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
    mutation deleteResidence($id: Int!) {
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
    mutation createOutline($areaId: Int!, $points: [CreateOutlinePointInput!]!) {
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
    mutation updateOutline($id: Int!, $points: [UpdateOutlinePointInput!]!) {
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
    mutation deleteOutline($id: Int!) {
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
export const GetCurrentUserDocument = gql`
    query getCurrentUser {
  currentUser {
    id
    name
    userOrganizations {
      id
      roles {
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
export const GetUserOrganizationsDocument = gql`
    query getUserOrganizations {
  userOrganizations {
    id
    order
    organization {
      id
      name
    }
  }
}
    `;

/**
 * __useGetUserOrganizationsQuery__
 *
 * To run a query within a React component, call `useGetUserOrganizationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserOrganizationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserOrganizationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserOrganizationsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserOrganizationsQuery, GetUserOrganizationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserOrganizationsQuery, GetUserOrganizationsQueryVariables>(GetUserOrganizationsDocument, options);
      }
export function useGetUserOrganizationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserOrganizationsQuery, GetUserOrganizationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserOrganizationsQuery, GetUserOrganizationsQueryVariables>(GetUserOrganizationsDocument, options);
        }
export type GetUserOrganizationsQueryHookResult = ReturnType<typeof useGetUserOrganizationsQuery>;
export type GetUserOrganizationsLazyQueryHookResult = ReturnType<typeof useGetUserOrganizationsLazyQuery>;
export type GetUserOrganizationsQueryResult = Apollo.QueryResult<GetUserOrganizationsQuery, GetUserOrganizationsQueryVariables>;
export const CreateUserOrganizationDocument = gql`
    mutation createUserOrganization($name: String!, $defaultAreaTypeName: String!) {
  createUserOrganization(
    organization: {name: $name, defaultAreaTypeName: $defaultAreaTypeName}
  ) {
    id
    order
    organization {
      id
      name
    }
  }
}
    `;
export type CreateUserOrganizationMutationFn = Apollo.MutationFunction<CreateUserOrganizationMutation, CreateUserOrganizationMutationVariables>;

/**
 * __useCreateUserOrganizationMutation__
 *
 * To run a mutation, you first call `useCreateUserOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserOrganizationMutation, { data, loading, error }] = useCreateUserOrganizationMutation({
 *   variables: {
 *      name: // value for 'name'
 *      defaultAreaTypeName: // value for 'defaultAreaTypeName'
 *   },
 * });
 */
export function useCreateUserOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserOrganizationMutation, CreateUserOrganizationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserOrganizationMutation, CreateUserOrganizationMutationVariables>(CreateUserOrganizationDocument, options);
      }
export type CreateUserOrganizationMutationHookResult = ReturnType<typeof useCreateUserOrganizationMutation>;
export type CreateUserOrganizationMutationResult = Apollo.MutationResult<CreateUserOrganizationMutation>;
export type CreateUserOrganizationMutationOptions = Apollo.BaseMutationOptions<CreateUserOrganizationMutation, CreateUserOrganizationMutationVariables>;
export const UpdateUserOrganizationsDocument = gql`
    mutation updateUserOrganizations($updateUserOrganizationsInput: UpdateUserOrganizationsInput!) {
  updateUserOrganizations(userOrganizations: $updateUserOrganizationsInput) {
    id
    order
  }
}
    `;
export type UpdateUserOrganizationsMutationFn = Apollo.MutationFunction<UpdateUserOrganizationsMutation, UpdateUserOrganizationsMutationVariables>;

/**
 * __useUpdateUserOrganizationsMutation__
 *
 * To run a mutation, you first call `useUpdateUserOrganizationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserOrganizationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserOrganizationsMutation, { data, loading, error }] = useUpdateUserOrganizationsMutation({
 *   variables: {
 *      updateUserOrganizationsInput: // value for 'updateUserOrganizationsInput'
 *   },
 * });
 */
export function useUpdateUserOrganizationsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserOrganizationsMutation, UpdateUserOrganizationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserOrganizationsMutation, UpdateUserOrganizationsMutationVariables>(UpdateUserOrganizationsDocument, options);
      }
export type UpdateUserOrganizationsMutationHookResult = ReturnType<typeof useUpdateUserOrganizationsMutation>;
export type UpdateUserOrganizationsMutationResult = Apollo.MutationResult<UpdateUserOrganizationsMutation>;
export type UpdateUserOrganizationsMutationOptions = Apollo.BaseMutationOptions<UpdateUserOrganizationsMutation, UpdateUserOrganizationsMutationVariables>;
export const GetAreaTypesDocument = gql`
    query getAreaTypes($organizationId: Int!) {
  areaTypes(organizationId: $organizationId) {
    id
    order
    name
    description
  }
}
    `;

/**
 * __useGetAreaTypesQuery__
 *
 * To run a query within a React component, call `useGetAreaTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAreaTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAreaTypesQuery({
 *   variables: {
 *      organizationId: // value for 'organizationId'
 *   },
 * });
 */
export function useGetAreaTypesQuery(baseOptions: Apollo.QueryHookOptions<GetAreaTypesQuery, GetAreaTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAreaTypesQuery, GetAreaTypesQueryVariables>(GetAreaTypesDocument, options);
      }
export function useGetAreaTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAreaTypesQuery, GetAreaTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAreaTypesQuery, GetAreaTypesQueryVariables>(GetAreaTypesDocument, options);
        }
export type GetAreaTypesQueryHookResult = ReturnType<typeof useGetAreaTypesQuery>;
export type GetAreaTypesLazyQueryHookResult = ReturnType<typeof useGetAreaTypesLazyQuery>;
export type GetAreaTypesQueryResult = Apollo.QueryResult<GetAreaTypesQuery, GetAreaTypesQueryVariables>;