import { Box, Card, CardActionArea, CardContent, CardHeader, List, ListItem, Typography } from '@material-ui/core';
import Link from 'next/link';
import LoadingContainer from '@/components/loading-container';
import { Layout } from '@/components/layouts';
import { Custom404 } from '@/pages/404';
import { useRouterParams } from '@/utils/use-router-params';
import { MovableList } from '../movable-list';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import { AreaCreateButton } from '../dialogs/area-create-button';
import { useGetAreasQuery, useGetCurrentUserQuery } from '@/types/graphql';
import { useStoreState } from '@/ducks/store';
import { AreaListQueries } from '@/queries/area-list-queries';
import { ArrayUtil } from '@/utils/array-util';
import Enumerable from 'linq';

export const AreaList = () => {
  const routerParams = useRouterParams();
  const editing = useStoreState((x) => x.areaList.editing);
  const updateAreaOrdersMutation = AreaListQueries.useUpdateAreaOrders();

  const currentUser = useGetCurrentUserQuery();

  const { loading, error, data } = useGetAreasQuery({
    skip: routerParams.hasOrganization === false,
  });

  const orderdUserAreas = Enumerable.from(data?.areas ?? [])
    .where((x) => x.organizationId === routerParams.getOrganizationId())
    .where((x) => editing || x.userAreas.some((y) => y.userId === currentUser.data?.currentUser.id))
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
    const replaced = ArrayUtil.insertReplace(orderdUserAreas, oldIndex, newIndex);
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
              {orderdUserAreas.map((x) => ({
                key: x.id.toString(),
                node: (draggableProps: any) => (
                  <ListItem>
                    <Link href={'/' + routerParams.organizationName + '/' + x.name}>
                      <Card style={{ width: '100%' }}>
                        <CardActionArea>
                          <CardHeader
                            title={x.name}
                            action={
                              editing ? (
                                <div {...draggableProps} style={{ margin: 5 }}>
                                  <DragHandleIcon className="drag-handle" />
                                </div>
                              ) : null
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
      </LoadingContainer>
      <AreaCreateButton />
    </Layout>
  );
};
