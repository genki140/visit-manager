import { useFormatMessage } from '@/locales';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormLabel,
} from '@material-ui/core';
import React, { useState } from 'react';
import { DefaultValues, FieldValues, useForm, UseFormReturn } from 'react-hook-form';

import { useConfirmDialog } from './confirm-dialog';

// const useStyles = makeStyles((theme: Theme) => ({
//   // '& .MuiTextField-root': { marginBottom: theme.spacing(10) },

//   fab: {
//     position: 'absolute',
//     bottom: theme.spacing(2),
//     right: theme.spacing(2),
//   },
// }));

export const useInputDialog = <T extends FieldValues>(props: {
  title: string;
  description?: string;
  // error?: string;
  defaultValues: DefaultValues<T>;
  onSubmit: (data: T) => Promise<string | boolean | void>;
  content: (form: UseFormReturn<T>) => any;
  submitText?: string;
  cancelText?: string;
  cancelDescription?: string;
  commands?: any;
}) => {
  const [open, setOpen] = useState(false);
  const confirmDialog = useConfirmDialog();
  const f = useFormatMessage();
  const form = useForm({ defaultValues: props.defaultValues });
  const [error, setError] = useState('');
  // const classes = useStyles();

  const onSubmit = async (data: typeof props.defaultValues) => {
    const result = await props.onSubmit(data as T);
    if (result === true || result === undefined || result === '') {
      setOpen(false);
    }
    if (typeof result === 'string') {
      setError(result);
    }
  };

  return {
    open: () => {
      form.reset();
      setOpen(true);
    },
    dialog: (
      <>
        <Dialog open={open} fullWidth={true} maxWidth="sm" disableBackdropClick disableEscapeKeyDown>
          <DialogTitle>{props.title}</DialogTitle>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <DialogContent>
              <DialogContentText>{props.description ?? ''}</DialogContentText>

              {props.content(form)}

              <DialogContentText>
                <FormLabel error>{error}</FormLabel>
              </DialogContentText>
            </DialogContent>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                // marginLeft: 15,
                // marginRight: 15,
                // marginBottom: 10,
              }}
            >
              <DialogActions>{props.commands}</DialogActions>
              <DialogActions>
                <Button variant="contained" color="primary" type="submit">
                  {props.submitText ?? f((x) => x.create)}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    if (form.formState.isDirty) {
                      confirmDialog.open({
                        description: props.cancelDescription ?? 'キャンセルしますか？',
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
                  {props.cancelText ?? f((x) => x.cancel)}
                </Button>
              </DialogActions>
            </div>
          </form>
        </Dialog>
        {confirmDialog.dialog}
      </>
    ),
  };
};
