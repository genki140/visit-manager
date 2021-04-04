import React from 'react';
import { gql, useQuery } from '@apollo/react-hooks';

export const USERS = gql`
  query Users {
    users {
      id
      username
      password
    }
  }
`;

const UserSettings = () => {
  const { loading, error, data } = useQuery<Users>(USERS);

  return <div>ああああああああああああああああああああああ</div>;
};

export default UserSettings;
