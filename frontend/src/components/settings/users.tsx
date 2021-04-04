import React from 'react';
import { gql } from '@apollo/react-hooks';

export const USERS = gql`
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

const UserSettings = () => {
  //   const { loading, error, data } = useGetUsersQuery;

  // return loading
  //   ? 'loading'
  //   : error != null
  //   ? 'error:' + error.message
  //   : (data?.users ?? []).map((x) => <div key={x.id}>{x.username}</div>);

  return <div>aa</div>;
};

export default UserSettings;
