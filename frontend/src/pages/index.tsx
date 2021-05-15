import { Layout } from '@/components/layouts';
import { Button, Card, CardActionArea, CardContent, makeStyles, Typography } from '@material-ui/core';
import { useGetOrganizationsQuery } from '@/types/graphql';
import LoadingContainer from '@/components/loading-container';
import Link from 'next/link';
import { useFormatMessage } from '@/locales';

const useStyles = makeStyles(() => ({
  list: {
    display: 'grid',
    gridAutoRows: 'auto',
    gap: 10,
  },
}));

const IndexPage = () => {
  const classes = useStyles();
  const { loading, error, data } = useGetOrganizationsQuery();
  const f = useFormatMessage();
  return (
    <Layout title="訪問管理">
      <Typography gutterBottom variant="h2">
        {f((x) => x.affiliation_organiozation)}
      </Typography>

      <LoadingContainer loading={loading} error={error}>
        <div className={classes.list}>
          {data?.organizations.map((x) => (
            <Link href={x.name} key={x.id}>
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

      <Typography gutterBottom variant="h2">
        組織の操作
      </Typography>

      <Button variant="contained" color="primary">
        新規組織の作成
      </Button>
    </Layout>
  );
};
export default IndexPage;
