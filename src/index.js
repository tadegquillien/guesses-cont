//the main page

//the experiment has the following structure:

//-consent form
//-instructions
//-training phase: the participant plays ten rounds of the game, in order
//  to get familiar with the game
//-transition
//-test phase: the participant observes the outcome of a round of the game
//  played by a fictitious player, and answers questions about the causal strength
//  of the colored balls drawn by that player
//-demographics
//-end

import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ConsentForm from './ConsentForm';
import TestPhase from './TestPhase';
import Instructions from './Instructions';
import Transition from './Transition';
import Demographics from './Demographics';
import ProbabilityCheck from './probabilityCheck';
import { shuffledUrnIds, questions, probCheckOrder } from './randomizedParameters';
import { textStyle, buttonStyle } from './dimensions';
import { shuffle } from './convenienceFunctions';
import { urn_ids, actualWorld } from './gameParameters';

import reportWebVitals from './reportWebVitals';
import Data from './Data';



const Root = () => {
  //keeps track of the current phase
  const [currentPhase, setCurrentPhase] = useState("prolificId");
  //keeps track of the current trial, for the Training phase
  const [trialNumber, setTrialNumber] = useState(1);
  //keeps track of the current trial, for the Test phase
  const [testNumber, setTestNumber] = useState(0);
  //keeps track of the current trial, for the probability check phase
  const [checkNumber, setCheckNumber] = useState(0);

  //increment the trial number, in the Training phase
  const increment = (integer) => setTrialNumber(integer + 1);
  //increment the trial number, in the Test phase
  const incrementTest = (integer) => setTestNumber(integer + 1);
  //increment the trial number, in the probability check phase
  const incrementCheck = (integer) => setCheckNumber(integer + 1);



  //a list of the urns about which we will ask causal questions,
  //arranged in the order in which we will ask the questions during the Test phase
  //i.e. if the array is [3,1,7] it means we will ask about the causal strength
  //of urn 3, then urn 1, then urn 7 (note that the urn ID is not the same as the position of
  //the urn on the screen)
  const test_ids = Array.from(Array(questions.length).keys());


  //generate the trials of the Test phase
  var tests = test_ids.map((i) => {
    return (
      <TestPhase key={i} incrementTest={incrementTest}
        test_ids={test_ids} phase={currentPhase} testNumber={testNumber}
         shuffledUrnIds={shuffledUrnIds} mode="test"
      />
    )
  })

  //add a page at the beginning of the Test phase which will
  //display instructions
  // tests.unshift(
  //   <TestPhase key={0} incrementTest={incrementTest}
  //     test_ids={test_ids} phase={currentPhase} testNumber={testNumber}
  //      shuffledUrnIds={shuffledUrnIds}
  //   />
  // )

  

 
  //a list of the urns about which we will ask probability questions,
  //arranged in the order in which we will ask the questions during the probability check phase
  //i.e. if the array is [3,1,7] it means we will ask about the probability
  //of urn 3, then urn 1, then urn 7 (note that the urn ID is not the same as the position of
  //the urn on the screen)
  const check_ids = useRef(shuffle(
    urn_ids.map((i) => {
      if (actualWorld[i - 1]) { return i }
    }).filter((a) => a > 0)
  )).current;


  //generate the trials of the Test phase
  var checks = check_ids.map((i) => {
    return (
      <ProbabilityCheck key={i} incrementCheck={incrementCheck}
        check_ids={check_ids} phase={currentPhase} checkNumber={checkNumber}
         shuffledUrnIds={shuffledUrnIds} probCheckOrder={probCheckOrder}
      />
    )
  })

  //add a page at the beginning of the Test phase which will
  //display instructions
  checks.unshift(
    <ProbabilityCheck key={0} incrementCheck={incrementCheck}
      check_ids={check_ids} phase={currentPhase} checkNumber={checkNumber}
      shuffledUrnIds={shuffledUrnIds} probCheckOrder={probCheckOrder}
    />
  )

  const ProlificId = (props) => {

    const [id, setId] = useState("");
    const handleId = (e)=>{
      setId(e.target.value)
    };
    const handleClick = () => {
      Data.prolificId.push(id);
      props.setCurrentPhase('consentForm');

    }
    return (
      <div style={textStyle}>Welcome to the study!<br></br>
      <br></br>
        Before we start, please enter your Prolific ID:<br></br>
        <br></br>
        <input style={{width: "400px", height: "50px", fontSize: "25px"}}
          onChange={(e) => handleId(e)}
          ></input>
          <br></br>
          <button style={buttonStyle} onClick={() => handleClick()}>submit</button>
      </div>
    )

  }


  //the end of the study
  const ending =
    <div style={textStyle}>Thank you for your participation!
      <br></br>
      Please click on this link to go back to Prolific: <a href="https://app.prolific.co/submissions/complete?cc=113C348D">https://app.prolific.co/submissions/complete?cc=113C348D</a>
      <br></br>
      After you have clicked the link, you can then close the present tab.</div>;


  // //these two variables determine which phase follows the probability check phase
  // //and the test phase, respectively
  // const afterProb = probCheckOrder === "first" ? "transition" : "demographics";
  // const afterTest = probCheckOrder === "first" ? "demographics" : "probabilityCheck"; 

  //the structure of the study:
  //this code displays a page, in function of the current phase,
  //and of the trial number within that phase
  return (
    currentPhase === "prolificId" ? <ProlificId setCurrentPhase={setCurrentPhase} /> :
      currentPhase === "consentForm" ? <ConsentForm setCurrentPhase={setCurrentPhase} /> :
        currentPhase === "instructions" ? <Instructions
          setCurrentPhase={setCurrentPhase} test_ids={test_ids} shuffledUrnIds={shuffledUrnIds} probCheckOrder={probCheckOrder} /> :
            currentPhase === "transition" ? <Transition setCurrentPhase={setCurrentPhase}
            test_ids={test_ids} 
         shuffledUrnIds={shuffledUrnIds}/> :
              currentPhase === "test" ? ((testNumber + 1) > test_ids.length ? setCurrentPhase("demographics") : tests[testNumber]) :
                //currentPhase === "probabilityCheck" ? (checkNumber > check_ids.length ? setCurrentPhase(afterProb) : checks[checkNumber]) :
                currentPhase === "demographics" ? <Demographics setCurrentPhase={setCurrentPhase} /> :
                  currentPhase === "ending" ? ending :
                    <p>{currentPhase}</p>
  )
}

//display the experiment
ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



// }