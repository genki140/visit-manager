// typescript実験場

// type Value1 = 'Value1';
// type Value2 = 'Value2';

// const enum ValueEnums {
//   Value1,
//   Value2,
// }
// type ValueTypes = Value1 | Value2;

// interface TestInterface {
//   name: string;
//   valueType: ValueTypes;
//   valueEnum: ValueEnums;
// }

// const Color = {
//   None: 'None',
//   Red: 'Red',
//   Black: 'Black',
// } as const;
// type Color = typeof Color[keyof typeof Color];

// const Color2 = {
//   None: 'None',
//   Red: 'Red',
//   Black: 'Black',
// } as const;
// type Color2 = typeof Color2[keyof typeof Color2];

const Test = () => {
  // const v = ValueEnums.Value1;

  // let color = ValueEnums.Value1;

  // let compare = color === ValueEnums;

  // switch (v) {
  //   case ValueEnums.Value1:
  //   case ValueEnums.Value2:
  // }

  return {
    name: 'aa',
    valueType: 'Value2',
  };
};

export default Test;
