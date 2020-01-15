/*
Mark and John are trying to compare their BMI (Body Mass Index), which is calculated using the formula: BMI = mass / height^2 = mass / (height * height). (mass in kg and height in meter).

1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs
3. Create a boolean variable containing information about whether Mark has a higher BMI than John.
4. Print a string to the console containing the variable from step 3. (Something like "Is Mark's BMI higher than John's? true"). 

GOOD LUCK 😀
*/

// Create Mark's and John's mass and height variables
var massMark, heightMark, massJohn, heightJohn;

// prompt Mark's and John's mass and height
massMark = prompt("Please provide Mark's mass:");
heightMark = prompt("Please provide Mark's height:");
massJohn = prompt("Please provide John's mass:");
heightJohn = prompt("Please provide John's height:");

// calculate BMI of Mark and John
var bmiMark = massMark / (heightMark * heightMark);
var bmiJohn = massJohn / (heightJohn * heightJohn);

// is Mark has a higher BMI than John?
var bmiCompare = bmiMark > bmiJohn;

console.log("Is Mark's BMI higher than John's? " + bmiCompare);