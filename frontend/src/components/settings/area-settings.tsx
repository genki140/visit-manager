import React from 'react';
import { gql } from '@apollo/client';
import { useGetAreasQuery } from '@/types/graphql';
import { Link, Card, CardActionArea, CardContent, Typography, makeStyles } from '@material-ui/core';
import LoadingContainer from '../loading-container';
import { useRouter } from 'next/router';

const useStyles = makeStyles(() => ({
  list: {
    display: 'grid',
    gridAutoRows: 'auto',
    gap: 10,
  },
}));

const AreaSettings = () => {
  const classes = useStyles();
  const router = useRouter();
  const organizationName = (router.query.organizationName ?? '').toString();
  const organizationPath = organizationName === '' ? '' : '/' + organizationName;

  const { loading, error, data } = useGetAreasQuery({
    variables: { organizationId: router.query.organizationName?.toString() ?? '' },
  });
  return (
    <>
      <h2>区域一覧</h2>
      <LoadingContainer loading={loading} error={error}>
        <div className={classes.list}>
          {data?.areas.map((x) => (
            <Link href={organizationPath + '/' + x.name + '/settings'}>
              <Card>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {x.name}
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
    </>
  );
};

export default AreaSettings;
