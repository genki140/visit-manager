import { Fab, makeStyles, Tooltip, Zoom } from '@material-ui/core';
import React, { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';

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
import DoneIcon from '@material-ui/icons/Done';

export const EditControls = (props: {
  edits?: {
    icon: any;
    label: string;
    onClick: () => void;
    actions: { icon: any; label: string; onClick: () => void }[];
  }[];
  actions?: { icon: any; label: string; onClick: () => void }[];
  onToggle?: (isEdit: boolean) => void;
}) => {
  // styles
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const [selecting, setSelecting] = useState<number | undefined>(undefined);

  return (
    <>
      <div className={classes.speedDial}>
        {props.edits == null ? (
          <Fab
            onClick={() => {
              const s = selecting;
              setSelecting(s == null ? 0 : undefined);
              if (props.onToggle != null) {
                props.onToggle(s == null);
              }
            }}
            color={selecting != null ? 'primary' : undefined}
          >
            <EditIcon />
          </Fab>
        ) : (
          <SpeedDial
            FabProps={{ color: selecting == null ? 'default' : 'primary' }}
            ariaLabel="Actions Button"
            open={open}
            icon={
              <SpeedDialIcon
                icon={
                  selecting == null ? (
                    <EditIcon />
                  ) : (
                    props.edits
                      ?.map((x, i) => ({
                        x,
                        i,
                      }))
                      .find((x) => x.i === selecting)?.x.icon
                  )
                }
                openIcon={selecting == null ? undefined : <EditIcon />}
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
            {props.edits?.map((x, i) => (
              <SpeedDialAction
                FabProps={{ color: 'secondary' }}
                key={i}
                icon={x.icon}
                tooltipTitle={x.label}
                tooltipPlacement="left"
                onClick={() => {
                  // dispatch(actions.setMapEditType({ editType: x.type }));
                  setSelecting(i);
                  x.onClick();
                  setOpen(false);
                }}
              />
            ))}

            {/* 編集終了 */}
            {selecting != null && (
              <SpeedDialAction
                icon={<DoneIcon />}
                tooltipTitle="編集完了"
                tooltipPlacement="left"
                onClick={() => {
                  setSelecting(undefined);
                  // dispatch(actions.setMapEditType({ editType: MapEditType.None }));
                  setOpen(false);
                }}
              />
            )}
          </SpeedDial>
        )}
      </div>

      {props.edits == null
        ? props.actions?.map((action, i) => (
            <div className={classes.toolButtons} key={i}>
              <Tooltip title={action.label} placement="top">
                <span>
                  <Zoom in={selecting != null}>
                    {
                      // ポリゴンの追加
                      <Fab
                        // size="small"
                        className={classes.toolButton}
                        // color={'primary'}
                        onClick={() => action.onClick()}
                      >
                        {action.icon}
                      </Fab>
                    }
                  </Zoom>
                </span>
              </Tooltip>
            </div>
          ))
        : props.edits.map((edit, editIndex) => (
            <div className={classes.toolButtons}>
              {edit.actions.map((action) => (
                <Tooltip title={action.label} placement="top">
                  <span>
                    <Zoom in={selecting === editIndex}>
                      {
                        <Fab
                          // size="small"
                          className={classes.toolButton}
                          // color={'primary'}
                          onClick={() => action.onClick()}
                        >
                          {action.icon}
                        </Fab>
                      }
                    </Zoom>
                  </span>
                </Tooltip>
              ))}
            </div>
          ))}
    </>
  );
};
