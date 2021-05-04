import { actions, MapEditType, useAppDispatch, useStoreState } from '@/ducks/store';
import { Fab, makeStyles, Tooltip, Zoom } from '@material-ui/core';
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
import {
  GetUserAreaDocument,
  GetUserAreaQuery,
  GetUserAreaQueryVariables,
  useDeletePolygonMutation,
  useGetUserAreaQuery,
  useUpdatePolygonMutation,
} from '@/types/graphql';
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
import TimelineIcon from '@material-ui/icons/Timeline';
import Enumerable from 'linq';

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
  const selectedPolygonId = useStoreState((x) => x.map.selectedPolygonId);
  const selectedPolygonPointId = useStoreState((x) => x.map.selectedPolygonPointId);

  // router
  // const router = useRouter();
  const routerParams = useRouterParams();

  // queries
  const getUserAreaResult = useGetUserAreaQuery({
    variables: { organizationId: routerParams.organizationName, areaId: routerParams.areaName },
    skip: !routerParams.hasOrganizationAndArea,
  });
  const userArea = getUserAreaResult.data?.userAreas?.[0];

  // mutations
  const [createPolygon] = useCreatePolygonMutationWithCacheUpdate(getUserAreaResult.variables);
  const [deletePolygon, deletePolygonResult] = useDeletePolygonMutation();

  const [updatePolygon] = useUpdatePolygonMutation();
  // const updatePolygonTest = async (points: UpdatePolygonPointInput[]) => {
  //   return await updatePolygon({
  //     variables: {
  //       id: props.polygon.id,
  //       points: points,
  //     },
  //     optimisticResponse: {
  //       // なぜか効かない
  //       __typename: 'Mutation',
  //       updatePolygon: {
  //         __typename: 'Polygon',
  //         id: props.polygon.id,
  //         points: props.polygon.points.map((x) => ({
  //           __typename: 'PolygonPoint',
  //           id: x.id,
  //           order: x.order,
  //           latitude: x.latitude,
  //           longitude: x.longitude,
  //         })),
  //       },
  //     },
  //     // update: (cache, { data }) => {
  //     //   //
  //     // },
  //   });
  // };

  const [open, setOpen] = React.useState(false);

  if (userArea == null) {
    return <>ローディング</>;
  }

  return (
    <>
      {/* 編集モード選択 */}
      <div className={classes.speedDial}>
        <SpeedDial
          ariaLabel="Actions Button"
          open={open}
          icon={
            <SpeedDialIcon
              icon={
                mapEditType === MapEditType.None ? <EditIcon /> : editButtons.find((x) => x.type === mapEditType)?.icon
              }
              openIcon={mapEditType === MapEditType.None ? undefined : <EditIcon />}
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

      {/* 住宅モードの操作 */}
      <div className={classes.button}>
        <Zoom in={mapEditType === MapEditType.Residence}>
          <Fab
            disabled={selectedResidenceId == null}
            color={'secondary'}
            onClick={async () => {
              // 住宅削除
            }}
          >
            <DeleteIcon />
          </Fab>
        </Zoom>
      </div>

      {/* アウトラインモードの操作 */}
      <div className={classes.button}>
        <Tooltip title="新規アウトラインを追加" placement="top">
          <span>
            <Zoom in={mapEditType === MapEditType.Polygon}>
              {/* ポリゴンの追加 */}
              <Fab
                // color={'primary'}
                onClick={async () => {
                  const mapInfo = props.map.current.getInfo();
                  const y1 = mapInfo.bounds.northEast.latitude;
                  const y2 = mapInfo.bounds.southWest.latitude;
                  const x1 = mapInfo.bounds.southWest.longitude;
                  const x2 = mapInfo.bounds.northEast.longitude;
                  const scale = 0.7;
                  createPolygon({
                    variables: {
                      areaId: userArea.area.id,
                      points: [
                        { longitude: x1 * scale + x2 * (1 - scale), latitude: y1 * scale + y2 * (1 - scale) },
                        { longitude: x2 * scale + x1 * (1 - scale), latitude: y1 * scale + y2 * (1 - scale) },
                        { longitude: x2 * scale + x1 * (1 - scale), latitude: y2 * scale + y1 * (1 - scale) },
                        { longitude: x1 * scale + x2 * (1 - scale), latitude: y2 * scale + y1 * (1 - scale) },
                      ],
                    },
                  });
                }}
              >
                <AddIcon />
              </Fab>
            </Zoom>
          </span>
        </Tooltip>

        {/* ポリゴンの削除 */}
        <Tooltip title="アウトライン全体を削除" placement="top">
          <span>
            <Zoom in={mapEditType === MapEditType.Polygon}>
              <Fab
                disabled={selectedPolygonId == null}
                color={'secondary'}
                onClick={async () => {
                  if (selectedPolygonId != null) {
                    deletePolygon({ variables: { id: selectedPolygonId.toString() } });
                  }
                }}
              >
                <Crop54Icon />
                <DeleteIcon />
              </Fab>
            </Zoom>
          </span>
        </Tooltip>

        {/* ポイントの削除 */}
        <Tooltip title="選択ポイントを削除">
          <span>
            <Zoom in={mapEditType === MapEditType.Polygon}>
              <Fab
                disabled={selectedPolygonPointId == null}
                color={'secondary'}
                onClick={async () => {
                  const selectedPolygon = userArea.area.polygons.find((x) => x.id === selectedPolygonId?.toString());
                  if (selectedPolygonPointId == null || selectedPolygon == null) {
                    return;
                  }

                  // 削除すると、消せてるように見えて全部同じポイントに収束している!!
                  // SQLのDELETEが走っていない！！
                  const newPoints = selectedPolygon?.points
                    .filter((x) => x.id !== selectedPolygonPointId.toString())
                    .map((x, i) => ({
                      order: i,
                      latitude: x.latitude,
                      longitude: x.longitude,
                    }));

                  console.log(newPoints);

                  if (selectedPolygon != null) {
                    updatePolygon({
                      variables: {
                        id: selectedPolygon.id,
                        points: newPoints,
                      },
                      update: (cache, { data }) => {
                        // キャッシュデータ取得
                        let copiedData = cache.readQuery<GetUserAreaQuery, GetUserAreaQueryVariables>({
                          query: GetUserAreaDocument,
                          variables: getUserAreaResult.variables,
                        });
                        copiedData = JSON.parse(JSON.stringify(copiedData)) as typeof copiedData;

                        const polygon = copiedData?.userAreas[0].area.polygons.find(
                          (x) => x.id === selectedPolygonId?.toString(),
                        );
                        if (polygon == null) {
                          return;
                        }

                        console.log(JSON.parse(JSON.stringify(polygon)));

                        // キャッシュ書き換え
                        // ここがうまく行ってない！
                        // polygon.points = newPoints
                        //   .map((x) => polygon.points.find((y) => y.order === x.order))
                        //   .filter((x): x is NonNullable<typeof x> => x != null)
                        //   .map((x) => {
                        //     x.latitude =
                        //     __typename: x.__typename,
                        //     id: x.id,
                        //     latitude: x.latitude,
                        //     longitude: x.longitude,
                        //     order: x.order,
                        //   });

                        console.log(JSON.parse(JSON.stringify(polygon)));
                        // キャッシュデータ更新
                        cache.writeQuery({
                          query: GetUserAreaDocument,
                          variables: getUserAreaResult.variables,
                          data: copiedData,
                        });
                      },
                    });
                  }
                }}
              >
                <TimelineIcon />
                <DeleteIcon />
              </Fab>
            </Zoom>{' '}
          </span>
        </Tooltip>
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
