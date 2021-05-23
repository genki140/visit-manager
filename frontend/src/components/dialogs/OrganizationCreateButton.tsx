import { useFormatMessage } from '@/locales';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Input,
  makeStyles,
  Theme,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

const useStyles = makeStyles((theme: Theme) => ({
  // '& .MuiTextField-root': { marginBottom: theme.spacing(2) },

  // エラーは右寄せ
  helperText: {
    marginLeft: 'auto',
  },
}));

/** 新規組織作成ダイアログを表示ボタン */
export const OrganizationCreateButton = () => {
  const [open, setOpen] = useState(false);
  const f = useFormatMessage();
  const classes = useStyles();

  const defaultValues = {
    name: '',
  };

  const { control, handleSubmit, formState, reset } = useForm({ defaultValues });

  // console.log('isDirty:' + formState.isDirty);

  const onSubmit = (data: typeof defaultValues) => {
    console.table(data);
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        新規組織の作成
      </Button>

      <Dialog open={open} fullWidth={true} maxWidth="sm" disableBackdropClick disableEscapeKeyDown>
        <DialogTitle>新規組織の追加</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogContent>
            <DialogContentText>自分が管理者として所属する新しい組織を作成します。</DialogContentText>

            <Controller
              name="name"
              control={control}
              rules={{
                // validate: (v) => {
                //   const value = v.trim();
                //   if (value.length >= 10) {
                //     return '10文字以内で入力してください';
                //   }
                // },
                required: '入力は必須です',
                maxLength: {
                  value: 5,
                  message: '5文字以内で入力してください',
                },
              }}
              render={(x) => (
                <TextField
                  label="組織名"
                  required
                  fullWidth
                  autoFocus
                  helperText={x.fieldState.error?.message}
                  error={!!x.fieldState.error}
                  {...x.field}
                  FormHelperTextProps={{ classes: { root: classes.helperText } }}
                />
              )}
            />

            {/* <TextField helperText="エラー内容" margin="dense" id="name" label="組織名" type="email" fullWidth /> */}
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" type="submit">
              {f((x) => x.create)}
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                // if (formState.isDirty) {
                //   // 確認ダイアログ
                //   return;
                // }
                reset();
                setOpen(false);
              }}
              color="primary"
            >
              {f((x) => x.cancel)}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
