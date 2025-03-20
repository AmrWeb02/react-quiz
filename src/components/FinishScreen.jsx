import React from 'react'

const FinishScreen = ({points,totalPoints, highscore,dispatch}) => {
    const percent = points / totalPoints * 100
    let emoji;
    if(percent === 100) emoji = "🌟";
    if(percent >=80 && percent<100) emoji = "⭐";
    if(percent>=50 && percent <80) emoji = "🍀";
    if(percent<50) emoji ="🤦‍♂️";
    return (
    <>
    <p className='result'>
        <span>{emoji}</span>You Scored <strong>{points}</strong> out of {totalPoints} ( {`${percent.toFixed(2)}%`} )
    </p>
    <p className='highscore'>{`(HighScore: ${highscore} Points)`}</p>
    <button className='btn btn-ui' onClick={() =>{dispatch({type:"reset"})}}>Reset</button>
    </>
  )
}

export default FinishScreen