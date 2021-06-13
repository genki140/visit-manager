import { TextField, makeStyles } from '@material-ui/core';
import { Controller } from 'react-hook-form';

import { trimedValidate } from '@/utils/field-validate';

const useStyles = makeStyles(() => ({
  // エラーは右寄せ
  helperText: {
    marginLeft: 'auto',
  },
}));

export const FormText = (props: {
  control: any;
  name: string;
  label: string;
  required?: boolean;
  maxLength?: number;
  autoFocus?: boolean;
  children?: any;
}) => {
  const classes = useStyles();
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={trimedValidate({
        required: props.required,
        maxLength: props.maxLength,
      })}
      render={(x) => (
        <TextField
          label={props.label}
          required={props.required}
          fullWidth
          autoFocus={props.autoFocus}
          margin="dense"
          helperText={x.fieldState.error?.message}
          error={!!x.fieldState.error}
          FormHelperTextProps={{ classes: { root: classes.helperText } }}
          select={props.children != null}
          {...x.field}
        >
          {props.children}
        </TextField>
      )}
    />
  );
};
