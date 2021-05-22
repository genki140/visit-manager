import { Layout } from '@/components/layouts';
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  makeStyles,
  Modal,
  Typography,
} from '@material-ui/core';
import { useGetOrganizationsQuery } from '@/types/graphql';
import LoadingContainer from '@/components/loading-container';
import Link from 'next/link';
import { useFormatMessage } from '@/locales';
import React, { useState } from 'react';

const useStyles = makeStyles(() => ({
  list: {
    display: 'grid',
    gridAutoRows: 'auto',
    gap: 10,
  },
}));

/** 新規組織作成ダイアログを表示ボタン */
const OrganizationCreateButton = () => {
  const [open, setOpen] = useState(false);
  const f = useFormatMessage();
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        新規組織の作成
      </Button>

      <Dialog open={open} fullWidth={true} maxWidth="sm" disableBackdropClick disableEscapeKeyDown>
        <DialogTitle>新規組織の追加 </DialogTitle>
        <DialogContent>ダイアログの中身</DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpen(false)} color="primary">
            {f((x) => x.create)}
          </Button>
          <Button variant="outlined" onClick={() => setOpen(false)} color="primary">
            {f((x) => x.cancel)}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const IndexPage = () => {
  const classes = useStyles();
  const { loading, error, data } = useGetOrganizationsQuery();
  const f = useFormatMessage();

  return (
    <Layout title="訪問管理">
      <Typography gutterBottom variant="h2">
        {f((x) => x.affiliation_organiozation)}
      </Typography>

      <LoadingContainer loading={loading} error={error}>
        <div className={classes.list}>
          {data?.organizations.map((x) => (
            <Link href={x.name} key={x.id}>
              <Card>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
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
      </LoadingContainer>

      <Typography gutterBottom variant="h2">
        組織の操作
      </Typography>

      <OrganizationCreateButton />
    </Layout>
  );
};
export default IndexPage;
