import { useState } from 'react';
import { textStyle, buttonStyle } from './dimensions';
import { questions } from './randomizedParameters';
import Data from './Data';

const TestPhase = (props) => {
    
    const question = questions[props.testNumber];

    const [ assignmentX, setAssignmentX ] = useState(Math.random() > .5 ? "A" : "B");

    const estimates = assignmentX === "A" ? [question.lowerXVerbal, question.upperXVerbal,
        question.lowerYVerbal, question.upperYVerbal, question.lowerX, question.upperX, 
        question.lowerY, question.upperY] :
    [question.lowerYVerbal, question.upperYVerbal,
        question.lowerXVerbal, question.upperXVerbal,
    question.lowerY, question.upperY,
    question.lowerX, question.upperX];

    const [ response, setResponse ] = useState("");

    const handleClick = ()=>{
        Data.responses.push({
            number: props.testNumber,
            question: question.label,
            A_lower: estimates[4],
            A_upper: estimates[5],
            B_lower: estimates[6],
            B_upper: estimates[7],
            assignmentX: assignmentX,
            choice: response,
        });
        console.log(Data.responses);
        setAssignmentX(Math.random() > .5 ? "A" : "B");
        props.incrementTest(props.testNumber);
    }

    const nextButton = response === "" ? null :
        <button style={buttonStyle}
        onClick={()=>handleClick()}>Next</button>

    const handleChange = (e)=>{
        setResponse(e.target.value);
        console.log(response);
    }

    return (
        <div style ={textStyle}>
            <p>(Question #{props.testNumber+1})</p>
            <p>{question.prompt}</p>
            <p>Assistant A responds: {estimates[0]} to {estimates[1]}.</p>
            <p>Assistant B responds: {estimates[2]} to {estimates[3]}.</p>
            <p>The correct answer is: {question.groundTruthVerbal}. Which estimate is better?</p>

           
  
            <div onChange={(e)=>handleChange(e)}>
                <input type="radio" name="choice" value = "A" style={{height:"2.5em", width:"2.5em"}}/>
                <span style={{fontSize: "1.5em"}}>A</span>
                <br></br>
                <br></br>
                <input type="radio" name="choice" value = "B" style={{height:"2.5em", width:"2.5em"}}/>
                <span style={{fontSize: "1.5em"}}>B</span>
               
            </div>
            <br></br>
            {nextButton}

            </div>

        
    )
}

export default TestPhase;