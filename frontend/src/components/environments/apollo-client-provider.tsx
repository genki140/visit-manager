import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React, { useMemo } from 'react';
import { WebSocketLink } from '@apollo/client/link/ws';

export const ApolloClientProvider = (props: { children: any }) => {
  const client = useMemo(() => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJnZW5raTE0MCIsInBhc3N3b3JkIjoiIiwibmFtZSI6Iuefs-S4uOWFg-awlyIsImNyZWF0ZWRBdCI6IjIwMjEtMDQtMDhUMjM6MTI6NTUuMjg2WiIsInJvbGVkVXNlcnMiOlt7ImlkIjoxLCJvcmdhbml6YXRpb24iOnsiaWQiOjEsIm5hbWUiOiLlsbHjga7kuIvkvJrooYYifSwicm9sZXMiOlt7ImlkIjoxLCJuYW1lIjoiQWRtaW4iLCJhYmlsaXRpZXMiOlt7ImlkIjoxLCJuYW1lIjoiQWRtaW5pc3RyYXRvciJ9XX1dfV0sImlhdCI6MTYyMTQ3Njk5MSwiZXhwIjoxNjIyMDgxNzkxfQ.5kTGve4yU-eNH9R5h790KlIzn2vuK6e6ZG0OOHfkW0A';

    const developGraphql = `ws://${location.hostname}:4000/graphql`;
    const productGraphql = `wss://${location.hostname}:3000/system/graphql`;

    return new ApolloClient({
      link: new WebSocketLink({
        uri: process.env.NODE_ENV === 'production' ? productGraphql : developGraphql,
        options: {
          reconnect: true,
          connectionParams: {
            authorization: `Bearer ${token}`, // キーは小文字であること
          },
        },
      }),

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
  }, []);

  return (
    <>
      <ApolloProvider client={client}>{props.children}</ApolloProvider>
    </>
  );
};
