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

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  name: Scalars['String'];
  color: Color;
  tasks: Task;
};

export enum Color {
  Red = 'red',
  Blue = 'blue',
  Green = 'green'
}

export type CreateCategoryInput = {
  name?: Maybe<Scalars['String']>;
  color: Color;
};

export type CreateTaskContentInput = {
  title?: Maybe<Scalars['String']>;
  taskId?: Maybe<Scalars['ID']>;
};

export type CreateTaskInput = {
  title?: Maybe<Scalars['String']>;
  categoryIds?: Maybe<Array<Scalars['ID']>>;
};

export type CreateUserInput = {
  userId?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};


export type Mutation = {
  __typename?: 'Mutation';
  createTask: Task;
  deleteTask?: Maybe<Task>;
  createCategory: Category;
  updateCategory: Category;
  deleteCategory?: Maybe<Category>;
  createTaskContent: TaskContent;
  updateTaskContent: TaskContent;
  deleteTaskContent?: Maybe<TaskContent>;
  createUser: User;
  deleteUser?: Maybe<Ability>;
  deleteRole?: Maybe<Role>;
};


export type MutationCreateTaskArgs = {
  task: CreateTaskInput;
};


export type MutationDeleteTaskArgs = {
  id: Scalars['ID'];
};


export type MutationCreateCategoryArgs = {
  category: CreateCategoryInput;
};


export type MutationUpdateCategoryArgs = {
  category: UpdateCategoryInput;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ID'];
};


export type MutationCreateTaskContentArgs = {
  taskContent: CreateTaskContentInput;
};


export type MutationUpdateTaskContentArgs = {
  taskContent: UpdateTaskContentInput;
};


export type MutationDeleteTaskContentArgs = {
  id: Scalars['ID'];
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

export type Query = {
  __typename?: 'Query';
  task?: Maybe<Task>;
  tasks: Array<Task>;
  category?: Maybe<Category>;
  categories: Array<Role>;
  taskContent?: Maybe<TaskContent>;
  taskContents: Array<TaskContent>;
  user?: Maybe<User>;
  users: Array<User>;
  role?: Maybe<Role>;
  ability?: Maybe<Ability>;
  abilities: Array<Ability>;
};


export type QueryTaskArgs = {
  id: Scalars['ID'];
};


export type QueryTasksArgs = {
  take?: Maybe<Scalars['Int']>;
};


export type QueryCategoryArgs = {
  id: Scalars['ID'];
};


export type QueryTaskContentArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryRoleArgs = {
  id: Scalars['ID'];
};


export type QueryAbilityArgs = {
  id: Scalars['ID'];
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['ID'];
  name: Scalars['String'];
  users: Array<User>;
  abilities: Array<Ability>;
};

export type Task = {
  __typename?: 'Task';
  id: Scalars['ID'];
  title: Scalars['String'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  taskContents: Array<TaskContent>;
  categories: Array<Category>;
};

export type TaskContent = {
  __typename?: 'TaskContent';
  id: Scalars['ID'];
  checked: Scalars['Boolean'];
  title: Scalars['String'];
  task: Task;
};

export type UpdateCategoryInput = {
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  color: Color;
};

export type UpdateTaskContentInput = {
  id?: Maybe<Scalars['ID']>;
  checked?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
  password: Scalars['String'];
  role: Role;
};

export type GetTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTasksQuery = (
  { __typename?: 'Query' }
  & { tasks: Array<(
    { __typename?: 'Task' }
    & Pick<Task, 'id' | 'title'>
  )> }
);

export type GetUserSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserSettingsQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
    & { role: (
      { __typename?: 'Role' }
      & Pick<Role, 'id' | 'name'>
    ) }
  )> }
);


export const GetTasksDocument = gql`
    query GetTasks {
  tasks {
    id
    title
  }
}
    `;

/**
 * __useGetTasksQuery__
 *
 * To run a query within a React component, call `useGetTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTasksQuery(baseOptions?: Apollo.QueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
      }
export function useGetTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
        }
export type GetTasksQueryHookResult = ReturnType<typeof useGetTasksQuery>;
export type GetTasksLazyQueryHookResult = ReturnType<typeof useGetTasksLazyQuery>;
export type GetTasksQueryResult = Apollo.QueryResult<GetTasksQuery, GetTasksQueryVariables>;
export const GetUserSettingsDocument = gql`
    query GetUserSettings {
  users {
    id
    username
    role {
      id
      name
    }
  }
}
    `;

/**
 * __useGetUserSettingsQuery__
 *
 * To run a query within a React component, call `useGetUserSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserSettingsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserSettingsQuery, GetUserSettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserSettingsQuery, GetUserSettingsQueryVariables>(GetUserSettingsDocument, options);
      }
export function useGetUserSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserSettingsQuery, GetUserSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserSettingsQuery, GetUserSettingsQueryVariables>(GetUserSettingsDocument, options);
        }
export type GetUserSettingsQueryHookResult = ReturnType<typeof useGetUserSettingsQuery>;
export type GetUserSettingsLazyQueryHookResult = ReturnType<typeof useGetUserSettingsLazyQuery>;
export type GetUserSettingsQueryResult = Apollo.QueryResult<GetUserSettingsQuery, GetUserSettingsQueryVariables>;