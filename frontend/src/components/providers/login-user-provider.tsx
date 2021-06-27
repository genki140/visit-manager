import { actions, useAppDispatch, useStoreState } from '@/ducks/store';
import { useGetCurrentUserQuery } from '@/types/graphql';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Loading } from '../loading';

export const LoginUserProvider = (props: { children: any }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const currentUser = useGetCurrentUserQuery();
  const [inited, setInited] = useState(false);
  const currentUserRefreshCount = useStoreState((x) => x.currentUserRefreshCount);
  const loginSrcRoute = useStoreState((x) => x.loginSrcRoute);

  // ログインしないと見えないページかどうかを判定
  const isLimitedPage =
    router.pathname !== '/system/login' && router.pathname.startsWith('/system/documents') === false;

  // currentUserのリフレッシュ要求があればここでリフレッシュ
  useEffect(() => {
    // console.log('currentUser.refetch');
    currentUser.refetch();
  }, [currentUserRefreshCount]);

  // console.log(currentUser.data?.currentUser);

  const currentUserState = currentUser.loading ? undefined : currentUser.data != null;
  useEffect(() => {
    // console.log('currentUserState:' + currentUserState);

    // ユーザー情報が存在しない所から取得出来たら、初期化が完了している場合はルート又は前の画面に移動
    if (currentUserState === true && inited === true) {
      if (loginSrcRoute == null) {
        router.push('/');
      } else {
        router.push({
          pathname: loginSrcRoute.pathname,
          query: loginSrcRoute.query,
        });
      }
    }
    // ユーザー情報が存在する所から無効になったらログイン画面に移動
    else if (currentUserState === false && isLimitedPage) {
      dispatch(actions.setLoginSrcPath({ pathname: router.pathname, query: router.query }));
      router.push('/system/login');
    }

    if (currentUserState != null) {
      setInited(true);
    }
  }, [currentUserState]); // ロード常態かログイン有無が変更された場合に実行

  // useEffect(() => {
  //   if (router.isReady) {
  //     if (inited === false) {
  //       setInited(true);

  //       // 以下非同期
  //       let unmounted = false;
  //       const f = async () => {
  //         try {
  //           // ログインユーザー情報取得
  //           unwrapResult(await dispatch(asyncRefreshLoginUser()));
  //         } catch (e) {
  //           // ログインエラー時、現在のURLを記録してログイン画面に転送
  //           if (!unmounted) {
  //             if (isLimitedPage) {
  //               console.log('redirect to login');
  //               dispatch(actions.setLoginSrcPath({ pathname: router.pathname, query: router.query }));
  //               router.push('/system/login');
  //             }
  //           }
  //         }
  //       };
  //       f();
  //       const cleanup = () => {
  //         unmounted = true;
  //       };
  //       return cleanup;
  //     } else {
  //       if (currentUser.data == null && isLimitedPage) {
  //         // 情報の再取得はしないけど、リダイレクトはする
  //         console.log('redirect login');
  //         dispatch(actions.setLoginSrcPath({ pathname: router.pathname, query: router.query }));
  //         router.push('/system/login');
  //       }
  //     }
  //   }
  // }, [currentUser.data?.currentUser.id, router.asPath, router.isReady]);

  if (isLimitedPage && currentUserState == false) {
    return <Loading />;
  }

  return props.children;
};
