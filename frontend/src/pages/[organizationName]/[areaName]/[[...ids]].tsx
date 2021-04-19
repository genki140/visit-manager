import React from 'react';
import { createStyles, Fab, makeStyles, Slide, Zoom } from '@material-ui/core';
import { useRouter } from 'next/router';
import Layout from '@/components/layout';
import Map from '@/components/map';
import ErrorPage from 'next/error';
import AddIcon from '@material-ui/icons/Add';

// 地図ページ。設定画面と兼用

const useStyle = makeStyles((theme) => ({
  button: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const IndexPage = () => {
  const classes = useStyle();
  const router = useRouter();
  // const organizationName = (router.query.organizationName ?? '').toString();
  // const organizationPath = '/' + organizationName;
  const areaName = (router.query.areaName ?? '').toString();
  // const areaPath = (organizationName === '' ? '' : '/' + organizationName) + (areaName === '' ? '' : '/' + areaName);

  // この区域がユーザーに配られていなければ404を表示する
  if (router.query.id == null) {
    // 通常モード
  } else if (router.query.ids?.[0] === 'settings') {
    // 設定モード
    // 設定モードでは、保存とキャンセルの操作を下に表示？
  } else {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout title={areaName} fillContent={true}>
      <Map />
      <Slide direction="up" in={router.query.ids?.[0] === 'settings'} mountOnEnter unmountOnExit>
        <div className={classes.button}>
          <Fab color="secondary">
            <AddIcon />
          </Fab>
        </div>
      </Slide>
      {/* <Zoom in={router.query.ids?.[0] === 'settings'} style={{ transitionDelay: '500ms' }}> */}
    </Layout>
  );
};
export default IndexPage;
