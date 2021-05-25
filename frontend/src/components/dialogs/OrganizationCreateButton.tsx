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
  Fab,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import AddIcon from '@material-ui/icons/Add';

import gql from 'graphql-tag';
import { useCreateOrganizationMutation } from '@/types/graphql';
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
  // '& .MuiTextField-root': { marginBottom: theme.spacing(10) },

  // エラーは右寄せ
  helperText: {
    marginLeft: 'auto',
  },

  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

/** 新規組織作成ダイアログを表示ボタン */
export const OrganizationCreateButton = () => {
  const [open, setOpen] = useState(false);
  const f = useFormatMessage();
  const [createOrganizationMutation] = useCreateOrganizationMutation();
  const classes = useStyles();
  const [error, setError] = useState('');
  const confirmDialog = useConfirmDialog();

  const defaultValues = {
    name: '',
  };

  const { control, handleSubmit, formState, reset } = useForm({ defaultValues });

  const onSubmit = async (data: typeof defaultValues) => {
    try {
      const result = await createOrganizationMutation({
        variables: {
          name: data.name.trim(),
        },
      });
      result.errors;
      setOpen(false);
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
        <DialogTitle>新規組織の追加</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogContent>
            <DialogContentText>自分が管理者として所属する新しい組織を作成します。</DialogContentText>

            <Controller
              name="name"
              control={control}
              rules={trimedValidate({
                required: true,
                maxLength: 10,
              })}
              render={(x) => (
                <TextField
                  label="組織名"
                  required
                  fullWidth
                  autoFocus
                  margin="normal"
                  helperText={x.fieldState.error?.message}
                  error={!!x.fieldState.error}
                  {...x.field}
                  FormHelperTextProps={{ classes: { root: classes.helperText } }}
                />
              )}
            />

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
                    description: '新規組織は追加されていません。キャンセルしますか？',
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
