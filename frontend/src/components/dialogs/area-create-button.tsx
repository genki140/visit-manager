import { useFormatMessage } from '@/locales';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  makeStyles,
  Theme,
  FormLabel,
  Fab,
  MenuItem,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import AddIcon from '@material-ui/icons/Add';

import { useConfirmDialog } from './confirm-dialog';
import { useRouterParams } from '@/utils/use-router-params';
import { unwrapResult } from '@reduxjs/toolkit';
import { asyncRefreshLoginUser, useAppDispatch } from '@/ducks/store';
import { AreaListQueries } from '@/queries/area-list-queries';
import { FormText } from './form-text';

const useStyles = makeStyles((theme: Theme) => ({
  // '& .MuiTextField-root': { marginBottom: theme.spacing(10) },

  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

/** 新規組織作成ダイアログを表示ボタン */
export const AreaCreateButton = () => {
  const [open, setOpen] = useState(false);
  const f = useFormatMessage();
  const [createAreaMutation] = AreaListQueries.useCreateArea();
  const classes = useStyles();
  const [error, setError] = useState('');
  const confirmDialog = useConfirmDialog();
  const routerParams = useRouterParams();
  const dispatch = useAppDispatch();

  const defaultValues = {
    name: '',
    description: '',
    typeId: 1,
  };

  const { control, handleSubmit, formState, reset } = useForm({ defaultValues });

  const onSubmit = async (data: typeof defaultValues) => {
    console.log(data);
    try {
      const result = await createAreaMutation({
        variables: {
          organizationId: routerParams.getOrganizationId(),
          name: data.name,
          description: data.description,
        },
      });

      setOpen(false);
      unwrapResult(await dispatch(asyncRefreshLoginUser())); // 情報再取得
    } catch (e) {
      const code = e.graphQLErrors?.[0]?.extensions?.code;
      setError(code);
    }
  };

  return (
    <>
      <Fab
        className={classes.fab}
        onClick={() => {
          reset();
          setError('');
          setOpen(true);
        }}
      >
        <AddIcon />
      </Fab>

      <Dialog open={open} fullWidth={true} maxWidth="sm" disableBackdropClick disableEscapeKeyDown>
        <DialogTitle>新規区域の追加</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogContent>
            <DialogContentText>組織内の新しい区域を作成します。</DialogContentText>

            <FormText control={control} name="name" label="区域名" required maxLength={100} autoFocus />
            <FormText control={control} name="description" label="解説" maxLength={100} />
            <FormText control={control} name="typeId" label="区域種別">
              <MenuItem value={1}>戸建て</MenuItem>
              <MenuItem value={2}>アパート</MenuItem>
              <MenuItem value={3}>オートロック</MenuItem>
            </FormText>

            <DialogContentText>
              <FormLabel error>{error}</FormLabel>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" type="submit">
              {f((x) => x.create)}
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                if (formState.isDirty) {
                  confirmDialog.open({
                    description: '新規区域は追加されていません。キャンセルしますか？',
                    action: () => {
                      setOpen(false);
                    },
                  });
                } else {
                  setOpen(false);
                }
              }}
              color="primary"
            >
              {f((x) => x.cancel)}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {confirmDialog.dialog}
    </>
  );
};
