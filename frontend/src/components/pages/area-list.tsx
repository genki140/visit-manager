import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  List,
  ListItem,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Link from 'next/link';
import { useGetUserAreasQuery } from '@/types/graphql';
import LoadingContainer from '@/components/loading-container';
import { Layout } from '@/components/layouts';
import { Custom404 } from '@/pages/404';
import { useRouterParams } from '@/utils/use-router-params';
import React from 'react';
import { MovableList } from '../movable-list';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import { AreaCreateButton } from '../dialogs/area-create-button';

// スタイル定義
const useStyles = makeStyles(() => ({
  list: {
    display: 'grid',
    gridAutoRows: 'auto',
    gap: 10,
  },
}));

export const AreaList = () => {
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

  const onMove = (oldIndex: number, newIndex: number) => {
    console.log(oldIndex + ' to ' + newIndex);
  };

  return (
    <Layout title={routerParams.organizationName} layoutType="center">
      <LoadingContainer loading={loading} error={error}>
        <Box mt={3} mb={9} width="100%" maxWidth="700px">
          <Typography gutterBottom variant="h2" align="center">
            自分の区域一覧
          </Typography>
          <List>
            <MovableList onMove={onMove}>
              {(data?.userAreas ?? []).map((x) => ({
                key: x.id,
                node: (draggableProps: any) => (
                  <ListItem>
                    <Link href={'/' + routerParams.organizationName + '/' + x.area.name}>
                      <Card style={{ width: '100%' }}>
                        <CardActionArea>
                          <CardHeader
                            title={x.area.name}
                            action={
                              <div {...draggableProps} style={{ margin: 5 }}>
                                <DragHandleIcon className="drag-handle" />
                              </div>
                            }
                          />
                          <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                              区域の情報を表示
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Link>
                  </ListItem>
                ),
              }))}
            </MovableList>
          </List>
        </Box>
        <AreaCreateButton />
      </LoadingContainer>
    </Layout>
  );
};
