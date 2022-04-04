//this component generates one urn. It is used during the Test phase.


import React, { useState, useRef } from 'react';
import {
    ball_size, margin, r, urnHeight, svgHeight, urnWidth, svgWidth, y_start,
    ball_pos, urn_style
} from './dimensions';
import { shuffle } from './convenienceFunctions';
import { color_palette, urn_letters } from './gameParameters'


const GenerateDeterministicUrn = ({ ids, 
    phase, ballColors, testNumber, test_ids}) => {
    
    //draw the balls
    let circles = ids.map((i) => {
        let x = i % 4;
        let y = Math.floor(i / 4);
        let color = ballColors[i];
        return (

            <circle
                cx={ball_pos.xCoords[x]} cy={ball_pos.yCoords[y]} r={r} fill={color}
            />
        )
    })

    //display the urn
    return (
        <span>
            <svg width={svgWidth} height={svgHeight} id={"id"} >

                <rect style={urn_style} ></rect>
                {circles}
                
                {/* <rect width={svgWidth} height={svgHeight} stroke={borderColor}
                    strokeWidth="4px" fill="none"></rect> */}

            </svg>
        </span>
    )
}



export default GenerateDeterministicUrn;