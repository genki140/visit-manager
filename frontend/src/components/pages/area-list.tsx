import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Fab,
  List,
  ListItem,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import Link from 'next/link';
import LoadingContainer from '@/components/loading-container';
import { Layout } from '@/components/layouts';
import { Custom404 } from '@/pages/404';
import { useRouterParams } from '@/utils/use-router-params';
import React from 'react';
import { MovableList } from '../movable-list';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import { AreaCreateButton } from '../dialogs/area-create-button';
import { useGetAreasQuery } from '@/types/graphql';
import { actions, useAppDispatch, useStoreState } from '@/ducks/store';
import EditIcon from '@material-ui/icons/Edit';
import { AreaListQueries } from '@/queries/area-list-queries';
import { ArrayUtil } from '@/utils/array-util';
import Enumerable from 'linq';

// スタイル定義
const useStyles = makeStyles((theme: Theme) => ({
  // list: {
  //   display: 'grid',
  //   gridAutoRows: 'auto',
  //   gap: 10,
  // },
  fab2: {
    position: 'absolute',
    bottom: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

export const AreaList = () => {
  const classes = useStyles();
  const routerParams = useRouterParams();
  const user = useStoreState((x) => x.loginUser);
  const editing = useStoreState((x) => x.areaList.editing);
  const dispatch = useAppDispatch();
  const updateAreaOrdersMutation = AreaListQueries.useUpdateAreaOrders();

  const { loading, error, data } = useGetAreasQuery({
    variables: { organizationId: routerParams.getOrganizationId(), userIds: editing ? undefined : [Number(user?.id)] },
    skip: routerParams.organizationName === '',
  });

  const orderdUserOrganizations = Enumerable.from(data?.areas ?? [])
    .orderBy((x) => x.order)
    .toArray();

  // ユーザーがこの組織に所属していなければ404
  if (error != null) {
    const errorCode = error.graphQLErrors?.[0]?.extensions?.['code'];
    if (errorCode === 'NOT_FOUND') {
      return <Custom404 />;
    }
  }

  const onMove = async (oldIndex: number, newIndex: number) => {
    // 現状は全体のリストのみ対応
    if (editing === false) {
      return;
    }

    // 現在の並び順を入れ替えた新しいordersを計算
    const replaced = ArrayUtil.insertReplace(orderdUserOrganizations, oldIndex, newIndex);
    await updateAreaOrdersMutation({
      updateAreaOrdersInput: {
        items: replaced.map((x, i) => ({
          id: x.id,
          order: i,
        })),
      },
    });
  };

  return (
    <Layout title={routerParams.organizationName} layoutType="center">
      <LoadingContainer loading={loading} error={error}>
        <Box mt={3} mb={9} width="100%" maxWidth="700px">
          <Typography gutterBottom variant="h2" align="center">
            {editing ? '組織内の全区域一覧' : '自分の区域一覧'}
          </Typography>
          <List>
            <MovableList onMove={onMove}>
              {orderdUserOrganizations.map((x) => ({
                key: x.id.toString(),
                node: (draggableProps: any) => (
                  <ListItem>
                    <Link href={'/' + routerParams.organizationName + '/' + x.name}>
                      <Card style={{ width: '100%' }}>
                        <CardActionArea>
                          <CardHeader
                            title={x.name}
                            action={
                              <div {...draggableProps} style={{ margin: 5 }}>
                                <DragHandleIcon className="drag-handle" />
                              </div>
                            }
                          />
                          <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                              {x.description}
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

        {editing && <AreaCreateButton />}

        <Fab
          className={classes.fab2}
          color={editing ? 'primary' : 'default'}
          onClick={() => {
            // toggle editing
            dispatch(actions.setAreaListEditing({ editing: !editing }));
          }}
        >
          <EditIcon />
        </Fab>
      </LoadingContainer>
    </Layout>
  );
};
