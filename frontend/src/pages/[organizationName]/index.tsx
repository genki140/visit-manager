import React from 'react';
import { Card, CardActionArea, CardContent, makeStyles, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import Layout from '@/components/layout';
import Link from 'next/link';
import { gql } from '@apollo/react-hooks';
import { useGetUserAreasQuery } from '@/types/graphql';
import LoadingContainer from '@/components/loading-container';
import ErrorPage from 'next/error';
import Custom404 from '../404';

// スタイル定義
const useStyles = makeStyles(() => ({
  list: {
    display: 'grid',
    gridAutoRows: 'auto',
    gap: 10,
  },
}));

// クエリ定義
export const getUserAreasGql = gql`
  query getUserAreas($organizationId: ID!) {
    userAreas(organizationId: $organizationId) {
      id
      area {
        name
      }
    }
  }
`;

/** 組織ルートページ */
const OrganizationPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const organizationName = router.query.organizationName?.toString() ?? '';
  const organizationPath = organizationName === '' ? '' : '/' + organizationName;

  const { loading, error, data } = useGetUserAreasQuery({
    variables: { organizationId: organizationName },
  });

  // ユーザーがこの組織に所属していなければ404
  if (error != null) {
    const errorCode = error.graphQLErrors?.[0]?.extensions?.['code'];
    if (errorCode === 'NOT_FOUND') {
      return <Custom404 />;
    }
  }

  return (
    <Layout title={organizationName}>
      <Typography gutterBottom variant="h2">
        自分の区域一覧
      </Typography>
      <LoadingContainer loading={loading} error={error}>
        <div className={classes.list}>
          {data?.userAreas.map((x) => (
            <Link href={organizationPath + '/' + x.area.name} key={x.id}>
              <Card>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {x.area.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      区域の情報を表示
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          ))}
        </div>
      </LoadingContainer>
    </Layout>
  );
};
export default OrganizationPage;
