import { gql } from '@apollo/client';

gql`
  query GetOrganizations {
    organizations {
      id
      name
    }
  }
`;

gql`
  query getUserAreas($organizationId: ID!) {
    userAreas(organizationId: $organizationId) {
      id
      area {
        name
      }
    }
  }
`;
