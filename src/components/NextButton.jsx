import React from 'react'

const NextButton = ({dispatch,answer,index,numQuestions}) => {
  if(index < numQuestions - 1) {
    return (
        <>
        {answer !==null ? <button className='btn btn-ui' onClick={() =>{dispatch({type:"nextQuestion"})}}>Next</button> : null}
        </>
      )
  }

  if(index === numQuestions - 1){
    return (
        <button className='btn btn-ui' onClick={() =>{dispatch({type:"finish"})}}>Finish</button>
    )
  }
}

export default NextButton