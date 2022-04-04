//this component generates one urn. It is used during the Training phase.
//the urn has a button next to it, which is used by the participant to 
//draw a ball from the urn. When the urn is generated, it is already determined
//which ball will be drawn from the urn.


import React, { useState, useRef } from 'react';
import {
  ball_size, margin, r, urnHeight, svgHeight, urnWidth, svgWidth, y_start,
  ball_pos, urn_style
} from './dimensions';
import { shuffle, getRandomInt } from './convenienceFunctions';
import { color_palette, threshold } from './gameParameters'


const GenerateUrn = ({ ids, urnColorID, urnLetter, prob, drawn,
  scoreSetter, setCounter, phase, ballColors, score, setScoreColor, urnID }) => {
  //the number of points associated with the ball we draw
  
  let color = phase === "instructions" ? "#F77B25" : color_palette[urnID - 1];
  //retrieve the color associated with the ball we draw
  
  //this variable determined the color of the placeholder for the drawn ball
  //(it is white before we draw a ball, and then takes the color of the drawn ball)
  const [drawnColor, setDrawnColor] = useState("white");
  //have we clicked on the "draw" button yet?
  const [clicked, setClicked] = useState(false);

  const drawColor = () =>{
    let index = getRandomInt(0,11);
    let newColor = ballColors[index]
    
    let newColors = Array.from(Array(bColors.length).keys()).map((i)=>{
      return(i == index ? "white" : bColors[i])
    })
    setBColors(newColors);
    setTimeout(() => setDrawnColor(newColor), 300);
    setCounter((a)=>a+1);

  }

  const undrawColor = () =>{
    setDrawnColor("white");
    setTimeout(()=>setBColors(ballColors), 300);
  }
  
  //the "draw" button. It disappears once we click on it

  const initialButton = <text id="buttonText" border="black"  fontSize={ball_size / 2}
  x={5.5 * ball_size} y={y_start - 2 * ball_size}
  style={{fontFamily:"sans-serif"}}
  cursor="pointer"
  onClick={()=>handleClick(drawn)}
  >Draw</text>;

  const [drawButton, setDrawButton] = useState(
    
    initialButton
  
    );

  

//the button to put a ball back in the box. It appears once the 'draw' button is clicked
const [putBackButton, setPutBackButton] = useState(null);

const putBack = <text id="buttonText" border="black"  fontSize={ball_size / 2}
x={7.5 * ball_size} y={y_start - 2 * ball_size}
style={{fontFamily:"sans-serif"}}
cursor="pointer"
onClick={()=>handlePutBack(drawn)}
>Put back</text>;

  const initialRectangle = <rect onClick={() => handleClick(drawn)}
  cursor="pointer"
  border="black" stroke="black" strokeWidth={ball_size/20}
  x={5.4 * ball_size}
  rx="5px" ry="5px"
   y={y_start - 2.65 * ball_size}
  width={ball_size * 1.4} height={ball_size} fill="#e7e7e7"  ></rect>

  const [ drawRectangle, setDrawRectangle ] = useState(
    initialRectangle
  )

  const secondRectangle = <rect onClick={() => handlePutBack(drawn)}
  cursor="pointer"
  border="black" stroke="black" strokeWidth={ball_size/20}
  x={7.4 * ball_size}
  rx="5px" ry="5px"
   y={y_start - 2.65 * ball_size}
  width={ball_size * 2.2} height={ball_size} fill="#e7e7e7"  ></rect>;

  const [ drawSecondRectangle, setDrawSecondRectangle ] = useState(
    null
  );
  
  
  
  //the letter displayed next to the urn
  const letter = phase === "instructions" ? null : <text border="black" stroke="black" cursor="default" fontSize={ball_size / 2}
    x={5.3 * ball_size} y={y_start - 4 * ball_size}>{urnLetter}</text>

 
  //when we click on the "draw" button, dispay the ball, make the button disappear,
  //update the score, and increment the counter
  //keeping track of how many urns from drawn from
  const handleClick = () => {
    drawColor();
    
    setDrawButton(null);
    setDrawRectangle(null);
    setTimeout(()=> setPutBackButton(putBack), 500);
    setTimeout(()=>setDrawSecondRectangle(secondRectangle), 500);
  }

  const handlePutBack = () => {
    undrawColor();
    
    setPutBackButton(null);
    setDrawSecondRectangle(null);
    setTimeout(()=>setDrawButton(initialButton), 500);
    setTimeout(()=>setDrawRectangle(initialRectangle), 500);
    
  }

  const [ bColors, setBColors ] = useState(ballColors);

  //draw the balls
  let circles = ids.map((i) => {
    let x = i % 4;
    let y = Math.floor(i / 4);
    let color = bColors[i];
    return (

      <circle
        cx={ball_pos.xCoords[x]} cy={ball_pos.yCoords[y]} r={r} fill={color}
      />
    )
  })
  //display the urn
  return (
    <span>
      <svg width={1.2*svgWidth} height={svgHeight} id={"id"} >
        <rect style={urn_style} ></rect>
        {circles}
        <circle cx={5.7 * ball_size} cy={y_start} r={r} fill={drawnColor} stroke="black" />
        {letter}
        {drawRectangle}
        {drawButton}
        {drawSecondRectangle}
        {putBackButton}
        
      </svg>
    </span>
  )
}



export default GenerateUrn;