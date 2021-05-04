export class TypeUtil {
  /** nullableオブジェクトの型情報からnullableを外す。nullかundefinedであれば例外を投げる */
  static toNonNullable = <T>(value: T): NonNullable<T> => {
    if (value == null) {
      throw new Error('value is null or undefined');
    }
    return value as NonNullable<T>;
  };

  /** 配列か単体かに関わりなく配列で返す */
  static toArray = <T>(value: T | T[]): T[] => {
    console.log('toArray');
    console.log(value);
    const v = Array.isArray(value) ? value : [value];
    console.log(v);
    return v;
  };
}
