import React from 'react';
import Layout from '@/components/layout';
import Map from '@/components/map';
import { Button, Card, CardActionArea, CardContent, Typography } from '@material-ui/core';
import Link from 'next/link';
import { useGetOrganizationsQuery } from '@/types/graphql';
import LoadingContainer from '@/components/loading-container';
import { gql } from '@apollo/react-hooks';

// ページ情報が取得できなければエラー
const queries = [
  gql`
    query GetOrganizations {
      organizations {
        id
        name
        # roledUsers {
        #   roles {
        #     name
        #     abilities {
        #       name
        #     }
        #   }
        # }
      }
    }
  `,
];

const IndexPage = () => {
  const { loading, error, data } = useGetOrganizationsQuery();
  return (
    <Layout title="訪問管理">
      <div>所属している組織</div>
      <LoadingContainer loading={loading} error={error}>
        {data?.organizations.map((x) => (
          <Link href={x.name}>
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {x.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                    continents except Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        ))}
      </LoadingContainer>

      <Button variant="contained" color="primary">
        新規組織の作成
      </Button>
    </Layout>
  );
  // <Map></Map>
};
export default IndexPage;
