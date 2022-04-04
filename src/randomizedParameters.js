//these elements are randomly generated at the start of the experiment
//after being generated, they keep the same value throughout the experiment

import { shuffle } from './convenienceFunctions';
import {
    circle_ids, color_palette, mode, urn_ids, urn_letters, PROBS, colors, actualWorld,
    threshold
} from './gameParameters'

/// generate a list of questions

// our building blocks: lists containing the lower and upper intervals for A and B,
// the ground truth, and the label

const labels = ["darwin", "polio", "EU", "UN",
    "boston", "japan", "airports", "everest",
    "amazon", "transatlantic", "sino-japanese war", "Chicago rain",
    "miami march temperature", "Chicago-NYC", "education budget", "LeBron James",
    "Fed chairman", "horse", "mozart", "kubrick", "marathon"];

const prompts = ["Year Charles Darwin was born?",
"Year the polio vaccine was invented?",
"Number of member states in the European Union?",
"Number of member states in the United Nations?",
"Number of people living in Boston?",
"Number of people living in Japan?",
"Number of public airports in the United States?",
"Height of Mount Everest?",
"Length of the Amazon river?",
"Date of the first transatlantic flight?",
"Date the Sino-Japanese War began?",
"Average number of rainy days in Chicago?",
"Average temperature in Miami in March?",
"Air distance between Chicago and New York City?",
"Annual budget of the US department of education?",
"Number of points scored by LeBron James in his entire NBA career?",
"Monthly salary of the chairman of the U.S. Federal Reserve?",
"Average gestation length of a horse?",
"Age of Mozart when he died?",
"Number of movies directed by Stanley Kubrick?",
"World record time for the marathon?"
]    

const lowerX= [1770, 1930, 28, 175,
    500000, 135, 5000, 8000,
    6300, 1890, 1870, 140,
    22, 730, 80, 30000,
    18000, 8, 18, 7, 110];

const lowerXVerbal = [1770, 1930, 28, 175,
    500000, '135 million', 5000, 8000,
    6300, 1890, 1870, 140,
    22, 730, '$80 billion', 30000,
    '$18000', 8, 18, 7, 110];

const upperX = [1800, 1950, 31, 185,
    700000, 150, 5300, 8700,
    7000, 1920, 1890, 180,
    28, 780, 120, 36000,
    21000, 10, 30, 11, 130];

const upperXVerbal = [1800, 1950, 31, 185,
    700000, '150 million', 5300, '8700 meters',
    '7000 kilometers', 1920, 1890, 180,
    '28 degrees C', '780 miles', '$120 billion', 36000,
    '$21000', '10 months', '30 years old', 11, '130 minutes'];


const lowerY = [1820, 1920, 20, 50,
    730000, 50, 5000, 9050,
    6100, 1935, 1875, 150,
    20, 700, 90, 39000,
    5000, 7, 42, 1, 30];

const lowerYVerbal = [1820, 1920, 20, 50,
    730000, '50 million', 5000, 9050,
    6100, 1935, 1875, 150,
    20, 700, '$90', 39000,
    '$5000', 7, 42, 1, 30];

const upperY = [1825, 1990, 30, 300,
    750000, 200, 5400, 9150,
    6200, 1938, 1925, 160,
    40, 1500, 100, 40000,
    20000, 25, 45, 20, 40];

const upperYVerbal = [1825, 1990, 30, 300,
    750000, '200 million', 5400, '9150 meters',
    '6200 kilometers', 1938, 1925, 160,
    '40 degrees C', '1500 miles', '$100 billion', 40000,
    '$20000', '25 months', '45 years old', 20, '40 minutes'];

const groundTruth = [1809, 1952, 27, 193,
    684000, 126, 5217,
    8849,
    6400, 1927, 1894, 130,
    22, 713, 68, 37024,
    16900, 11, 35, 13, 121];

const groundTruthVerbal = [1809, 1952, 27, 193,
    684000, '126 million', 5217, '8849 meters',
    '6400 kilometers', 1927, 1894, 130,
    '22 degrees C', '713 miles', '$68 billion', 37024,
    '$16900', '11 months', '35 years old', 13, '121 minutes'];


// generate a list of objects, each corresponding to a question
export const questions = shuffle([...Array(labels.length).keys()].map((i) => {
    return ({
        label: labels[i],
        prompt: prompts[i],
        groundTruth: groundTruth[i],
        lowerX: lowerX[i],
        upperX: upperX[i],
        lowerY: lowerY[i],
        upperY: upperY[i],
        lowerXVerbal : lowerXVerbal[i],
        upperXVerbal : upperXVerbal[i],
        lowerYVerbal : lowerYVerbal[i],
        upperYVerbal : upperYVerbal[i],
        groundTruthVerbal : groundTruthVerbal[i]
    })
}));

console.log(questions);

//randomly generates a list of the position of the colored balls within an urn,
//for each urn
export const ballColorsList =
    //cycle through all urns
    urn_ids.map((a) => {
        let prob = PROBS[a - 1];
        let urnColorID = colors[a - 1];
        //cycle through all balls
        let ballColors = circle_ids.map((i) => {
            //fill the urn with N colored balls, then 10-N black balls
            let number = prob * 20;
            let urnColor = color_palette[a - 1];
            let color = i < number ? urnColor : "black";
            return color;
        });
        //shuffle the urn
        ballColors = shuffle(ballColors);

        return ballColors

    });

export const comb_array = shuffle([
    [3, 3, 3, 3],
    [4, 4, 3, 1],
    [4, 4, 2, 2],
    [4, 3, 3, 2],
    [5, 4, 2, 1],
    [5, 3, 3, 1],
    [5, 3, 2, 2],
    [6, 4, 1, 1],
    [6, 3, 2, 1],
    [6, 2, 2, 2],
    [7, 3, 1, 1],
    [8, 2, 1, 1],
    [9, 1, 1, 1]
]
)

comb_array.push([6, 6, 0, 0]);


export const expanded_comb_array = comb_array.map((c) => {
    //construct an array which pre-specified the repartition
    //of colors in the urn
    let counter = -1;
    var comb_expanded =
        c.map((i) => {
            counter = counter + 1;

            return ([...Array(i).keys()].map((ii) => {
                return (counter)
            }))
        });

    comb_expanded = comb_expanded.flat();

    const shuffled_colors = shuffle(color_palette);


    return (shuffle(comb_expanded.map((i) => {

        return (shuffled_colors[i]);
    })));

})

//a variable randomly assigning the participant to answer the probability
//comprehension questions either before or after the main task
export const probCheckOrder = "last";

//randomize the order in which the urns are presented on the screen
//(applies to both the Training phase and Test phase)
export const shuffledUrnIds = shuffle(urn_ids);

//the order in which the participant sees the color buttons
export const buttonOrder = shuffle(["red", "green", "yellow", "blue"]);


