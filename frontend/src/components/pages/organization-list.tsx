import { Layout } from '@/components/layouts';
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
import { useGetOrganizationsQuery } from '@/types/graphql';
import LoadingContainer from '@/components/loading-container';
import Link from 'next/link';
import { useFormatMessage } from '@/locales';
import { OrganizationCreateButton } from '@/components/dialogs/organization-create-button';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import React from 'react';
import { MovableList } from '../movable-list';

const useStyles = makeStyles(() => ({
  list: {
    display: 'grid',
    gridAutoRows: 'auto',
    gap: 10,
  },
}));

export const OrganizationList = () => {
  const classes = useStyles();
  const { loading, error, data } = useGetOrganizationsQuery();
  const f = useFormatMessage();

  const onMove = (oldIndex: number, newIndex: number) => {
    console.log(oldIndex + ' to ' + newIndex);
  };

  return (
    <Layout layoutType="center">
      <Box mt={3} mb={9}>
        <Typography gutterBottom variant="h2" align="center">
          {f((x) => x.affiliation_organiozation)}
        </Typography>
        <List>
          <MovableList onMove={onMove}>
            {(data?.organizations ?? []).map((x) => ({
              key: x.id,
              node: (draggableProps: any) => (
                <ListItem>
                  <Link href={x.name}>
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
                            区域数：100。ユーザー数：100。その他情報色々
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

      {/* {data?.organizations.map((x, index) =>
            SortableElement(({ index }) => (
              <ListItem key={x.id}>
                <Link href={x.name}>
                  <Card>
                    <CardContent>
                      <Typography gutterBottom variant="h3" component="h3">
                        {x.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        区域数などの情報を表示
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
                <ListItemSecondaryAction>
                  {SortableHandle(() => (
                    <ListItemIcon>
                      <DragHandleIcon />
                    </ListItemIcon>
                  ))}
                </ListItemSecondaryAction>
              </ListItem>
            )),
          )} */}

      {/* <LoadingContainer loading={loading} error={error}>
          <div className={classes.list}>
            {data?.organizations.map((x) => (
              <Link href={x.name} key={x.id}>
                <Card>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h3" component="h3">
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
        </LoadingContainer> */}

      <OrganizationCreateButton />
    </Layout>
  );
};
