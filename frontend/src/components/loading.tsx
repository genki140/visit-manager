import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    // color: '#fff',
  },
}));

export const Loading = (props: { show?: boolean }) => {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={props.show ?? true}>
      <CircularProgress color="primary" />
    </Backdrop>
  );
};
