import { actions, asyncRefreshLoginUser, useAppDispatch, useStoreState } from '@/ducks/store';
import { useGetCurrentUserQuery, User } from '@/types/graphql';
import { unwrapResult } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Loading } from '../loading';

export const LoginUserProvider = (props: { children: any }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isLimitedPage =
    router.pathname !== '/system/login' && router.pathname.startsWith('/system/documents') === false;

  // // ユーザー情報の取得（ログインページであれば無視）
  // const getCurrentUserResult = useGetCurrentUserQuery();

  const loginUser = useStoreState((x) => x.loginUser);

  // console.log(getCurrentUserResult.data);

  const [inited, setInited] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      if (inited === false) {
        setInited(true);

        // 以下非同期
        let unmounted = false;
        const f = async () => {
          try {
            // ログインユーザー情報取得
            console.log('test');
            const user = unwrapResult(await dispatch(asyncRefreshLoginUser()));
            if (!unmounted) {
              dispatch(actions.setLoginUser(user));
            }
          } catch (e) {
            // ログインエラー時、現在のURLを記録してログイン画面に転送
            if (!unmounted) {
              if (isLimitedPage) {
                console.log('redirect login');
                dispatch(actions.setLoginSrcPath({ pathname: router.pathname, query: router.query }));
                router.push('/system/login');
              }
            }
          }
        };
        f();
        const cleanup = () => {
          unmounted = true;
        };
        return cleanup;

        // if (router.isReady) {
        //   if (getCurrentUserResult.error != null && isNoLimitPage === false) {
        //     // ログインページにリダイレクト
        //     console.log('redirect login');
        //     dispatch(actions.setLoginSrcPath({ pathname: router.pathname, query: router.query }));
        //     router.push('/system/login');
        //   } else if (getCurrentUserResult.data != null) {
        //     // ログイン時以下の処理が何回か呼び出されるのがちょっと気になる。。。
        //     // console.log('success login');
        //     dispatch(actions.setLoginUser(getCurrentUserResult.data.currentUser as User));
        //   }
        // }
        // }, [getCurrentUserResult.error, getCurrentUserResult.data, router.isReady, loginUser]);
      } else {
        if (loginUser == null && isLimitedPage) {
          // 情報の再取得はしないけど、リダイレクトはする
          console.log('redirect login');
          dispatch(actions.setLoginSrcPath({ pathname: router.pathname, query: router.query }));
          router.push('/system/login');
        }
      }
    }
  }, [loginUser, router]);

  if (isLimitedPage && loginUser == null) {
    console.log('loading');
    return <Loading />;
  }

  return props.children;
};
