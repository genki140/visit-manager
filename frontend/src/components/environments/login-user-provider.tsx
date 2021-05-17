import { actions, useAppDispatch } from '@/ducks/store';
import { useGetCurrentUserQuery, User } from '@/types/graphql';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Loading } from '../loading';

export const LoginUserProvider = (props: { children: any }) => {
  const router = useRouter();

  const isNoLimitPage = router.pathname === '/system/login' || router.pathname.startsWith('/system/documents');

  const dispatch = useAppDispatch();

  // ユーザー情報の取得（ログインページであれば無視）
  const getCurrentUserResult = useGetCurrentUserQuery();

  // console.log(getCurrentUserResult.data);

  useEffect(() => {
    if (router.isReady) {
      if (getCurrentUserResult.error != null && isNoLimitPage === false) {
        // ログインページにリダイレクト
        dispatch(actions.setLoginSrcPath({ pathname: router.pathname, query: router.query }));
        // console.log('redirect login');
        router.push('/system/login');
      } else if (getCurrentUserResult.data != null) {
        // console.log('success login');
        dispatch(actions.setLoginUser(getCurrentUserResult.data.currentUser as User));
      }
    }
  }, [getCurrentUserResult.error, getCurrentUserResult.data, router.isReady]);

  if (isNoLimitPage === false && getCurrentUserResult.data == null) {
    return <Loading />;
  }

  return props.children;
};
