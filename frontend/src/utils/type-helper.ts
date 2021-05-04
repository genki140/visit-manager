// export const nonNullable = <T>(value: T): value is NonNullable<T> => value != null;

/** nullableオブジェクトの型情報からnullableを外す。nullかundefinedであれば例外を投げる */
export const toNonNullable = <T>(value: T): NonNullable<T> => {
  if (value == null) {
    throw new Error('value is null or undefined');
  }
  return value as NonNullable<T>;
};
