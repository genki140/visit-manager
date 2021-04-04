import React from 'react';
import { Tab, Tabs } from '@material-ui/core';
import { useRouter } from 'next/router';
import Layout from '@/components/layout';
import MainSettings from '@/components/settings/main';
import UserSettings from '@/components/settings/users';
import ErrorPage from 'next/error';
import Link from 'next/link';

// ファイル名[[...id]].tsxは、settings以降の存在する全てのパスに対応する。

// const useStyles = makeStyles((theme) => ({}));

const SettingsPage = () => {
  // const classes = useStyles();
  // const app = useAppState().app;
  const router = useRouter();

  // 設定URLとコンポーネント対応
  const settings = [
    {
      url: '',
      title: '基本設定',
      component: () => <MainSettings />,
    },
    {
      url: 'users',
      title: 'ユーザー設定',
      component: () => <UserSettings />,
    },
  ];
  const settingIndex = settings.findIndex((x) => x.url === ((router.query.id ?? [])[0] ?? ''));
  if ((router.query.id?.length ?? 0) >= 2 || settingIndex === -1) {
    return <ErrorPage statusCode={404} />;
  }
  const setting = settings[settingIndex];

  return (
    <Layout title={setting.title}>
      <Tabs value={settingIndex} aria-label="simple tabs example">
        {settings.map((x) => (
          <Link href="/settings" as={'/settings' + (x.url === '' ? '' : '/' + x.url)}>
            <Tab label={x.title} />
          </Link>
        ))}
      </Tabs>
      {setting.component()}
    </Layout>
  );
};
export default SettingsPage;

// 縦表示の設定のサンプル

// import Layout from '@/components/layout';
// import React, { useState } from 'react';
// import {
//   Box,
//   Button,
//   Card,
//   CardActions,
//   CardContent,
//   CardHeader,
//   createStyles,
//   makeStyles,
//   Tab,
//   Tabs,
//   TextField,
//   Theme,
//   Typography,
// } from '@material-ui/core';
// import { asyncLogin } from '@/ducks/app';
// import { useAppDispatch } from '@/ducks/store';
// import Router from 'next/router';
// import { unwrapResult } from '@reduxjs/toolkit';
// import PropTypes from 'prop-types';
// import Link from 'next/link';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.paper,
//     display: 'flex',
//     // height: 224,
//     height: '100%',
//   },
//   tabs: {
//     borderRight: `1px solid ${theme.palette.divider}`,
//   },
// }));

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`vertical-tabpanel-${index}`}
//       aria-labelledby={`vertical-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box p={3}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

// function a11yProps(index: number) {
//   return {
//     id: `vertical-tab-${index}`,
//     'aria-controls': `vertical-tabpanel-${index}`,
//   };
// }
// import ErrorPage from 'next/error';
// // import { BrowserRouter as BrowserRouter, Switch, Route, useRouteMatch, useParams } from 'react-router-dom';

// const SettingsPage = () => {
//   const classes = useStyles();
//   const dispatch = useAppDispatch();

//   const [value, setValue] = React.useState(0);
//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   // const match = useRouteMatch();

//   // return <ErrorPage statusCode={404} />;

//   return (
//     <Layout title="設定">
//       {/* <BrowserRouter>
//         <Switch>
//           <Route path={`${match.path}/users`}>設定：ユーザー</Route>
//           <Route path={`${match.path}/maps`}>設定：マップ</Route>
//           <Route path={match.path}>設定：インデックス</Route>
//         </Switch>
//       </BrowserRouter> */}

//       <div className={classes.root}>
//         <Tabs>
//           <Link href="/settings/abc">
//             <Tab label="abc" />
//           </Link>
//           <Link href="/settings/def">
//             <Tab label="def" />
//           </Link>
//         </Tabs>

//         {/* <Switch>
//           <Route exact path="/settings/users">
//             ゆーざーず
//           </Route>
//           <Route path="/settings/maps">まっぷす</Route>
//         </Switch> */}

//         {/* <Tabs
//           orientation="vertical"
//           variant="scrollable"
//           value={value}
//           onChange={handleChange}
//           className={classes.tabs}
//         >
//           <Tab label="地図設定" {...a11yProps(0)} />
//           <Tab label="ユーザー設定" {...a11yProps(1)} />
//           <Tab label="Item Three" {...a11yProps(2)} />
//           <Tab label="Item Four" {...a11yProps(3)} />
//           <Tab label="Item Five" {...a11yProps(4)} />
//           <Tab label="Item Six" {...a11yProps(5)} />
//           <Tab label="Item Seven" {...a11yProps(6)} />
//         </Tabs>
//         <TabPanel value={value} index={0}>
//           地図設定
//         </TabPanel>
//         <TabPanel value={value} index={1}>
//           ユーザー設定
//         </TabPanel>
//         <TabPanel value={value} index={2}>
//           Item Three
//         </TabPanel>
//         <TabPanel value={value} index={3}>
//           Item Four
//         </TabPanel>
//         <TabPanel value={value} index={4}>
//           Item Five
//         </TabPanel>
//         <TabPanel value={value} index={5}>
//           Item Six
//         </TabPanel>
//         <TabPanel value={value} index={6}>
//           Item Seven
//         </TabPanel> */}
//       </div>
//     </Layout>
//   );
// };
// export default SettingsPage;
