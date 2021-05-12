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

gql`
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
