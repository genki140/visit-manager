import React, { ReactNode, useState } from 'react';
import Head from 'next/head';
import {
  AppBar,
  Backdrop,
  Box,
  CircularProgress,
  Divider,
  Drawer,
  FormControl,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  makeStyles,
  MenuItem,
  Select,
  SvgIcon,
  Toolbar,
  Typography,
} from '@material-ui/core';
import Link from 'next/link';
import MapIcon from '@material-ui/icons/Map';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import GTranslateIcon from '@material-ui/icons/GTranslate';
import GitHubIcon from '@material-ui/icons/GitHub';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import StorageIcon from '@material-ui/icons/Storage';
import DescriptionIcon from '@material-ui/icons/Description';
import ToysIcon from '@material-ui/icons/Toys';
import { asyncLogout, useAppDispatch, useStoreState } from '@/ducks/store';
import { useRouterParams } from '@/utils/use-router-params';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { unwrapResult } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { useFormatMessage } from '@/locales';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    width: '100%',
    height: '100vh',
    maxHeight: '-webkit-fill-available',
  },
  header: {
    gridRow: '1',
  },
  toolbarButtons: {
    marginLeft: 'auto',
  },
  body: {
    gridRow: '2',
    overflow: 'auto',
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
    margin: theme.spacing(3),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

// ヘッダーとフッターを構成します。
export const Layout = (props: {
  children: ReactNode;
  title: string;
  fillContent?: boolean;
  showMenuButton?: boolean;
}) => {
  const classes = useStyles();
  const appLoading = useStoreState((x) => x.loading);
  const loginUser = useStoreState((x) => x.loginUser);
  const routerParams = useRouterParams();
  const [menuVisibled, setMenuVisibled] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const f = useFormatMessage();

  return (
    <>
      <Head>
        <title>{(routerParams.organizationName !== '' ? '訪問管理 | ' : '') + props.title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta http-equiv="content-language" content={router.locale} />
        <meta name="google" content="notranslate" />
        <meta name="theme-color" content="#5b3c88" />
      </Head>

      <div className={classes.container}>
        <header className={classes.header}>
          <AppBar position="static">
            <Toolbar>
              {
                // 組織ホームボタン
                routerParams.organizationName === '' ? (
                  <IconButton edge="start" color="inherit">
                    <MapIcon />
                  </IconButton>
                ) : (
                  <Link href={'/' + routerParams.organizationName}>
                    <IconButton edge="start" color="inherit">
                      <MapIcon />
                    </IconButton>
                  </Link>
                )
              }
              {
                // タイトル
                <Typography variant="h1">{props.title}</Typography>
              }
              {
                // 右メニュー
                (props.showMenuButton ?? true) && (
                  <div className={classes.toolbarButtons}>
                    <Link href={'/system/documents'}>
                      <IconButton edge="start" color="inherit">
                        <DescriptionIcon />
                      </IconButton>
                    </Link>

                    {/* メニュー表示 */}
                    <IconButton edge="start" color="inherit" onClick={() => setMenuVisibled(true)}>
                      <MenuIcon />
                    </IconButton>
                  </div>
                )
              }
            </Toolbar>
          </AppBar>
        </header>
        {
          // 外部から挿入されるコンテンツ
          // <div className={classes.body}>
          //   {props.fillContent === true ? props.children : <div className={classes.content}>{props.children}</div>}
          // </div>
          <div className={classes.body}>
            {props.fillContent === true ? props.children : <div className={classes.content}>{props.children}</div>}
          </div>
        }
        {
          // メニュー
          <Drawer anchor="right" open={menuVisibled} onClose={() => setMenuVisibled(false)}>
            <List style={{ minWidth: 200 }}>
              {loginUser != null ? (
                <>
                  <ListItem>
                    <ListItemIcon>
                      <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText>{loginUser.name}</ListItemText>
                  </ListItem>
                  <ListItem
                    button
                    onClick={async () => {
                      unwrapResult(await dispatch(asyncLogout())); // 自動でリダイレクトされる
                    }}
                  >
                    <ListItemIcon>
                      <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText>{f((x) => x.logout)}</ListItemText>
                  </ListItem>
                  <Divider />
                  <Link href="/">
                    <ListItem button>
                      <ListItemIcon>
                        <HomeIcon />
                      </ListItemIcon>
                      <ListItemText>{f((x) => x.home)}</ListItemText>
                    </ListItem>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/">
                    <ListItem button>
                      <ListItemIcon>
                        <AccountCircleIcon />
                      </ListItemIcon>
                      <ListItemText>{f((x) => x.login)}</ListItemText>
                    </ListItem>
                  </Link>
                </>
              )}

              <Divider />
              <ListSubheader>{f((x) => x.settings)}</ListSubheader>
              <ListItem>
                <ListItemIcon>
                  <GTranslateIcon />
                </ListItemIcon>
                <ListItemText>
                  <FormControl>
                    <Select
                      value={router.locale}
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                    >
                      {router.locales?.map((x) => (
                        <MenuItem
                          key={x}
                          value={x}
                          onClick={() => {
                            router.push(
                              {
                                pathname: router.pathname,
                                query: router.query,
                              },
                              router.asPath,
                              {
                                locale: x,
                              },
                            );
                          }}
                        >
                          {f(() => 'locale_' + x)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </ListItemText>
              </ListItem>

              <Divider />

              <ListSubheader>{f((x) => x.development)}</ListSubheader>
              <ListItem
                button
                onClick={() => {
                  window.location.href = '/system/graphql';
                }}
              >
                <ListItemIcon>
                  <SvgIcon viewBox="0 0 256 288" fillRule="evenodd">
                    <path d="M152.576 32.963l59.146 34.15a25.819 25.819 0 0 1 5.818-4.604c12.266-7.052 27.912-2.865 35.037 9.402 7.052 12.267 2.865 27.912-9.402 35.037a25.698 25.698 0 0 1-6.831 2.72v68.325a25.7 25.7 0 0 1 6.758 2.702c12.34 7.125 16.527 22.771 9.402 35.038-7.052 12.266-22.771 16.453-35.038 9.402a25.464 25.464 0 0 1-6.34-5.147l-58.786 33.94a25.671 25.671 0 0 1 1.295 8.08c0 14.103-11.458 25.636-25.635 25.636-14.177 0-25.635-11.46-25.635-25.636 0-2.52.362-4.954 1.037-7.253l-59.13-34.14a25.824 25.824 0 0 1-5.738 4.52c-12.34 7.051-27.986 2.864-35.038-9.402-7.051-12.267-2.864-27.913 9.402-35.038a25.71 25.71 0 0 1 6.758-2.703v-68.324a25.698 25.698 0 0 1-6.831-2.72C.558 99.897-3.629 84.178 3.423 71.911c7.052-12.267 22.77-16.454 35.037-9.402a25.82 25.82 0 0 1 5.79 4.575l59.163-34.159a25.707 25.707 0 0 1-1.048-7.29C102.365 11.46 113.823 0 128 0c14.177 0 25.635 11.459 25.635 25.635 0 2.548-.37 5.007-1.059 7.328zm-6.162 10.522l59.287 34.23a25.599 25.599 0 0 0 2.437 19.831c3.609 6.278 9.488 10.44 16.013 12.062v68.41c-.333.081-.664.17-.993.264L145.725 44.17c.234-.224.464-.452.689-.684zm-36.123.7l-77.432 134.11a25.824 25.824 0 0 0-1.01-.27v-68.417c6.525-1.622 12.404-5.784 16.013-12.062a25.6 25.6 0 0 0 2.427-19.869l59.27-34.22c.239.247.483.49.732.727zm24.872 6.075l77.414 134.08a25.492 25.492 0 0 0-4.513 5.757 25.7 25.7 0 0 0-2.702 6.758H50.64a25.71 25.71 0 0 0-2.704-6.758 25.825 25.825 0 0 0-4.506-5.724l77.429-134.107A25.715 25.715 0 0 0 128 51.27c2.487 0 4.89-.352 7.163-1.01zm11.795 194.478l58.902-34.008a25.865 25.865 0 0 1-.473-1.682H50.607c-.082.333-.171.663-.266.992l59.19 34.175A25.558 25.558 0 0 1 128 236.373a25.564 25.564 0 0 1 18.958 8.365z" />
                  </SvgIcon>
                </ListItemIcon>
                <ListItemText>{f((x) => x.graphql)}</ListItemText>
              </ListItem>

              <ListItem
                button
                onClick={() => {
                  window.location.href = '/system/phpmyadmin/index.php';
                }}
              >
                <ListItemIcon>
                  <StorageIcon />
                </ListItemIcon>
                <ListItemText>{f((x) => x.database)}</ListItemText>
              </ListItem>

              <Link href="https://github.com/genki140/visit-manager">
                <ListItem button>
                  <ListItemIcon>
                    <GitHubIcon />
                  </ListItemIcon>
                  <ListItemText>{f((x) => x.github)}</ListItemText>
                </ListItem>
              </Link>

              <Link href="/system/test">
                <ListItem button>
                  <ListItemIcon>
                    <ToysIcon />
                  </ListItemIcon>
                  <ListItemText>実験室</ListItemText>
                </ListItem>
              </Link>
            </List>
          </Drawer>
        }

        <Backdrop className={classes.backdrop} open={appLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </>
  );
};
export default Layout;
