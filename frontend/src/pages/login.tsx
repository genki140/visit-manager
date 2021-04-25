import { Layout } from '@/components/layout';
import { useState } from 'react';
// import { Button, createStyles, makeStyles, TextField, Theme } from '@material-ui/core';
import { asyncLogin, useAppDispatch } from '@/ducks/store';
import { unwrapResult } from '@reduxjs/toolkit';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     container: {
//       display: 'flex',
//       flexWrap: 'wrap',
//       width: 400,
//       margin: `${theme.spacing(0)} auto`,
//     },
//     loginBtn: {
//       marginTop: theme.spacing(2),
//       flexGrow: 1,
//     },
//     header: {
//       textAlign: 'center',
//       background: '#212121',
//       color: '#fff',
//     },
//     card: {
//       marginTop: theme.spacing(10),
//     },
//   }),
// );

const LoginPage = () => {
  // const classes = useStyles();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Layout title="ログイン" showMenuButton={false}>
      <div
        style={{
          maxWidth: 500,
          margin: 'auto',
        }}
      >
        <TextField
          label="ユーザー名"
          value={username}
          onChange={(e) => {
            e.preventDefault();
            setUsername(e.target.value);
          }}
          style={{
            width: '100%',
            display: 'flex',
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
          style={{
            width: '100%',
            display: 'flex',
          }}
        />
        <Button
          variant="contained"
          size="large"
          color="secondary"
          onClick={async () => {
            unwrapResult(await dispatch(asyncLogin({ username, password })));
            router.push('/');
          }}
          style={{
            display: 'flex',
            marginTop: 10,
            marginLeft: 'auto',
          }}
        >
          Login
        </Button>
      </div>

      {/* 
      <Card className={classes.container}>
        <CardHeader>ログイン</CardHeader>
        <CardContent>
          <div>
            <TextField
              label="ユーザー名"
              value={username}
              onChange={(e) => {
                e.preventDefault();
                setUsername(e.target.value);
              }}
            />
          </div>
          <div>
            <TextField
              label="パスワード"
              value={password}
              type="password"
              onChange={(e) => {
                e.preventDefault();
                setPassword(e.target.value);
              }}
            />
          </div>
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
      </Card>*/}
    </Layout>
  );
};
export default LoginPage;
