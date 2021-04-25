import { actions, MapEditType, useAppDispatch, useStoreState } from '@/ducks/store';
import { Fab, makeStyles } from '@material-ui/core';
import { Slide } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { MutableRefObject } from 'react';
import AddIcon from '@material-ui/icons/Add';
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
    right: theme.spacing(2),
  },
}));

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

  if (userArea == null) {
    return <>ローディング</>;
  }

  return (
    <>
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

          {mapEditType === MapEditType.Polygon ? (
            <Fab
              color={'secondary'}
              onClick={async () => {
                const mapInfo = props.map.current.getInfo();
                console.log(userArea.area.id);
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
              <Crop54Icon />
              <AddIcon />
            </Fab>
          ) : null}
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
