//this component is called between the Training phase and the Test phase. 
//it introduces the test phase


import { useState } from 'react';
import { shuffle } from './convenienceFunctions';
import { textStyle, buttonStyle } from './dimensions';
import { comb_array } from './randomizedParameters';
import TestPhase from './TestPhase';



const Transition = (props) => {
    //keeps track of which page we are on
    const [ transitionTrial, setTransitionTrial ] = useState(0);
    //a list of the pages for the transition
    const transitionTrialsList = [
        <TransitionOne setTransitionTrial={setTransitionTrial}/>,
        <TransitionTwo setTransitionTrial={setTransitionTrial}
        setCurrentPhase={props.setCurrentPhase}
        test_ids={props.test_ids} 
         shuffledUrnIds={props.shuffledUrnIds}/>,
        <TransitionThree setCurrentPhase={props.setCurrentPhase}
         />
    ];
    //display the current page
    return(
        transitionTrialsList[transitionTrial]
    )
    
    
}

//a question about the game difficulty
const TransitionOne = (props) => {
    //keeps track of the latest likert response
    
    const handleClick = () =>{
        props.setTransitionTrial((a)=>a+1);
    }
    
    const colornames = shuffle(['blue', 'green', 'red', 'yellow']);

    //display the question
    return(
        <div style={textStyle}>
       <p> On each page, you will see a box.
           If someone draws one ball from that box, which color might they get?</p>
<p>There are different guesses that one could make -- for instance, “it will probably be a {colornames[0]} ball”, “it will probably be a {colornames[1]} ball or a {colornames[2]} ball”, etc.</p>
<p>For each box, we will ask you to make a guess. You can compose a guess by clicking on buttons that will add colors to the guess. For instance, if you want to make the guess
"it will probably be a {colornames[0]} ball or a {colornames[1]} ball or a {colornames[2]} ball", you can click on the button for {colornames[0]}, the button for {colornames[1]} and the button for {colornames[2]}.
</p>        
        <br></br>
        <button style={buttonStyle} onClick={()=>handleClick()}>click to continue</button>
        </div>
        
    )
}


const TransitionTwo = (props) => {
    
    return(
        <TestPhase key={0} 
        test_ids={props.test_ids} phase="transition" testNumber={9}
         shuffledUrnIds={props.shuffledUrnIds} 
         setTransitionTrial={props.setTransitionTrial} 
         setCurrentPhase={props.setCurrentPhase}
         mode="instructions"/>
    )
}



//briefly introduces the test phase
const TransitionThree = (props) => {
    
    return(
        <div style={textStyle}>
            <p>There will be {comb_array.length} boxes in total.</p>
            <p>Please try to stay concentrated and engaged throughout the task.</p>
            <button style={buttonStyle} onClick={()=>props.setCurrentPhase('test')}>click to start the task</button>
        </div>
    )
    
}
export default Transition;