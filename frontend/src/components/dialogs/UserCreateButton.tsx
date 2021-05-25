import { useFormatMessage } from '@/locales';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  makeStyles,
  Theme,
  FormLabel,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import gql from 'graphql-tag';
import { trimedValidate } from '@/utils/field-validate';
import { useConfirmDialog } from './confirm-dialog';

gql`
  mutation createOrganization($name: String!) {
    createOrganization(organization: { name: $name }) {
      id
      name
    }
  }
`;

const useStyles = makeStyles((theme: Theme) => ({
  // エラーは右寄せ
  helperText: {
    marginLeft: 'auto',
  },

  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },

  button: {
    minWidth: 100,
  },
}));

/** 新規組織作成ダイアログを表示ボタン */
export const UserCreateButton = () => {
  const [open, setOpen] = useState(false);
  const f = useFormatMessage();
  // const [createOrganizationMutation] = useCreateOrganizationMutation();
  const classes = useStyles();
  const [error, setError] = useState('');
  const confirmDialog = useConfirmDialog();

  const defaultValues = {
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
  };

  const { control, handleSubmit, formState, reset } = useForm({ defaultValues });

  const onSubmit = async (data: typeof defaultValues) => {
    console.log(data);
    // try {
    //   await createOrganizationMutation({
    //     variables: {
    //       name: data.name.trim(),
    //     },
    //   });
    //   setOpen(false);
    // } catch (e) {
    //   const code = e.graphQLErrors?.[0]?.extensions?.code;
    //   setError(code);
    // }
  };

  return (
    <>
      <Button
        variant="outlined"
        size="large"
        fullWidth
        onClick={() => {
          reset();
          setError('');
          setOpen(true);
        }}
      >
        {'新規アカウント作成'}
      </Button>

      <Dialog open={open} fullWidth={true} maxWidth="sm" disableBackdropClick disableEscapeKeyDown>
        <DialogTitle>新規アカウントの追加</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogContent>
            <DialogContentText>組織に参加または組織を作成するためのユーザーを作成します。</DialogContentText>

            <Controller
              name="name"
              control={control}
              rules={trimedValidate({
                required: true,
                maxLength: 100,
              })}
              render={(x) => (
                <TextField
                  label="名前"
                  required
                  fullWidth
                  autoFocus
                  margin="dense"
                  helperText={x.fieldState.error?.message}
                  error={!!x.fieldState.error}
                  FormHelperTextProps={{ classes: { root: classes.helperText } }}
                  placeholder="例：田中 太郎"
                  {...x.field}
                />
              )}
            />

            <Controller
              name="username"
              control={control}
              rules={trimedValidate({
                required: true,
                maxLength: 100,
              })}
              render={(x) => (
                <TextField
                  label="ユーザーID"
                  required
                  fullWidth
                  margin="dense"
                  helperText={x.fieldState.error?.message}
                  error={!!x.fieldState.error}
                  FormHelperTextProps={{ classes: { root: classes.helperText } }}
                  placeholder="例：tanaka-taro"
                  {...x.field}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={trimedValidate({
                required: true,
                maxLength: 100,
              })}
              render={(x) => (
                <TextField
                  label="パスワード"
                  required
                  fullWidth
                  margin="dense"
                  helperText={x.fieldState.error?.message}
                  error={!!x.fieldState.error}
                  FormHelperTextProps={{ classes: { root: classes.helperText } }}
                  type="password"
                  {...x.field}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={trimedValidate({
                required: true,
                maxLength: 100,
              })}
              render={(x) => (
                <TextField
                  label="パスワード（確認）"
                  required
                  fullWidth
                  margin="dense"
                  helperText={x.fieldState.error?.message}
                  error={!!x.fieldState.error}
                  FormHelperTextProps={{ classes: { root: classes.helperText } }}
                  type="password"
                  {...x.field}
                />
              )}
            />

            <DialogContentText>
              <FormLabel error>{error}</FormLabel>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" type="submit" className={classes.button}>
              {f((x) => x.create)}
            </Button>
            <Button
              variant="outlined"
              className={classes.button}
              onClick={() => {
                if (formState.isDirty) {
                  confirmDialog.open({
                    description: 'アカウントは作成されていません。キャンセルしますか？',
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
