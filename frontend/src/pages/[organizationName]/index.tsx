import { Card, CardActionArea, CardContent, makeStyles, Typography } from '@material-ui/core';
import Link from 'next/link';
import { useGetUserAreasQuery } from '@/types/graphql';
import LoadingContainer from '@/components/loading-container';
import { Layout } from '@/components/layouts';
import { Custom404 } from '../404';
import { useRouterParams } from '@/utils/use-router-params';

// スタイル定義
const useStyles = makeStyles(() => ({
  list: {
    display: 'grid',
    gridAutoRows: 'auto',
    gap: 10,
  },
}));

/** 組織ルートページ */
const OrganizationPage = () => {
  const classes = useStyles();
  const routerParams = useRouterParams();

  const { loading, error, data } = useGetUserAreasQuery({
    variables: { organizationId: routerParams.organizationName },
    skip: routerParams.organizationName === '',
  });

  // ユーザーがこの組織に所属していなければ404
  if (error != null) {
    const errorCode = error.graphQLErrors?.[0]?.extensions?.['code'];
    if (errorCode === 'NOT_FOUND') {
      return <Custom404 />;
    }
  }

  return (
    <Layout title={routerParams.organizationName}>
      <Typography gutterBottom variant="h2">
        自分の区域一覧
      </Typography>
      <LoadingContainer loading={loading} error={error}>
        <div className={classes.list}>
          {data?.userAreas.map((x) => (
            <Link href={'/' + routerParams.organizationName + '/' + x.area.name} key={x.id}>
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
