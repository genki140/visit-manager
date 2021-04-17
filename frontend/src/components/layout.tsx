import React, { ReactNode } from 'react';
import Head from 'next/head';
import {
  AppBar,
  Backdrop,
  CircularProgress,
  Fab,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { AccountCircle, Settings } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';
import GestureIcon from '@material-ui/icons/Gesture';
import { useAppState } from '@/ducks/app';
import Link from 'next/link';
import MapIcon from '@material-ui/icons/Map';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
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
  footer: {
    gridRow: '3',
  },

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

const Layout = (props: { children: ReactNode; title: string; fillContent?: boolean }) => {
  const classes = useStyles();
  const app = useAppState().app;
  const router = useRouter();
  const organizationName = (router.query.organizationName ?? '').toString();
  const organizationPath = '/' + organizationName;
  const areaName = (router.query.areaName ?? '').toString();
  const areaPath = (organizationName === '' ? '' : '/' + organizationName) + (areaName === '' ? '' : '/' + areaName);

  let title = '区域管理';
  title = organizationName !== '' ? organizationName : title;
  title = areaName !== '' ? areaName : title;

  return (
    <div className={classes.container}>
      <Backdrop className={classes.backdrop} open={app.loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Head>
        <title>{props.title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <header className={classes.header}>
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton edge="start" color="inherit">
              <MenuIcon />
            </IconButton> */}

            <Typography variant="h1">{title}</Typography>
            <div className={classes.toolbarButtons}>
              <Link href={areaPath + '/settings'}>
                <IconButton color="inherit">
                  <Settings />
                </IconButton>
              </Link>
              <Link href="/login">
                <IconButton color="inherit">
                  <AccountCircle />
                </IconButton>
              </Link>
            </div>
          </Toolbar>
        </AppBar>
      </header>

      <div className={classes.body}>
        {props.fillContent === true ? props.children : <div className={classes.content}>{props.children}</div>}
      </div>

      <header className={classes.footer}>
        <AppBar position="static">
          <Toolbar>
            <Link href={organizationPath}>
              <IconButton edge="start" color="inherit">
                <MapIcon />
              </IconButton>
            </Link>

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

            <div className={classes.toolbarButtons}>
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
      </header>
    </div>
  );
};
export default Layout;
