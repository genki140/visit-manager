import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';

import counterSlice, { useCounterState } from '@/ducks/counter';

const Counter: React.FC<{
  caption: string;
}> = (props) => {
  const dispatch = useDispatch();
  const state = useCounterState().counter;

  return (
    <>
      <h2>{props.caption}</h2>

      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch(counterSlice.actions.incrementCounter(1))}
      >
        増やす
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch(counterSlice.actions.decrementCounter(1))}
      >
        減らす
      </Button>

      <p>ねこが{state.count} 匹いる</p>
    </>
  );
};

export default Counter;
