import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { WebSocketLink } from '@apollo/client/link/ws';
import { useStoreState } from '@/ducks/store';

export const ApolloClientProvider = (props: { children: any }) => {
  // const loginUser = useStoreState((x) => x.loginUser);
  const loginLoaded = useStoreState((x) => x.loginLoaded);
  const [client, setClient] = useState<any>(undefined);

  const currentUserRefreshCount = useStoreState((x) => x.apolloClientRefreshCount);

  // ユーザー情報が更新されたらApolloClient再生成
  // websocketを張ったタイミングでcookieの情報をコネクションに保持してしまうため張りなおす必要がある。
  // ※ApolloClientを作り直すと、chromeのapolloのデバッグが見失ってしまうためデバッグ時は注意。

  useEffect(() => {
    // if (loginLoaded) {
    console.log('ApolloClient-Start');
    const developGraphql = `ws://${location.hostname}:3000/system/graphql`;
    const productGraphql = `wss://${location.hostname}/system/graphql`;
    setClient(
      new ApolloClient({
        link: new WebSocketLink({
          uri: process.env.NODE_ENV === 'production' ? productGraphql : developGraphql,
          options: {
            reconnect: true,
            // connectionParams: {
            //   authorization: `Bearer ${token}`, // キーは小文字であること
            // },
          },
        }),

        cache: new InMemoryCache({
          typePolicies: {
            Outline: {
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
                outlines: {
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
      }),
    );
    // }
  }, [currentUserRefreshCount, loginLoaded]);

  if (client == null) {
    return null;
  }

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};
