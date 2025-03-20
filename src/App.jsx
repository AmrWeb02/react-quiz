import { useReducer, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import DateCounter from './components/DateCounter.jsx'
import Header from './components/Header.jsx'
import MainBody from './components/MainBody.jsx'
import Loader from './components/Loader.jsx'
import Error from './components/Error.jsx'
import Start from './components/StartScreen.jsx'
import Question from './components/Question.jsx'
import NextButton from './components/NextButton.jsx'
import Progress from './components/Progress.jsx'
import FinishScreen from './components/FinishScreen.jsx'
import Timer from './components/Timer.jsx'
const initialState = {
  questions:[],
  status: "loading", // Loading, error, ready, active, finished
  index:0,
  answer:null,
  points:0,
  highscore:0,
  remainingSeconds:null,
}
const reducer = (state, action) =>{
  switch(action.type){
    case "fetched":
      return {...state, questions:action.payload, status:"ready"}
    case "dataFailed":
      return {...state, status:"error"}
    case "start":
      return {...state, status:"active", remainingSeconds: state.questions.length * 30}
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {...state, answer:action.payload,
        points: question.correctOption === action.payload? state.points + question.points: state.points,
       }
    case "nextQuestion":
      return {...state, index: state.index+1, answer: null,}
    case "finish":
      return {...state, status:"finished", highscore: state.points > state.highscore ? state.points : state.highscore}
    case "reset":
      return {...state, index:0, answer:null, status:"ready", points:0, remainingSeconds:10}
    case "tick":
      return {...state, remainingSeconds: state.remainingSeconds - 1, status: state.remainingSeconds === 0 ? "finished":state.status}
    default:
      throw new Error("Unknown action")
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer,initialState)
  const numQuestions = state.questions.length
  let totalPoints = state.questions.reduce( (prevVal,currVal) => {return prevVal+ currVal.points} ,0);
  useEffect( () =>{
    const fetchData = async () =>{
      try{
        const res = await fetch('./data/questions.json');
        const data = await res.json();
        console.log(data)
        dispatch({type:"fetched", payload:data.questions});
      }
      catch(err){
        console.log(err);
        dispatch({type:"dataFailed"});
      }
    }
    fetchData()
  },[])
  return (
    <>
    <div className="app">
      <Header/>

      <MainBody>
        {state.status==="loading" && <Loader/>}
        {state.status==="error" && <Error/>}
        {state.status==="ready" && <Start numQuestions={numQuestions} dispatch={dispatch}/>}
        {state.status==="active" &&
        <> 
          <Progress numQuestions={numQuestions} index={state.index} points={state.points} totalPoints={totalPoints} answer={state.answer} />
          <Question question={state.questions[state.index]} dispatch={dispatch} answer={state.answer}/>
          <NextButton dispatch={dispatch} answer={state.answer} index={state.index} numQuestions={numQuestions}/>
          <Timer remainingSeconds={state.remainingSeconds} dispatch={dispatch}/>
        </>
        }
        {state.status==="finished" && <FinishScreen points={state.points} totalPoints={totalPoints} highscore={state.highscore} dispatch={dispatch}/>}
      </MainBody>
    </div>
    </>
  )
}

export default App
