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
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';
import { useRouterParams } from '@/utils/use-router-params';
import { Area, useGetAreaQuery } from '@/types/graphql';
import { MapOutput } from './map';

const useStyle = makeStyles((theme) => ({
  speedDial: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  toolButtons: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: 74,
    pointerEvents: 'none',
  },
  toolButton: {
    pointerEvents: 'auto',
    marginRight: theme.spacing(1),
  },
  resetButton: {
    position: 'absolute',
    bottom: theme.spacing(2),
    left: theme.spacing(2),
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
import { AreaQueries } from '@/queries/area-queries';
import { getMapBoundsFromArea } from './map-data';

export const MapControls = (props: { map: MutableRefObject<MapOutput | undefined> }) => {
  // styles
  const classes = useStyle();

  // radux
  const dispatch = useAppDispatch();
  const mapEditType = useStoreState((x) => x.map.editType);
  const selectedResidenceId = useStoreState((x) => x.map.selectedResidenceId);
  const selectedOutlineId = useStoreState((x) => x.map.selectedOutlineId);
  const selectedOutlinePointId = useStoreState((x) => x.map.selectedOutlinePointId);

  // router
  const routerParams = useRouterParams();

  // queries
  const getUserAreaResult = useGetAreaQuery({
    variables: { organizationId: routerParams.getOrganizationId(), areaId: routerParams.getAreaId() },
    skip: !routerParams.hasOrganizationAndArea,
  });
  const area = getUserAreaResult.data?.areas[0];

  // mutations
  const [createOutline] = AreaQueries.useCreateOutline();
  const deleteResidence = AreaQueries.useDeleteResidence();
  const deleteOutline = AreaQueries.useDeleteOutline();
  const updateOutline = AreaQueries.useUpdateOutline();

  const [open, setOpen] = React.useState(false);

  const editButtons = [
    { type: MapEditType.Residence, icon: <HouseIcon />, tooltip: '住宅の配置' },
    { type: MapEditType.Room, icon: <ApartmentIcon />, tooltip: '部屋の設定' },
    { type: MapEditType.Outline, icon: <Crop54Icon />, tooltip: 'アウトライン' },
  ];

  if (area == null) {
    return null;
  }

  const selectedOutline = area.outlines.find((x) => x.id === selectedOutlineId);

  return (
    <>
      <div className={classes.resetButton}>
        <Tooltip title="全体を表示" placement="top">
          <span>
            <Fab
              className={classes.toolButton}
              onClick={async () => {
                const bounds = getMapBoundsFromArea(area as Area);
                const map = props.map.current?.getInfo().map;
                if (bounds != null && map != null) {
                  map.fitBounds(bounds, 0);
                }
              }}
            >
              <CenterFocusStrongIcon />
            </Fab>
          </span>
        </Tooltip>
      </div>

      {/* 編集モード選択 */}
      <div className={classes.speedDial}>
        <SpeedDial
          FabProps={{ color: mapEditType === MapEditType.None ? 'default' : 'primary' }}
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
          onOpen={(_e, reason) => {
            if (reason !== 'focus') {
              setOpen(true); // ドロワーなどとの兼ね合いで挙動がおかしくなるのでfocus以外
            }
          }}
          direction="up"
        >
          {editButtons.map((x) => (
            <SpeedDialAction
              FabProps={{ color: 'secondary' }}
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
      <div className={classes.toolButtons}>
        <Zoom in={mapEditType === MapEditType.Residence}>
          <Fab
            className={classes.toolButton}
            disabled={selectedResidenceId == null}
            color={'secondary'}
            onClick={async () => {
              if (selectedResidenceId != null) {
                // 住宅削除
                const result = await deleteResidence({ id: selectedResidenceId });
                if (result.data?.deleteResidence === true) {
                  dispatch(actions.setSelectedResidenceId({ residenceId: undefined }));
                }
              }
            }}
          >
            <DeleteIcon />
          </Fab>
        </Zoom>
      </div>

      {/* アウトラインモードの操作 */}
      <div className={classes.toolButtons}>
        <Tooltip title="新規アウトラインを追加" placement="top">
          <span>
            <Zoom in={mapEditType === MapEditType.Outline}>
              {
                // ポリゴンの追加
                <Fab
                  className={classes.toolButton}
                  // color={'primary'}
                  onClick={async () => {
                    if (props.map.current == null) {
                      return;
                    }
                    const mapInfo = props.map.current.getInfo();
                    const y1 = mapInfo.bounds.northEast.latitude;
                    const y2 = mapInfo.bounds.southWest.latitude;
                    const x1 = mapInfo.bounds.southWest.longitude;
                    const x2 = mapInfo.bounds.northEast.longitude;
                    const scale = 0.7;
                    const result = await createOutline({
                      variables: {
                        areaId: area.id,
                        points: [
                          { longitude: x1 * scale + x2 * (1 - scale), latitude: y1 * scale + y2 * (1 - scale) },
                          { longitude: x2 * scale + x1 * (1 - scale), latitude: y1 * scale + y2 * (1 - scale) },
                          { longitude: x2 * scale + x1 * (1 - scale), latitude: y2 * scale + y1 * (1 - scale) },
                          { longitude: x1 * scale + x2 * (1 - scale), latitude: y2 * scale + y1 * (1 - scale) },
                        ],
                      },
                    });
                    if (result.data != null) {
                      dispatch(actions.setSelectedOutlinePointId({ pointId: undefined }));
                      dispatch(actions.setSelectedOutlineId({ outlineId: Number(result.data.createOutline.id) }));
                    }
                  }}
                >
                  <AddIcon />
                </Fab>
              }
            </Zoom>
          </span>
        </Tooltip>

        {/* ポリゴンの削除 */}
        <Tooltip title="アウトライン全体を削除" placement="top">
          <span>
            <Zoom in={mapEditType === MapEditType.Outline}>
              <Fab
                className={classes.toolButton}
                disabled={selectedOutlineId == null}
                color={'secondary'}
                onClick={async () => {
                  if (selectedOutlineId != null) {
                    const result = await deleteOutline({ id: selectedOutlineId });
                    if (result.data?.deleteOutline === true) {
                      dispatch(actions.setSelectedOutlinePointId({ pointId: undefined }));
                      dispatch(actions.setSelectedOutlineId({ outlineId: undefined }));
                    }
                  }
                }}
              >
                <Crop54Icon fontSize="small" />
                <DeleteIcon />
              </Fab>
            </Zoom>
          </span>
        </Tooltip>

        {/* ポイントの削除 */}
        <Tooltip title="選択ポイントを削除">
          <span>
            <Zoom in={mapEditType === MapEditType.Outline}>
              <Fab
                className={classes.toolButton}
                disabled={selectedOutlinePointId == null || (selectedOutline?.points.length ?? 0) <= 3} // 3点以下は削除不可
                color={'secondary'}
                onClick={async () => {
                  if (selectedOutlinePointId == null || selectedOutline == null) {
                    return;
                  }

                  const newPoints = selectedOutline?.points
                    .filter((x) => x.id !== selectedOutlinePointId)
                    .map((x, i) => ({
                      order: i,
                      latitude: x.latitude,
                      longitude: x.longitude,
                    }));

                  const resultPromise = updateOutline({ id: selectedOutline.id, points: newPoints });

                  dispatch(actions.setSelectedOutlinePointId({ pointId: undefined }));

                  // const result =
                  await resultPromise;
                }}
              >
                <TimelineIcon fontSize="small" />
                <DeleteIcon />
              </Fab>
            </Zoom>
          </span>
        </Tooltip>
      </div>
    </>
  );
};
