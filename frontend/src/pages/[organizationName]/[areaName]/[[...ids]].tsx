import { useRef } from 'react';
import { Fab, makeStyles, Slide } from '@material-ui/core';
import { useRouter } from 'next/router';
import { Layout } from '@/components/layout';
import Map, { MapOutput } from '@/components/map';
// import AddIcon from '@material-ui/icons/Add';
import HouseIcon from '@material-ui/icons/House';
import Crop54Icon from '@material-ui/icons/Crop54';
// import RestoreIcon from '@material-ui/icons/Restore';
import { actions, MapEditType, useAppDispatch, useStoreState } from '@/ducks/store';
import MapData from '@/components/map-data';
import ApartmentIcon from '@material-ui/icons/Apartment';
import DeleteIcon from '@material-ui/icons/Delete';
import { Custom404 } from '@/pages/404';

// 地図ページ。設定画面と兼用

const useStyle = makeStyles((theme) => ({
  button: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

// 会衆＆区域でユーザーの区域情報を取得する

const AreaPage = () => {
  // styles
  const classes = useStyle();

  // refs
  const mapRef = useRef({} as MapOutput);

  // local states
  // const [roomEditTargetRoomId, setRoomEditTargetRoomId] = useState<number | undefined>();

  // radux
  const dispatch = useAppDispatch();
  const mapEditType = useStoreState((x) => x.map.editType);
  const selectedResidenceId = useStoreState((x) => x.map.selectedResidenceId);

  // router
  const router = useRouter();
  // const organizationName = (router.query.organizationName ?? '').toString();
  // const organizationPath = '/' + organizationName;
  const areaName = (router.query.areaName ?? '').toString();
  // const areaPath = (organizationName === '' ? '' : '/' + organizationName) + (areaName === '' ? '' : '/' + areaName);

  // // ユーザーがこの組織に所属していなければ404
  // if (error != null) {
  //   const errorCode = error.graphQLErrors?.[0]?.extensions?.['code'];
  //   if (errorCode === 'NOT_FOUND') {
  //     return <Custom404 />;
  //   }
  // }

  // この区域がユーザーに配られていなければ404を表示する
  if (router.query.id == null) {
    // 通常モード
  } else if (router.query.ids?.[0] === 'settings') {
    // 設定モード
    // 設定モードでは、保存とキャンセルの操作を下に表示？
  } else {
    return <Custom404 />;
  }

  return (
    <Layout title={areaName} fillContent={true}>
      <Map ref={mapRef}>
        <MapData />
      </Map>

      <Slide direction="up" in={router.query.ids?.[0] === 'settings'} mountOnEnter unmountOnExit>
        <div className={classes.button}>
          <Fab
            color={mapEditType === MapEditType.Residence ? 'primary' : undefined}
            onClick={async () => {
              dispatch(actions.setMapEditType({ editType: MapEditType.Residence }));
            }}
          >
            <HouseIcon />
          </Fab>

          {mapEditType === MapEditType.Residence ? (
            <Fab
              disabled={selectedResidenceId == null}
              color={'secondary'}
              onClick={async () => {
                //
              }}
            >
              <DeleteIcon />
            </Fab>
          ) : null}

          <Fab
            color={mapEditType === MapEditType.Room ? 'primary' : undefined}
            onClick={async () => {
              dispatch(actions.setMapEditType({ editType: MapEditType.Room }));
            }}
          >
            <ApartmentIcon />
          </Fab>

          <Fab
            color={mapEditType === MapEditType.Polygon ? 'primary' : undefined}
            onClick={async () => {
              dispatch(actions.setMapEditType({ editType: MapEditType.Polygon }));
            }}
          >
            <Crop54Icon />
          </Fab>
        </div>
      </Slide>

      {/* <BottomNavigation
        // value={value}
        // onChange={(event, newValue) => {
        //   setValue(newValue);
        // }}
        showLabels
        // className={classes.root}
      >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Nearby" icon={<RestoreIcon />} />
      </BottomNavigation> */}
    </Layout>
  );
};
export default AreaPage;
