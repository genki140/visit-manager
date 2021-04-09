import React from 'react';
import Layout from '@/components/layout';
import { Button, Card, CardActionArea, CardContent, makeStyles, Typography } from '@material-ui/core';
import Link from 'next/link';
import { useGetOrganizationsQuery } from '@/types/graphql';
import LoadingContainer from '@/components/loading-container';
import { gql } from '@apollo/react-hooks';
import { Autocomplete } from '@react-google-maps/api';

const useStyles = makeStyles(() => ({
  list: {
    display: 'grid',
    gridAutoRows: 'auto',
    gap: 10,
  },
}));

// ページ情報が取得できなければエラー
export const GetOrganizationsGql = gql`
  query GetOrganizations {
    organizations {
      id
      name
    }
  }
`;

const IndexPage = () => {
  const classes = useStyles();
  const { loading, error, data } = useGetOrganizationsQuery();
  return (
    <Layout title="訪問管理">
      <h2>所属している組織</h2>

      <LoadingContainer loading={loading} error={error}>
        <div className={classes.list}>
          {data?.organizations.map((x) => (
            <Link href={x.name}>
              <Card>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {x.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      区域数などの情報を表示できるかも
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          ))}
        </div>
      </LoadingContainer>

      <h2>組織の操作</h2>

      <Button variant="contained" color="primary">
        新規組織の作成
      </Button>
    </Layout>
  );
  // <Map></Map>
};
export default IndexPage;
