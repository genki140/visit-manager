import React from 'react';
import { gql } from '@apollo/react-hooks';
import { useGetUsersQuery } from '@/types/graphql';

export const USERS = gql`
  query GetUsers {
    users {
      id
      username
      password
    }
  }
`;

const UserSettings = () => {
  const { loading, error, data } = useGetUsersQuery();

  return loading
    ? 'loading'
    : error != null
    ? 'error:' + error.message
    : (data?.users ?? []).map((x) => <div key={x.id}>{x.username}</div>);
};

export default UserSettings;
