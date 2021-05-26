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
import { useCreateUserMutation } from '@/types/graphql';

gql`
  mutation createUser($user: CreateUserInput!) {
    createUser(user: $user) {
      id
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
export const UserCreateButton = (props: { onCreated: (username: string, password: string) => void }) => {
  const [open, setOpen] = useState(false);
  const f = useFormatMessage();
  // const [createOrganizationMutation] = useCreateOrganizationMutation();
  const classes = useStyles();
  const [error, setError] = useState('');
  const confirmDialog = useConfirmDialog();
  const [createUserMutation] = useCreateUserMutation();

  const defaultValues = {
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
  };

  const { control, handleSubmit, formState, reset, getValues } = useForm({ defaultValues });

  const onSubmit = async (data: typeof defaultValues) => {
    try {
      await createUserMutation({
        variables: {
          user: {
            name: data.name,
            username: data.username,
            password: data.password,
          },
        },
      });
      setOpen(false);
      props.onCreated(data.username, data.password);
    } catch (e) {
      const code = e.graphQLErrors?.[0]?.extensions?.code;
      setError(code);
    }
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
        {f((x) => x.create_new_account)}
      </Button>

      <Dialog open={open} fullWidth={true} maxWidth="sm" disableBackdropClick disableEscapeKeyDown>
        <DialogTitle>{f((x) => x.create_new_account)}</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogContent>
            <DialogContentText>{f((x) => x.create_new_account_description)}</DialogContentText>

            <Controller
              name="name"
              control={control}
              rules={trimedValidate({
                required: true,
                maxLength: 100,
              })}
              render={(x) => (
                <TextField
                  label={f((x) => x.user_name)}
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
                  label={f((x) => x.user_id)}
                  required
                  fullWidth
                  autoCapitalize="off"
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
                  label={f((x) => x.password)}
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
              name="confirmPassword"
              control={control}
              rules={trimedValidate({
                required: true,
                maxLength: 100,
                other: (v) => {
                  return (v?.toString() ?? '') === getValues('password') ? undefined : '入力したパスワードと異なります';
                },
              })}
              render={(x) => (
                <TextField
                  label={f((x) => x.password_confirm)}
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
