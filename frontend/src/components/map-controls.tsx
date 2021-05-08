import { actions, MapEditType, useAppDispatch, useStoreState } from '@/ducks/store';
import { Fab, makeStyles, Tooltip, Zoom } from '@material-ui/core';
import React, { MutableRefObject } from 'react';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import HouseIcon from '@material-ui/icons/House';
import Crop54Icon from '@material-ui/icons/Crop54';
// import RestoreIcon from '@material-ui/icons/Restore';
import ApartmentIcon from '@material-ui/icons/Apartment';
import DeleteIcon from '@material-ui/icons/Delete';
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
// import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
// import SaveIcon from '@material-ui/icons/Save';
// import PrintIcon from '@material-ui/icons/Print';
// import ShareIcon from '@material-ui/icons/Share';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import DoneIcon from '@material-ui/icons/Done';
import TimelineIcon from '@material-ui/icons/Timeline';
import { MapQueries } from '@/queries/map-edit-queries';

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
  const routerParams = useRouterParams();

  // queries
  const getUserAreaResult = useGetUserAreaQuery({
    variables: { organizationId: routerParams.organizationName, areaId: routerParams.areaName },
    skip: !routerParams.hasOrganizationAndArea,
  });
  const userArea = getUserAreaResult.data?.userAreas?.[0];

  // mutations
  const [createPolygon] = MapQueries.useCreatePolygon();
  const deletePolygon = MapQueries.useDeletePolygon();
  const updatePolygon = MapQueries.useUpdatePolygon();

  const [open, setOpen] = React.useState(false);

  const editButtons = [
    { type: MapEditType.Residence, icon: <HouseIcon />, tooltip: '住宅の配置' },
    { type: MapEditType.Room, icon: <ApartmentIcon />, tooltip: '部屋の設定' },
    { type: MapEditType.Polygon, icon: <Crop54Icon />, tooltip: 'アウトライン' },
  ];

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
                  const result = await createPolygon({
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
                  if (result.data != null) {
                    dispatch(actions.setSelectedPolygonPointId({ pointId: undefined }));
                    dispatch(actions.setSelectedPolygonId({ polygonId: Number(result.data.createPolygon.id) }));
                  }
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
                    const result = await deletePolygon({ id: selectedPolygonId.toString() });
                    if (result.data?.deletePolygon === true) {
                      dispatch(actions.setSelectedPolygonPointId({ pointId: undefined }));
                      dispatch(actions.setSelectedPolygonId({ polygonId: undefined }));
                    }
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

                  if (selectedPolygon != null) {
                    const newPoints = selectedPolygon?.points
                      .filter((x) => x.id !== selectedPolygonPointId.toString())
                      .map((x, i) => ({
                        order: i,
                        latitude: x.latitude,
                        longitude: x.longitude,
                      }));

                    const resultPromise = updatePolygon({ id: selectedPolygon.id, points: newPoints });

                    dispatch(actions.setSelectedPolygonPointId({ pointId: undefined }));

                    const result = await resultPromise;
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
