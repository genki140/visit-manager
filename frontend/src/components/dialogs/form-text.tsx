import { TextField, makeStyles } from '@material-ui/core';
import { Control, Controller, FieldValues } from 'react-hook-form';

import { trimedValidate } from '@/utils/field-validate';

const useStyles = makeStyles(() => ({
  // エラーは右寄せ
  helperText: {
    marginLeft: 'auto',
  },
}));

export const FormText = <T extends FieldValues>(props: {
  control: Control<T>;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  validate?: (v: any) => string | undefined;
  autoFocus?: boolean;
  children?: any;
}) => {
  const classes = useStyles();
  return (
    <Controller
      name={props.name as any}
      control={props.control}
      rules={trimedValidate({
        required: props.required,
        maxLength: props.maxLength,
        other: props.validate,
      })}
      render={(x) => (
        <TextField
          label={props.label}
          required={props.required}
          type={props.type}
          placeholder={props.placeholder}
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
