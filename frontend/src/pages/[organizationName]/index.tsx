import React, { ReactNode } from 'react';
import { Backdrop, Button, Card, CardActionArea, CardContent, CircularProgress, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import Layout from '@/components/layout';
import Link from 'next/link';
import { ApolloError, gql } from '@apollo/react-hooks';
import { useGetOrganizationsQuery } from '@/types/graphql';
import { StyledProps } from '@/types/styled-props';

// ページ情報が取得できなければエラー
const organizationsGql = gql`
  query GetOrganizations {
    organizations {
      id
      name
      roledUsers {
        roles {
          name
          abilities {
            name
          }
        }
      }
    }
  }
`;

const LoadingContainer = (props: { children: ReactNode; loading: boolean; error?: ApolloError } & StyledProps) => {
  return (
    <div className={props.className}>
      {props.loading ? (
        <Backdrop open={props.loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <div>{props.children}</div>
      )}

      {/* {
        loading ? 
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop> : error != null ? <ErrorPage
      {children} */}
    </div>
  );
};

/** 組織ルートページ */
const Page = () => {
  const router = useRouter();
  const organizationName = (router.query.organizationName ?? '').toString();
  const organizationPath = organizationName === '' ? '' : '/' + organizationName;
  const { loading, error, data } = useGetOrganizationsQuery();

  return (
    <Layout title={organizationName}>
      <div>ここは組織のルートページ。 自分が保持している区域の一覧を表示する。</div>

      <LoadingContainer loading={loading} error={error}>
        {data?.organizations.map((x) => (
          <div>{x.name}</div>
        ))}
      </LoadingContainer>

      <Link href={organizationPath + '/A-1'}>
        <Button variant="contained" color="primary">
          A-1
        </Button>
      </Link>
      <Link href={organizationPath + '/A-2'}>
        <Button variant="contained" color="primary">
          A-2
        </Button>
      </Link>

      <Card>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              山の下
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
              continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        {/* <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions> */}
      </Card>

      <Link href={organizationPath + '/settings'}>組織設定</Link>
    </Layout>
  );
};
export default Page;
