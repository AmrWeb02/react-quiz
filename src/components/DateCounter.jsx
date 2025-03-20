import { useReducer, useState } from "react";

const Reducer = (state,action) =>{
  // console.log(state,action)
  // return state + action
  switch(action.type){
    case "inc":
      return {...state, count: state.count + state.step}
    case "dec":
      return {...state, count: state.count - state.step}
    case "set":
      return {...state, count:action.payload}
    case "step":
      return {...state, step:action.payload}
    case "reset":
      return {count:0, step:1}
    default:
      throw new Error("Unknown action");
  }

}

function DateCounter() {
  const [state, dispatcher] = useReducer(Reducer,{count:0, step:1})
  //const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);

  // This mutates the date object.
  const date = new Date();
  date.setDate(date.getDate() + state.count);

  const dec = function () {
    dispatcher({type:"dec",payload:-1});
    // setCount((count) => count - 1);
    //setCount((count) => count - step);
  };

  const inc = function () {
    // setCount((count) => count + 1);
    //setCount((count) => count + step);
    dispatcher({type:"inc", payload:1});
  };

  const defineCount = function (e) {
  //  setCount(Number(e.target.value));
  dispatcher({type:"set",payload:Number(e.target.value)})
  };

  const defineStep = function (e) {
    dispatcher({type:"step", payload: Number(e.target.value)});
    console.log(e.target.value)
  };

  const reset = function () {
    dispatcher({type:"reset"})
    // setCount(0);
    // setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={state.step}
          onChange={defineStep}
        />
        <span>{state.step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={state.count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
