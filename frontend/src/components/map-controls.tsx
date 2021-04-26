import { actions, MapEditType, useAppDispatch, useStoreState } from '@/ducks/store';
import { Fab, makeStyles, Zoom } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { MutableRefObject } from 'react';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import HouseIcon from '@material-ui/icons/House';
import Crop54Icon from '@material-ui/icons/Crop54';
// import RestoreIcon from '@material-ui/icons/Restore';
import ApartmentIcon from '@material-ui/icons/Apartment';
import DeleteIcon from '@material-ui/icons/Delete';
import { useCreatePolygonMutationWithCacheUpdate } from '@/queries/map-edit-queries';
import { useRouterParams } from '@/utils/use-router-params';
import { useGetUserAreaQuery } from '@/types/graphql';
import { MapOutput } from './map';

const useStyle = makeStyles((theme) => ({
  button: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(12),
  },

  exampleWrapper: {
    position: 'relative',
    marginTop: theme.spacing(3),
    height: 380,
  },

  speedDial: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { truncate } from 'node:fs';
import DoneIcon from '@material-ui/icons/Done';

const editButtons = [
  { type: MapEditType.Residence, icon: <HouseIcon />, tooltip: '住宅の配置' },
  { type: MapEditType.Room, icon: <ApartmentIcon />, tooltip: '部屋の設定' },
  { type: MapEditType.Polygon, icon: <Crop54Icon />, tooltip: 'アウトライン' },
];

export const MapControls = (props: { map: MutableRefObject<MapOutput> }) => {
  // styles
  const classes = useStyle();

  // radux
  const dispatch = useAppDispatch();
  const mapEditType = useStoreState((x) => x.map.editType);
  const selectedResidenceId = useStoreState((x) => x.map.selectedResidenceId);

  // router
  const router = useRouter();
  const routerParams = useRouterParams();

  // queries
  const getUserAreaResult = useGetUserAreaQuery({
    variables: { organizationId: routerParams.organizationName, areaId: routerParams.areaName },
    skip: !routerParams.hasOrganizationAndArea,
  });
  const userArea = getUserAreaResult.data?.userAreas?.[0];

  // mutations
  const [createPolygon] = useCreatePolygonMutationWithCacheUpdate(getUserAreaResult.variables);

  const [open, setOpen] = React.useState(false);

  if (userArea == null) {
    return <>ローディング</>;
  }

  return (
    <>
      <div className={classes.button}>
        {/* 住宅削除 */}
        <Zoom in={mapEditType === MapEditType.Residence}>
          <Fab
            disabled={selectedResidenceId == null}
            color={'secondary'}
            onClick={async () => {
              //
            }}
          >
            <DeleteIcon />
          </Fab>
        </Zoom>
      </div>

      <div className={classes.button}>
        {/* アウトライン作成 */}
        <Zoom in={mapEditType === MapEditType.Polygon}>
          <Fab
            // color={'primary'}
            onClick={async () => {
              const mapInfo = props.map.current.getInfo();
              // console.log(userArea.area.id);
              // ポリゴン追加
              createPolygon({
                variables: {
                  areaId: userArea.area.id,
                  points: [
                    { latitude: mapInfo.bounds.northEast.latitude, longitude: mapInfo.bounds.northEast.longitude },
                    { latitude: mapInfo.bounds.southWest.latitude, longitude: mapInfo.bounds.northEast.longitude },
                    { latitude: mapInfo.bounds.southWest.latitude, longitude: mapInfo.bounds.southWest.longitude },
                    { latitude: mapInfo.bounds.northEast.latitude, longitude: mapInfo.bounds.southWest.longitude },
                  ],
                },
              });
            }}
          >
            <AddIcon />
          </Fab>
        </Zoom>
      </div>

      {/* 編集モード切替 */}
      <div className={classes.speedDial}>
        <SpeedDial
          ariaLabel="Actions Button"
          open={open}
          icon={
            <SpeedDialIcon
              icon={
                mapEditType === MapEditType.None ? <EditIcon /> : editButtons.find((x) => x.type === mapEditType)?.icon
              }
              openIcon={<EditIcon />}
            />
          }
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          direction="up"
        >
          {editButtons.map((x) => (
            <SpeedDialAction
              key={x.type.toString()}
              icon={x.icon}
              tooltipTitle={x.tooltip}
              tooltipPlacement="left"
              onClick={() => {
                dispatch(actions.setMapEditType({ editType: x.type }));
                setOpen(false);
              }}
            />
          ))}

          {/* 編集終了 */}
          {mapEditType !== MapEditType.None && (
            <SpeedDialAction
              icon={<DoneIcon />}
              tooltipTitle="編集完了"
              tooltipPlacement="left"
              onClick={() => {
                dispatch(actions.setMapEditType({ editType: MapEditType.None }));
                setOpen(false);
              }}
            />
          )}
        </SpeedDial>
      </div>
    </>
  );
};

{
  /* 部屋選択 */
}
{
  /* <Drawer
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
          </Drawer> */
}
