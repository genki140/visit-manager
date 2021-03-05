import React from 'react';
import { useDispatch } from 'react-redux';
import counterSlice, { useCounterState } from '../ducks/counter';

const Counter: React.FC<{
  caption: string;
}> = (props) => {
  const dispatch = useDispatch();
  const state = useCounterState().counter;

  const onClickIncrement = () => {
    dispatch(counterSlice.actions.incrementCounter(1));
  };

  const onClickDecrement = () => {
    dispatch(counterSlice.actions.decrementCounter(1));
  };

  return (
    <>
      <h2>{props.caption}</h2>
      <button type="button" onClick={onClickIncrement}>
        ふやす
      </button>
      <button type="button" onClick={onClickDecrement}>
        へらす
      </button>
      <p>ねこが{state.count} 匹いる</p>
    </>
  );
};

export default Counter;
