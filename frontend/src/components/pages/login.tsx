import { Layout } from '@/components/layouts';
import React, { useState } from 'react';
import { actions, asyncLogin, useAppDispatch, useStoreState } from '@/ducks/store';
import { unwrapResult } from '@reduxjs/toolkit';
import { Box, Card, CardActions, CardContent, TextField, Typography, Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useFormatMessage } from '@/locales';
import { UserCreateButton } from '@/components/dialogs/user-create-button';

export const Login = () => {
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const f = useFormatMessage();

  const login = async (username: string, password: string) => {
    try {
      unwrapResult(await dispatch(asyncLogin({ username, password })));
      // dispatch(actions.setLoginUser(unwrapResult(await dispatch(asyncLogin({ username, password })))));

      // if (loginSrcRoute == null) {
      //   await router.push('/');
      // } else {
      //   // console.log(loginSrcRoute);
      //   await router.push({
      //     pathname: loginSrcRoute.pathname,
      //     query: loginSrcRoute.query,
      //   });
      // }
    } catch (e) {
      console.log(e);
      // とりあえず適当なエラーメッセージ
      setError('ログインに失敗しました');
    }
  };

  return (
    <Layout layoutType="center">
      <Box mt={3} mb={9} px="15px" width="100%" maxWidth="700px">
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
                        await login(username, password);
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
                    onKeyDown={async (e) => {
                      if (e.key === 'Enter') {
                        await login(username, password);
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
                  onClick={() => login(username, password)}
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
                    await login(username, password);
                  }}
                />
              </Box>
            </CardActions>
          </Box>
        </Card>
      </Box>
    </Layout>
  );
};
