import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';

const client = new ApolloClient({
  // クライアントからアクセスできるURLであること
  // uri: process.env.SITE_URL + (process.env.SITE_PORT == null ? '' : ':' + process.env.SITE_PORT) + '/graphql',
  uri: '/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Polygon: {
        fields: {
          points: {
            merge(_existing, incoming) {
              return incoming;
            },
          },
        },
      },
      Area: {
        fields: {
          polygons: {
            merge(_existing, incoming) {
              return incoming;
            },
          },
          residences: {
            merge(_existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});

export const ApolloClientProvider = (props: { children: any }) => {
  // const router = useRouter();
  // console.log(router);
  return (
    <>
      <ApolloProvider client={client}>{props.children}</ApolloProvider>
    </>
  );
};
