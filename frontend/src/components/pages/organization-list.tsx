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
import { DragDropContext, Draggable, Droppable, DropResult, ResponderProvided } from 'react-beautiful-dnd';

const useStyles = makeStyles(() => ({
  list: {
    display: 'grid',
    gridAutoRows: 'auto',
    gap: 10,
  },
}));

// 縦移動に限定刺せるためのラッパー
function getStyle(style: any) {
  if (style.transform) {
    const axisLockY = 'translate(0px' + style.transform.slice(style.transform.indexOf(','), style.transform.length);
    return {
      ...style,
      transform: axisLockY,
    };
  }
  return style;
}

const DragContainer = (props: { children: () => React.ReactNode[] }) => {
  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    console.log(result);
    // console.log('old:' + result. + ', new:' + result.addedIndex);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="organizations">
        {(provided) => (
          <div className="organizations" {...provided.droppableProps} ref={provided.innerRef}>
            <List>
              {props.children().map((item, index) => (
                <Draggable key={(item as any).key} draggableId={(item as any).key} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getStyle(provided.draggableProps.style)}
                    >
                      {item}
                      {/* <ListItem>
                        <Card style={{ width: '100%' }}>
                          <CardHeader
                            title={x.name}
                            action={
                              <div {...provided.dragHandleProps}>
                                <DragHandleIcon className="drag-handle" style={{ margin: 5 }} />
                              </div>
                            }
                          />
                          <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                              区域数：100。ユーザー数：100。その他情報色々
                            </Typography>
                          </CardContent>
                        </Card>
                      </ListItem> */}
                    </div>
                  )}
                </Draggable>
              ))}
            </List>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export const OrganizationList = () => {
  const classes = useStyles();
  const { loading, error, data } = useGetOrganizationsQuery();
  const f = useFormatMessage();

  return (
    <Layout layoutType="center">
      <Box mt={3} mb={9}>
        <Typography gutterBottom variant="h2" align="center">
          {f((x) => x.affiliation_organiozation)}
        </Typography>
      </Box>

      <DragContainer>
        {() =>
          (data?.organizations ?? []).map((x) => (
            <ListItem key={x.id}>
              <Card style={{ width: '100%' }}>
                <CardHeader
                  title={x.name}
                  action={
                    <div>
                      <DragHandleIcon className="drag-handle" style={{ margin: 5 }} />
                    </div>
                  }
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    区域数：100。ユーザー数：100。その他情報色々
                  </Typography>
                </CardContent>
              </Card>
            </ListItem>
          ))
        }
      </DragContainer>

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
