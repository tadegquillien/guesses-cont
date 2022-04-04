//manages the page for the probability understanding check
//this component is called 1+N times, where N is the number of
//colored balls that the fictitious player draws
//the first time is a simple instructions message
//all other N times, the participant is asked about the
//causal strength of one colored ball that was drawn

import React, { useState, useRef } from 'react';
import './CheckPhase.css';
import TestImage from './TestImage';
import Data from './Data';
import { shuffle } from './convenienceFunctions';
import { likertChoicesTest } from './likertScale';
import { urn_letters } from './gameParameters';
import { buttonStyle } from './dimensions';






const ProbabilityCheck = (props) => {
    
    //keeps track of the participant's response to the causal question
    const [response, setResponse] = useState("unclicked");

   
    //the ID of the urn that the current question is about
    const urnID = props.check_ids[props.checkNumber - 1];
    //the letter displayed next to that urn
    const questionLetter = urn_letters[props.shuffledUrnIds.indexOf(urnID)];
    

    const handleChange = (e) => {
        setResponse(e.target.value);
    }
    //when the participant clicks on the likert scale, a button appears that allows one to go
    //to the next trial
    const nextTrialButton =  <button style={buttonStyle}
    onClick={() => handleClick()}>
        NEXT {'>'}{'>'}</button>;
    //when the participant clicks to go to the next page, 
    //record his response, and go to the next trial
    const handleClick = () => {
        Data.probability.push(
            {
                //the test number (e.g. 1 if this was the first question asked)
                trial: props.checkNumber,
                //the participant's response (our main DV)
                response: response,
                //the correct answer
                correctAnswer: correctAnswer
            }
        );
        console.log(Data);
        props.incrementCheck(props.checkNumber);      
    }
    
    
    const ballColorsList = useRef([
        shuffle(["green", "green", "green", "green", "green", "green",
"red", "red", "blue", "blue", "yellow", "yellow"]),
shuffle(["red", "red", "red", "blue", "blue", "blue", "yellow", "yellow", "yellow", "green", "green", "green"]),
shuffle(["yellow", "green", "green", "blue", "blue", "blue", "blue", "red", "red", "red", "red", "red"])
    ]);

    
    const ballColors = ballColorsList.current[props.checkNumber - 1];
    console.log(ballColors);
    const targetColors = ["green", "red", "yellow"];
    const targetColor = targetColors[props.checkNumber -1];

    const correctAnswers = [6, 3, 1];
    const correctAnswer = correctAnswers[props.checkNumber - 1];

    //the question 
    const causalQuestion = <span className="causalQuestion">
       
        <h3 text-align="center">Imagine that a player randomly draws from the box below 12 times.</h3>
        <h3 text-align="center">(After each time, he puts the ball back in the box, and shuffles the box again.)</h3>
        <h3 text-align="center">On average, out of 12 draws, how many times would he get a {targetColor} ball?</h3>

        <input type="number" min="0" max="12" style={{fontSize:"25px"}}
        onChange={(e)=>handleChange(e)}></input>
        <br></br><br></br>
        <div>{nextTrialButton}</div>
        
        
        
        
    </span>

    const introductionStyle =  {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            marginLeft: "20vw",
            marginRight: "20vw",
            }
    
    console.log(props.probCheckOrder);        
    const introFirstSentence = props.probCheckOrder === "first" ? <h3>Before we start the main task, please answer a few questions.
        These very simple questions are there to check that people understand how randomness works.
    </h3>:
    props.probCheckOrder === "last" ? <h3>The next set of questions are simple questions that are there to check that people understand how randomness works.</h3> :
    null;

    
    //this text is displayed at the beginning of the phase, before the first trial
    const introduction = <div style={{marginTop: "30vh", backgroundColor: "lightgrey"}}>
        <div style={introductionStyle}>
            {introFirstSentence}
        <h3>
             <br></br>
            For each box, we will ask how likely it is to draw a ball of a given color. <br></br>
            (Keep in mind that there are 12 balls in total in each box.)
        </h3>
        <button style={buttonStyle}
    onClick={() => handleClick()}>
        click to continue</button>
        <br></br>
        </div>;
    </div>

    //if this is the beginning of the phase, display the introduction, otherwise
    //display the question
    const probeIntro = props.checkNumber > 0 ? null : introduction;
    const probeMain = props.checkNumber > 0 ? causalQuestion : null;

    //display the urns
    const img = props.checkNumber > 0 ? <TestImage phase={props.phase} ballColors={ballColors}
    testNumber={props.checkNumber} test_ids={props.check_ids} shuffledUrnIds={props.shuffledUrnIds}/> : null;

    return (
        <span className="metaContainer">
            {probeMain}
            <span className="containerTest">
                <div className="scoreboardTest">
                    
                </div>
                <div className="urnsTest" >
                    {probeIntro}
                    {img}
                    </div>
                
            </span>
            
        </span>
        
        

    )

}


export default ProbabilityCheck;

