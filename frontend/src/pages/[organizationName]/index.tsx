import React, { ReactNode } from 'react';
import {
  Backdrop,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import Layout from '@/components/layout';
import Link from 'next/link';
import { ApolloError, gql } from '@apollo/react-hooks';
import { useGetOrganizationsQuery, useGetUserAreasQuery } from '@/types/graphql';
import { StyledProps } from '@/types/styled-props';
import LoadingContainer from '@/components/loading-container';

const useStyles = makeStyles(() => ({
  list: {
    display: 'grid',
    gridAutoRows: 'auto',
    gap: 10,
  },
}));

export const getUserAreasGql = gql`
  query getUserAreas($organizationId: ID!) {
    userAreas(organizationId: $organizationId) {
      area {
        name
      }
    }
  }
`;

/** 組織ルートページ */
const Page = () => {
  const classes = useStyles();
  const router = useRouter();
  const organizationName = router.query.organizationName?.toString() ?? '';
  const organizationPath = organizationName === '' ? '' : '/' + organizationName;

  const { loading, error, data } = useGetUserAreasQuery({
    variables: { organizationId: organizationName },
  });

  return (
    <Layout title={organizationName}>
      <h2>自分が保持している区域一覧</h2>
      <LoadingContainer loading={loading} error={error}>
        <div className={classes.list}>
          {data?.userAreas.map((x) => (
            <Link href={organizationPath + '/' + x.area.name}>
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

      <Link href={organizationPath + '/settings'}>組織設定</Link>
    </Layout>
  );
};
export default Page;
