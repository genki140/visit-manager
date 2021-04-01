import Layout from '@/components/layout';
import React, { useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  createStyles,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core';
import appSlice, { asyncLogin } from '@/ducks/app';
import { useAppDispatch } from '@/ducks/store';
import Router from 'next/router';
import { unwrapResult } from '@reduxjs/toolkit';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`,
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff',
    },
    card: {
      marginTop: theme.spacing(10),
    },
  }),
);

const AboutPage = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Layout title="ログイン">
      <Card className={classes.container}>
        <CardHeader>ログイン</CardHeader>
        <CardContent>
          <TextField
            label="ユーザー名"
            value={username}
            onChange={(e) => {
              e.preventDefault();
              setUsername(e.target.value);
            }}
          />
          <TextField
            label="パスワード"
            value={password}
            type="password"
            onChange={(e) => {
              e.preventDefault();
              setPassword(e.target.value);
            }}
          />
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={async () => {
              unwrapResult(await dispatch(asyncLogin({ username, password })));
              Router.push('/');
            }}
          >
            Login
          </Button>
        </CardActions>
      </Card>
    </Layout>
  );
};
export default AboutPage;
