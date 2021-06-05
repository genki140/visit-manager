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

gql`
  query getAreas($organizationId: ID!) {
    areas(organizationId: $organizationId) {
      id
      name
      description
    }
  }
`;

gql`
  query getCurrentUser {
    currentUser {
      id
      username
      name
      userOrganizations {
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
