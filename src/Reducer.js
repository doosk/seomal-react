import { useReducer, useState } from 'react';

const App = () => {
  function countReducer(oldCount, action) {
    // 리듀서를 사용하는 이유
    // 1. 복잡한 상태를 바꾸는 것은 전문화된 함수에서 모두 처리

    // 순수함수 : 외부의 영향을 받지않고 input, output만으로 동작하게 코딩해야 한다 (외부 number를 직접 사용하지 않는다)
    // if (action === 'UP') {
    //   return oldCount + 1;
    // } else if (action === 'DOWN') {
    //   return oldCount - 1;
    // } else if (action === 'RESET') {
    //   return 0;
    // }
    if (action.type === 'UP') {
      return oldCount + action.number;
    } else if (action.type === 'DOWN') {
      return oldCount - action.number;
    } else if (action.type === 'RESET') {
      return 0;
    }
  }

  const [count, countDispatch] = useReducer(countReducer, 0);
  //   const down = () => countDispatch('DOWN');
  //   const reset = () => countDispatch('RESET');
  //   const up = () => countDispatch('UP');

  //     const [count, setCount] = useState(0);
  //   const down = () => setCount((prev) => prev - 1);
  //   const reset = () => setCount(0);
  //   const up = () => setCount((prev) => prev + 1);

  const [number, setNumber] = useState(1);
  function changeNumber(e) {
    setNumber(Number(e.target.value));
  }
  const down = () => countDispatch({ type: 'DOWN', number: number });
  const reset = () => countDispatch({ type: 'RESET', number: number });
  const up = () => countDispatch({ type: 'UP', number: number });

  return (
    <div>
      <input type='button' value='-' onClick={down} />
      <input type='button' value='0' onClick={reset} />
      <input type='button' value='+' onClick={up} />
      <input type='number' value={number} onChange={changeNumber} />
      <span>{count}</span>
    </div>
  );
};

export default App;
