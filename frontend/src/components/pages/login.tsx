import { Layout } from '@/components/layouts';
import React, { useState } from 'react';
import { actions, asyncLogin, useAppDispatch, useStoreState } from '@/ducks/store';
import { unwrapResult } from '@reduxjs/toolkit';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  List,
  ListItem,
  makeStyles,
  TextField,
  Theme,
  Typography,
  Button,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import { useFormatMessage } from '@/locales';
import { UserCreateButton } from '@/components/dialogs/user-create-button';

const useStyles = makeStyles((theme: Theme) => ({
  // inlineBlock: {
  //   display: 'block',
  // },
  // loginCard: {
  //   margin: 'auto',
  // },
  // container: {
  //   display: 'flex',
  //   flexWrap: 'wrap',
  //   width: 400,
  //   margin: `${theme.spacing(0)} auto`,
  // },
  // loginBtn: {
  //   marginTop: theme.spacing(2),
  //   flexGrow: 1,
  // },
  // header: {
  //   textAlign: 'center',
  //   background: '#212121',
  //   color: '#fff',
  // },
  // card: {
  //   marginTop: theme.spacing(10),
  // },
}));

export const Login = () => {
  // const classes = useStyles();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const loginSrcRoute = useStoreState((x) => x.loginSrcRoute);
  const f = useFormatMessage();
  const classes = useStyles();

  const login = async () => {
    try {
      dispatch(actions.setLoginUser(unwrapResult(await dispatch(asyncLogin({ username, password })))));

      if (loginSrcRoute == null) {
        await router.push('/');
      } else {
        // console.log(loginSrcRoute);
        await router.push({
          pathname: loginSrcRoute.pathname,
          query: loginSrcRoute.query,
        });
      }
    } catch (e) {
      // console.log(e);
      // とりあえず適当なエラーメッセージ
      setError('ログインに失敗しました');
    }
  };

  return (
    <Layout layoutType="center">
      <List>
        <ListItem>
          <Card variant="outlined">
            <Box m={2}>
              <CardContent>
                <Box mb={2} textAlign="center">
                  <Typography variant="h2" color="textPrimary">
                    {f((x) => x.login)}
                  </Typography>
                </Box>
                {
                  // username
                  <Box my={1}>
                    <TextField
                      label={f((x) => x.user_id)}
                      value={username}
                      autoCapitalize="off"
                      onChange={(e) => {
                        e.preventDefault();
                        setUsername(e.target.value);
                      }}
                      onKeyDown={async (e) => {
                        if (e.key === 'Enter') {
                          await login();
                        }
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                      }}
                    />
                  </Box>
                }
                {
                  // password
                  <Box my={1}>
                    <TextField
                      label={f((x) => x.password)}
                      value={password}
                      type="password"
                      onChange={(e) => {
                        e.preventDefault();
                        setPassword(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          login();
                        }
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                      }}
                    />
                  </Box>
                }
                <Box my={1}>{error}</Box>
              </CardContent>
              <CardActions>
                <Box mx={1} width="100%">
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    onClick={login}
                    fullWidth
                    style={{
                      marginBottom: 10,
                    }}
                  >
                    {f((x) => x.login)}
                  </Button>
                  <UserCreateButton
                    onCreated={async (username, password) => {
                      setUsername(username);
                      setPassword(password);
                      await login();
                    }}
                  />
                </Box>
              </CardActions>
            </Box>
          </Card>
        </ListItem>
      </List>

      {/* <Box maxWidth={300} mx="auto" mt={10}>
        <Typography gutterBottom variant="h2">
          {'ログイン'}
        </Typography>

        <Box m={1}>
          <TextField
            label={f((x) => x.username)}
            value={username}
            onChange={(e) => {
              e.preventDefault();
              setUsername(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                login();
              }
            }}
            style={{
              width: '100%',
              display: 'flex',
            }}
          />
        </Box>
        <Box m={1}>
          <TextField
            label={f((x) => x.password)}
            value={password}
            type="password"
            onChange={(e) => {
              e.preventDefault();
              setPassword(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                login();
              }
            }}
            style={{
              width: '100%',
              display: 'flex',
            }}
          />
        </Box>

        <Box m={1}>{error}</Box>

        <Button variant="contained" size="large" color="secondary" onClick={login} fullWidth>
          {f((x) => x.login)}
        </Button>

        <Button variant="contained" size="large" onClick={login} fullWidth>
          {'新規アカウント作成'}
        </Button>
      </Box> */}
    </Layout>
  );
};