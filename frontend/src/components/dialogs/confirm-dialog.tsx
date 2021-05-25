import { useFormatMessage } from '@/locales';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import React, { useState } from 'react';

export type ConfirmDialogParams = {
  description: string;
  title?: string;
  action: () => void;
};

/** 汎用確認ダイアログ */
export const useConfirmDialog = () => {
  const [params, setParams] = useState<ConfirmDialogParams | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const f = useFormatMessage();

  return {
    open: (params: ConfirmDialogParams) => {
      setParams(params);
      setOpen(true);
    },
    dialog: (
      <Dialog
        open={open}
        fullWidth={true}
        maxWidth="xs"
        style={{
          zIndex: 1301, // 通常のダイアログの上
        }}
        disableBackdropClick
        // disableEscapeKeyDown
      >
        <DialogTitle>{params?.title ?? '確認'}</DialogTitle>
        <DialogContent>
          <DialogContentText>{params?.description ?? ''}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              params?.action();
              setOpen(false);
            }}
          >
            {f((x) => x.yes)}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setOpen(false);
            }}
          >
            {f((x) => x.no)}
          </Button>
        </DialogActions>
      </Dialog>
    ),
  };
};
