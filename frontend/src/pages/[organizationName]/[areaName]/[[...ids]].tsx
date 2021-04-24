import React, { useRef, useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Button, Drawer, Fab, makeStyles, Slide } from '@material-ui/core';
import { useRouter } from 'next/router';
import Layout from '@/components/layout';
import Map, { MapOutput } from '@/components/map';
import ErrorPage from 'next/error';
import AddIcon from '@material-ui/icons/Add';
import { Marker, Polygon } from '@react-google-maps/api';
import HouseIcon from '@material-ui/icons/House';
import Crop54Icon from '@material-ui/icons/Crop54';
import RestoreIcon from '@material-ui/icons/Restore';
import { gql } from '@apollo/client';
import { useGetUserAreaQuery, useCreateResidenceMutation, useUpdateResidenceMutation } from '@/types/graphql';
import { actions, MapEditType, useAppDispatch, useStoreState } from '@/ducks/store';
import MapData, { getUserAreaGql } from '@/components/map-data';
import { assertNonNullType } from 'graphql';
import EditIcon from '@material-ui/icons/Edit';
import ApartmentIcon from '@material-ui/icons/Apartment';
import DeleteIcon from '@material-ui/icons/Delete';

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

  // radux states

  const dispatch = useAppDispatch();
  const mapLoaded = useStoreState((x) => x.map.loaded);
  const mapEditType = useStoreState((x) => x.map.editType);
  const selectedResidenceId = useStoreState((x) => x.map.selectedResidenceId);

  // router

  const router = useRouter();
  const organizationName = (router.query.organizationName ?? '').toString();
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
    return <ErrorPage statusCode={404} />;
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

      {/* 部屋選択 */}
      {/* <Drawer
            anchor="bottom"
            open={selectedResidenceId != null && roomEditTargetRoomId == null}
            onClose={() => setSelectedResidenceId(undefined)}
          >
            <div>部屋選択</div>
            <div
              style={{
                display: 'grid',
                gridTemplateRows: 'repeat(3,50)',
                gridTemplateColumns: 'repeat(15,1fr)',
                gap: 5,
                margin: 5,
              }}
            >
              <Button
                variant="contained"
                style={{
                  gridColumn: 1,
                  gridRow: 3,
                  minWidth: 0,
                }}
              >
                101
              </Button>
              <Button
                variant="contained"
                style={{
                  gridColumn: 2,
                  gridRow: 3,
                  minWidth: 0,
                }}
              >
                101
              </Button>
              <Button
                variant="contained"
                style={{
                  gridColumn: 2,
                  gridRow: 2,
                  minWidth: 0,
                }}
              >
                202
              </Button>
              <Button
                variant="contained"
                style={{
                  gridColumn: 3,
                  gridRow: 2,
                  minWidth: 0,
                }}
              >
                203
              </Button>
              <Button
                variant="contained"
                style={{
                  gridColumn: 4,
                  gridRow: 2,
                  minWidth: 0,
                }}
              >
                204
              </Button>
              <Button
                variant="contained"
                style={{
                  gridColumn: 15,
                  gridRow: 1,
                  minWidth: 0,
                }}
                onClick={() => {
                  setRoomEditTargetRoomId(1);
                }}
              >
                3015
              </Button>
            </div>
          </Drawer>

          <Drawer
            anchor="bottom"
            open={roomEditTargetRoomId != null}
            onClose={() => {
              setSelectedResidenceId(undefined);
              setRoomEditTargetRoomId(undefined);
            }}
          >
            <div>操作</div>

            <Button variant="contained" startIcon={<DoneRoundedIcon />}>
              完了
            </Button>
            <Button variant="contained" startIcon={<BlockRoundedIcon />}>
              拒否
            </Button>
            <Button variant="contained">不在</Button>

            <Button
              variant="contained"
              startIcon={<KeyboardBackspaceRoundedIcon />}
              onClick={() => {
                setRoomEditTargetRoomId(undefined);
              }}
            >
              部屋一覧
            </Button>
          </Drawer> */}
    </Layout>
  );
};
export default AreaPage;
