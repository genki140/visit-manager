export class ArrayUtil {
  /** 特定の要素を入れ替えた新しい配列を返す */
  static replace = <T>(array: T[], index1: number, index2: number) => {
    return array.map((x, i) => {
      if (i === index1) {
        return array[index2];
      } else if (i === index2) {
        return array[index1];
      } else {
        return x;
      }
    });
  };

  /** 特定の要素を別の場所に挿入した新しい配列を返す */
  static insertReplace = <T>(array: T[], oldIndex: number, newIndex: number) => {
    const newArray = array.filter((x, i) => i !== oldIndex);
    newArray.splice(newIndex, 0, array[oldIndex]);
    return newArray;
  };
}
