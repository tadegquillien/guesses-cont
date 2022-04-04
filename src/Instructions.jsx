//this component displays instructions

import { useRef, useState } from 'react';
import GenerateUrn from './GenerateUrn';
import GenerateDeterministicUrn from './GenerateDeterministicUrn';
import { shuffle } from './convenienceFunctions';
import {
    circle_ids, color_palette, mode, urn_ids, urn_letters, PROBS, colors, actualWorld,
    threshold
} from './gameParameters';

import { r } from './dimensions';
import './Instructions.css'
import { textStyle, buttonStyle } from './dimensions';
import Data from './Data';





const Instructions = (props) => {
    //keeps track of the current page
    const [trialNumber, setTrialNumber] = useState(0);

    //update the page number
    const incrementTrial = () => {
        setTrialNumber((a) => a + 1);
    }

    //the dimensions for some of the text
    const localTextStyle = {
        display: "flex",
        flexDirection: "column",
        //justifyContent: "center",
        alignItems: "center",
        textAlign: "left",
        //minHeight: "100vh",
        marginLeft: "10vw",
        marginRight: "10vw",
        fontSize: "20px",
    }

    //the props we will pass on to each page
    const tutorialProps = {
        setCurrentPhase: props.setCurrentPhase,
        incrementTrial: incrementTrial,
        localTextStyle: localTextStyle
    };



    //the list of pages
    const instructionTrials = [<Intro {...tutorialProps} />,
    <IntroTwo {...tutorialProps} />,
    <IntroThree {...tutorialProps} />
];
 

    //display the current page
    return (
        instructionTrials[trialNumber]
    )

}

//the first page
const Intro = (props) => {
    return (
        <span style={textStyle}
        >
            <p style={{ color: "red" }}>(Please do not refresh the page during the study -- you would be unable to complete the experiment)</p>
            <br></br>
            <p>In this study, we will ask you to imagine a few simple scenarios.</p>
<p>In each scenario, you are a researcher preparing for a presentation. 
    For your presentation, you need to find some information 
    (for example, what is the age of planet Earth?). You have two research assistants: assistant A and assistant B,
    and you ask each of them for his best estimate.</p>


            <button style={buttonStyle} onClick={() => props.incrementTrial()}>click to continue</button>
            <br></br>
        </span>
    )
}


//the second page
const IntroTwo = (props) => {
    
    //when the participant clicks on 'draw', a button appears which allows him
    //to go to the next page
    const nextPageButton = 
        <button style={buttonStyle} onClick={() => props.incrementTrial()}>click to continue</button>;





    //display the page
    return (

        <div className="page"
        //style={textStyle}
        >
            <div //className="text" 
            style={props.localTextStyle}
            >
                <p>Each assistant gives you his best guess.
     Because your assistants don’t know the correct answer exactly,
      they will give you what they think is a good range of possible values.
       For instance, to the question “what is the age of planet Earth?”, 
       a research assistant might answer “2 billion to 4 billion years”.</p>
<p>Later, you find out the correct answer to your question, 
    and you can compare it with the estimates given by your assistants. </p>

    <p>For each scenario we will show you the question, as well as the estimate of each of your assistants,
        and the correct answer.
        We will ask you if you think that assistant A or assistant B gave the best estimate.
</p>
                {nextPageButton}
            </div>

        </div>




    )

}

//the third page
const IntroThree = (props) => {
    
    //when the participant clicks on 'draw', a button appears which allows him
    //to go to the next page
    const nextPageButton = 
        <button style={buttonStyle} onClick={() => props.setCurrentPhase("test")}>click to start the task</button>;





    //display the page
    return (

        <div className="page"
        //style={textStyle}
        >
            <div //className="text" 
            style={props.localTextStyle}
            >
                <p>There will be 21 scenarios in total. Please consider them as independent from each other. 
                    That is, assistant A and assistant B in the first scenario are not the same people as assistant A
                     and assistant B in the second scenario, and so on.</p>
                {nextPageButton}
            </div>

        </div>




    )

}
/* 
//the third page
const TaskTutorialTwo = (props) => {
 

    const handleClick = () => {
     
        props.setCurrentPhase(nextPhase);
    }

    //after the participant clicks on "draw", a button appears that goes to the next phase
    const nextPageButton = 
        <button style={buttonStyle} onClick={() => handleClick()}>click to continue</button>;

    

    //display the page
    return (

        <div className="page">
            <div //className="text" 
            style={props.localTextStyle}
            >
                <p>Here is another example of a box </p>
                <p>Each ball is equally likely to be drawn from the box, so the more balls of a given color there are, the more likely you are to draw that color.</p></div>

            {/* <div className="afterClick" style={props.localTextStyle}
            >

                
            </div> */

//             <div className="containerInst">
            
//                 {/*generate one urn. It is set up so that the participant will draw a red ball*/}
//                 <div className="urnInst">
//                 {nextPageButton}
//                     <GenerateUrn ids={circle_ids} urnColorID={1} urnLetter={"A"}
//                     drawn={1}
//                     ballColors={useRef(shuffle(["yellow", "yellow", "yellow", "yellow", "yellow", "yellow",
//                         "yellow", "yellow", "yellow",
//                         "red", "blue", "green"])).current}
//                     phase={"instructions"}
//                     testNumber={1}
//                     test_ids={props.test_ids}
//                     shuffledUrnIds={props.shuffledUrnIds}
//                     scoreSetter={setScore}
//                     setCounter={setCounter}
//                 /></div>
//             </div>
            

//         </div>

//     )

// }


// //the fourth page
// const TaskTutorialThree = (props) => {
//     //draw five balls, each of different color,
//     //along with the points associated with that color
//     const circles = [0, 1, 2, 3, 4].map((i) => {
//         let s = i === 1 ? null : "s";
//         let fill = i === 0 ? "black" : color_palette[i - 1]
//         return (
//             <svg height="75px">
//                 <circle
//                     cx={120} cy={50} r={r} fill={fill} stroke="black"
//                 />
//                 <text x={140} y={55}> : {i} point{s}</text>
//             </svg>
//         )
//     });

//     //display the page
//     return (
//         <div style={textStyle}>
//             <p>The redder the ball, the more points it gives:</p>
//             {circles}
//             <br></br>
//             <button style={buttonStyle} onClick={() => props.incrementTrial()}>click to continue</button>
//         </div>
//     )
// }

// //the fifth page
// const TaskTutorialFour = (props) => {
//     return (
//         <div style={textStyle}>
//             <p>In </p>
//             <p>The game consists in drawing a ball from each of three boxes.</p>
//             <p>To win, you need to score <b>at least {threshold} points</b>. Remember that each colored ball you draw is worth 1 point.</p>
//             <p>You will need to draw a ball from each of the three boxes before moving on to the next round.</p>
//             <p><i>Please pay close attention to how your score increases as you draw colored balls.</i></p>
//             <button style={buttonStyle} onClick={() => props.incrementTrial()}>click to continue</button>
//         </div>
//     )

// }

// //the sixth page: two comprehension questions
// const TaskTutorialFive = (props) => {
//     //keep track the participants' answers
//     const [black, setBlack] = useState("NA");
//     const [goal, setGoal] = useState("NA");

//     //update the participants' answer

//     const handleBlack = (e) => {
//         setBlack(e.target.value);
//     };

//     const handleGoal = (e) => {
//         setGoal(e.target.value);
//     };

//     //when the participant submits the form, record the data 
//     //and start the training phase
//     const handleClick = () => {
//         Data.comprehension.push({
//             "questionBlack": black,
//             "questionGoal": goal
//         })

//         const nextPhase = props.probCheckOrder == "first" ? "probabilityCheck" : "test";

//         props.setCurrentPhase(nextPhase);
//     }
//     //display the questions
//     return (
//         <div style={textStyle}>
//             <h3>Before starting, please take a moment to answer the following questions:</h3>
//             <form>
//                 <label for="blackQuestion">How many points do you get when you draw a black ball?</label>
//                 <br></br>
//                 <br></br>
//                 <select name="blackQuestion"
//                     onChange={(e) => handleBlack(e)}>
//                     {["NA", 0, 1, 2, 3, 4].map((i) => {
//                         return (
//                             <option name={i} value={i}>{i === 'NA' ? '' : i}</option>
//                         )
//                     })}
//                 </select>
//                 <br></br>
//                 <br></br>
//                 <label for="goalQuestion">What is the condition for winning the game?</label>
//                 <br></br>
//                 <br></br>
//                 <select name="goalQuestion"
//                     onChange={(e) => handleGoal(e)}>
//                     <option name="NA" value="NA"> </option>
//                     <option name="sameColor" value="sameColor">every ball you draw must be of the same color</option>
//                     <option name="onlyColor" value="onlyColor">you must draw exactly zero black balls</option>
//                     <option name="threshold" value="threshold">you must get at least {threshold} points</option>
//                     <option name="even" value="even">you must draw an even number of black balls</option>
//                 </select>
//             </form>
//             <br></br>
//             <button style={buttonStyle} onClick={() => handleClick()}>click here to start playing the game</button>
//         </div>

//     ) */




export default Instructions;