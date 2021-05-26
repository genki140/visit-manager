export const trimedValidate = (props: {
  required?: boolean;
  maxLength?: number;
  other?: (v: any) => string | undefined;
}) => {
  //

  const validate = (v: any) => {
    const value = v.trim();

    if (props.required === true) {
      if (value === '') {
        return '必須項目です';
      }
    }

    if (props.maxLength != null) {
      if (value.length >= props.maxLength) {
        return props.maxLength + '文字以内で入力してください';
      }
    }

    if (props.other != null) {
      return props.other(v);
    }
  };

  return {
    validate,
  };
};
