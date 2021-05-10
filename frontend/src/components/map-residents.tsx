import { actions, MapEditType, useAppDispatch, useStoreState } from '@/ducks/store';
import { Button, Drawer, Fab, IconButton } from '@material-ui/core';
import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import AddLocationIcon from '@material-ui/icons/AddLocation';

import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import BlockRoundedIcon from '@material-ui/icons/BlockRounded';
import KeyboardBackspaceRoundedIcon from '@material-ui/icons/KeyboardBackspaceRounded';

export const MapResidents = () => {
  // local states
  const [roomEditTargetRoomId, setRoomEditTargetRoomId] = useState<number | undefined>();

  // radux
  const dispatch = useAppDispatch();
  const mapEditType = useStoreState((x) => x.map.editType);
  const selectedResidenceId = useStoreState((x) => x.map.selectedResidenceId);

  return (
    <>
      <Drawer
        anchor="bottom"
        open={
          (mapEditType === MapEditType.Room || mapEditType === MapEditType.None) &&
          selectedResidenceId != null &&
          roomEditTargetRoomId == null
        }
        onClose={() => dispatch(actions.setSelectedResidenceId({ residenceId: undefined }))}
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
          <IconButton
            size="medium"
            color="primary"
            style={{
              margin: 'auto',
              padding: 0,
            }}
          >
            <AddLocationIcon
              fontSize="inherit"
              style={{
                transform: 'rotate(-90deg)',
              }}
            />
          </IconButton>

          <IconButton
            size="medium"
            color="primary"
            style={{
              margin: 'auto',
              padding: 0,
            }}
          >
            <AddLocationIcon fontSize="inherit" />
          </IconButton>

          <Button
            variant="contained"
            style={{
              gridColumn: 2,
              gridRow: 3,
              minWidth: 0,
            }}
            startIcon={<DeleteIcon />}
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
          dispatch(actions.setSelectedResidenceId({ residenceId: undefined }));
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
      </Drawer>
    </>
  );
};
