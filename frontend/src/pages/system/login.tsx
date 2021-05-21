import { Layout } from '@/components/layouts';
import { useState } from 'react';
import { asyncLogin, useAppDispatch, useStoreState } from '@/ducks/store';
import { unwrapResult } from '@reduxjs/toolkit';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/client';
import { useFormatMessage } from '@/locales';

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
  const [error, setError] = useState('');
  // const apolloClient = useApolloClient();
  const loginSrcRoute = useStoreState((x) => x.loginSrcRoute);
  const f = useFormatMessage();

  const login = async () => {
    try {
      unwrapResult(await dispatch(asyncLogin({ username, password })));
      // await apolloClient.reFetchObservableQueries(); // すべてのクエリを再取得させる。

      // router.push(loginSrcPath ?? '/', loginSrcPath ?? '/'); // 前のページに戻る
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
      console.log(e);
      // とりあえず適当なエラーメッセージ
      setError('ログインに失敗しました');
    }
  };

  return (
    <Layout title={f((x) => x.login)}>
      <div
        style={{
          maxWidth: 500,
          margin: 'auto',
        }}
      >
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
        <div
          style={{
            display: 'flex',
            marginTop: 10,
          }}
        >
          <div
            style={{
              marginRight: 'auto',
            }}
          >
            {error}
          </div>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={login}
            style={{
              marginLeft: 'auto',
            }}
          >
            {f((x) => x.login)}
          </Button>
        </div>
      </div>
    </Layout>
  );
};
export default LoginPage;
