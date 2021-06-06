import { Layout } from '@/components/layouts';
import { Box, Card, CardActionArea, CardContent, CardHeader, List, ListItem, Typography } from '@material-ui/core';
import { useGetOrganizationsQuery } from '@/types/graphql';
import LoadingContainer from '@/components/loading-container';
import Link from 'next/link';
import { useFormatMessage } from '@/locales';
import { OrganizationCreateButton } from '@/components/dialogs/organization-create-button';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import React from 'react';
import { MovableList } from '../movable-list';

// const useStyles = makeStyles(() => ({
//   list: {
//     display: 'grid',
//     gridAutoRows: 'auto',
//     gap: 10,
//   },
// }));

export const OrganizationList = () => {
  // const classes = useStyles();
  const { loading, error, data } = useGetOrganizationsQuery();
  const f = useFormatMessage();

  const onMove = (oldIndex: number, newIndex: number) => {
    console.log(oldIndex + ' to ' + newIndex);
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
              {(data?.organizations ?? []).map((x) => ({
                key: x.id.toString(),
                node: (draggableProps: any) => (
                  <Link href={x.name}>
                    <ListItem>
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
