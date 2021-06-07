import { Layout } from '@/components/layouts';
import { Box, Card, CardActionArea, CardContent, CardHeader, List, ListItem, Typography } from '@material-ui/core';
import LoadingContainer from '@/components/loading-container';
import Link from 'next/link';
import { useFormatMessage } from '@/locales';
import { OrganizationCreateButton } from '@/components/dialogs/organization-create-button';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import React from 'react';
import { MovableList } from '../movable-list';
import { useGetUserOrganizationsQuery } from '@/types/graphql';
import { OrganizationListQueries } from '@/queries/organization-list-queries';
import Enumerable from 'linq';
import { ArrayUtil } from '@/utils/array-util';

// const useStyles = makeStyles(() => ({
//   list: {
//     display: 'grid',
//     gridAutoRows: 'auto',
//     gap: 10,
//   },
// }));

export const OrganizationList = () => {
  // const classes = useStyles();
  const { loading, error, data } = useGetUserOrganizationsQuery();
  const updateUserOrganizationsMutation = OrganizationListQueries.useUpdateUserOrganizationOrders();
  const f = useFormatMessage();

  const orderdUserOrganizations = Enumerable.from(data?.userOrganizations ?? [])
    .orderBy((x) => x.order)
    .toArray();

  const onMove = async (oldIndex: number, newIndex: number) => {
    // 現在の並び順を入れ替えた新しいordersを計算
    const replaced = ArrayUtil.insertReplace(orderdUserOrganizations, oldIndex, newIndex);
    await updateUserOrganizationsMutation({
      updateUserOrganizationsInput: {
        items: replaced.map((x, i) => ({
          id: x.id,
          order: i,
        })),
      },
    });
  };

  return (
    <Layout layoutType="center">
      <LoadingContainer loading={loading} error={error}>
        <Box mt={3} mb={9} width="100%" maxWidth="700px">
          <Typography gutterBottom variant="h2" align="center">
            {f((x) => x.affiliation_organiozation)}
          </Typography>
          <List>
            <MovableList onMove={onMove}>
              {orderdUserOrganizations.map((x) => ({
                key: x.organization.id.toString(),
                node: (draggableProps: any) => (
                  <Link href={x.organization.name}>
                    <ListItem>
                      <Card style={{ width: '100%' }}>
                        <CardActionArea>
                          <CardHeader
                            title={x.organization.name}
                            action={
                              <div {...draggableProps} style={{ margin: 5 }}>
                                <DragHandleIcon className="drag-handle" />
                              </div>
                            }
                          />
                          <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                              戸建て数：10000　一般アパート部屋数：10000　単身アパート部屋数：5000
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </ListItem>
                  </Link>
                ),
              }))}
            </MovableList>
          </List>
        </Box>
        <OrganizationCreateButton />
      </LoadingContainer>
    </Layout>
  );
};
