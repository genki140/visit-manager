import React, { ReactNode, useState } from 'react';
import Head from 'next/head';
import {
  AppBar,
  Backdrop,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Link from 'next/link';
import MapIcon from '@material-ui/icons/Map';
import MenuIcon from '@material-ui/icons/Menu';
import { useRouter } from 'next/router';
import EditIcon from '@material-ui/icons/Edit';
import { useStoreState } from '@/ducks/store';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    // gridTemplateRows: 'auto 1fr auto',
    gridTemplateRows: 'auto 1fr',
    width: '100%',
    height: '100vh',
  },
  header: {
    gridRow: '1',
  },
  toolbarButtons: {
    marginLeft: 'auto',
  },
  body: {
    gridRow: '2',
  },
  // footer: {
  //   gridRow: '3',
  // },

  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  bottomAppBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
  content: {
    margin: 20,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

// ヘッダーとフッターを構成します。

const Layout = (props: { children: ReactNode; title: string; fillContent?: boolean; showMenuButton?: boolean }) => {
  const classes = useStyles();
  const app = useStoreState();
  const router = useRouter();
  const [menuVisibled, setMenuVisibled] = useState(false);

  const organizationName = (router.query.organizationName ?? '').toString();
  const organizationPath = '/' + organizationName;
  const areaName = (router.query.areaName ?? '').toString();
  const areaPath = (organizationName === '' ? '' : '/' + organizationName) + (areaName === '' ? '' : '/' + areaName);

  // let title = '区域管理';
  // title = organizationName !== '' ? organizationName : title;
  // title = areaName !== '' ? areaName : title;

  return (
    <div className={classes.container}>
      <Head>
        <title>{props.title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <header className={classes.header}>
        <AppBar position="static">
          <Toolbar>
            {/* 組織ホームボタン */}
            {organizationName === '' ? (
              <IconButton edge="start" color="inherit">
                <MapIcon />
              </IconButton>
            ) : (
              <Link href={organizationPath}>
                <IconButton edge="start" color="inherit">
                  <MapIcon />
                </IconButton>
              </Link>
            )}

            {/* タイトル */}
            <Typography variant="h1">{props.title}</Typography>

            {/* 右メニュー */}
            {(props.showMenuButton ?? true) && (
              <div className={classes.toolbarButtons}>
                {/* 編集開始 */}
                <Link href={areaPath + '/settings'}>
                  <IconButton edge="start" color="inherit">
                    <EditIcon />
                  </IconButton>
                </Link>

                {/* メニュー表示 */}
                <IconButton edge="start" color="inherit" onClick={() => setMenuVisibled(true)}>
                  <MenuIcon />
                </IconButton>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </header>

      {/* <Link href={areaPath + '/settings'}>
                <IconButton color="inherit">
                  <Settings />
                </IconButton>
              </Link>
              <Link href="/login">
                <IconButton edge="end" color="inherit">
                  <AccountCircle />
                </IconButton>
              </Link> */}

      {/* 外部から挿入されるコンテンツ */}
      <div className={classes.body}>
        {props.fillContent === true ? props.children : <div className={classes.content}>{props.children}</div>}
      </div>

      {/* メニュー */}
      <Drawer anchor="right" open={menuVisibled} onClose={() => setMenuVisibled(false)}>
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Backdrop className={classes.backdrop} open={app.loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* <header className={classes.footer}>
        <AppBar position="static">
          <Toolbar>
            <Link href={organizationPath}>
              <IconButton edge="start" color="inherit">
                <MapIcon />
              </IconButton>
            </Link> */}

      {/* <IconButton edge="start" color="inherit" aria-label="open drawer">
              <MenuIcon />
            </IconButton> */}
      {/* <Fab color="secondary" aria-label="add" className={classes.fabButton}>
              <AddIcon />
            </Fab> */}
      {/* <div className={classes.grow} /> */}
      {/* <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
            <IconButton edge="end" color="inherit">
              <MoreIcon />
            </IconButton> */}

      {/* <div className={classes.toolbarButtons}>
              <IconButton edge="end" color="inherit">
                <GestureIcon />
              </IconButton>
              <IconButton edge="end" color="inherit">
                <SaveIcon />
              </IconButton>
              <IconButton edge="end" color="inherit">
                <ClearIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </header> */}
    </div>
  );
};
export default Layout;
