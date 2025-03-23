const lodash= require('lodash');

const numbers=[35,75,45,95,72,64];

const maxNumber= lodash.max(numbers);

const minNumber= lodash.min(numbers);

console.log("the maxNumber is: ", maxNumber);

console.log("The minNumber is: ", minNumber);
