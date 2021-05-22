import { actions, asyncRefreshLoginUser, useAppDispatch, useStoreState } from '@/ducks/store';
import { unwrapResult } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Loading } from '../loading';

export const LoginUserProvider = (props: { children: any }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const loginUserId = useStoreState((x) => x.loginUser?.id);
  const [inited, setInited] = useState(false);

  const isLimitedPage =
    router.pathname !== '/system/login' && router.pathname.startsWith('/system/documents') === false;

  useEffect(() => {
    if (router.isReady) {
      if (inited === false) {
        setInited(true);

        // 以下非同期
        let unmounted = false;
        const f = async () => {
          try {
            // ログインユーザー情報取得
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
      } else {
        if (loginUserId == null && isLimitedPage) {
          // 情報の再取得はしないけど、リダイレクトはする
          console.log('redirect login');
          dispatch(actions.setLoginSrcPath({ pathname: router.pathname, query: router.query }));
          router.push('/system/login');
        }
      }
    }
  }, [loginUserId, router.asPath]);

  if (isLimitedPage && loginUserId == null) {
    return <Loading />;
  }

  return props.children;
};
