import { Layout } from '@/components/layouts';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
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
import { Container, Draggable, DropResult } from 'react-smooth-dnd';

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

  const onDrop = (result: DropResult) => {
    console.log('old:' + result.removedIndex + ', new:' + result.addedIndex);
  };

  return (
    <Layout layoutType="center">
      <Box mt={3} mb={9}>
        <Typography gutterBottom variant="h2" align="center">
          {f((x) => x.affiliation_organiozation)}
        </Typography>

        <Container dragHandleSelector=".drag-handle" lockAxis="y" onDrop={onDrop}>
          {data?.organizations.map((x) => (
            //
            <Draggable key={x.id}>
              <ListItem>
                <Card>
                  <CardHeader title={x.name} />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                      This impressive paella is a perfect party dish and a fun meal to cook together with your guests.
                      Add 1 cup of frozen peas along with the mussels, if you like.
                    </Typography>
                  </CardContent>
                </Card>
                <ListItemIcon className="drag-handle">
                  <DragHandleIcon />
                </ListItemIcon>
              </ListItem>
            </Draggable>
          ))}
        </Container>
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
