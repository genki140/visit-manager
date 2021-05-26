import { Layout } from '@/components/layouts';
import { Box, Card, CardActionArea, CardContent, List, ListItem, makeStyles, Typography } from '@material-ui/core';
import { useGetOrganizationsQuery } from '@/types/graphql';
import LoadingContainer from '@/components/loading-container';
import Link from 'next/link';
import { useFormatMessage } from '@/locales';
import { OrganizationCreateButton } from '@/components/dialogs/organization-create-button';
import React from 'react';

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

  return (
    <Layout layoutType="center">
      <Box mt={3} mb={9}>
        <List>
          <Typography gutterBottom variant="h2" align="center">
            {f((x) => x.affiliation_organiozation)}
          </Typography>

          {data?.organizations.map((x) => (
            <ListItem>
              <Link href={x.name} key={x.id}>
                <Card>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h3" component="h3">
                        {x.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        区域数などの情報を表示できるかもあああああ
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </ListItem>
          ))}

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
        </List>

        <OrganizationCreateButton />
      </Box>
    </Layout>
  );
};
