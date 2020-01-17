/*****************************
* CODING CHALLENGE 4
*/

/*
Let's remember the first coding challenge where Mark and John compared their BMIs. Let's now implement the same functionality with objects and methods.
1. For each of them, create an object with properties for their full name, mass, and height
2. Then, add a method to each object to calculate the BMI. Save the BMI to the object and also return it from the method.
3. In the end, log to the console who has the highest BMI, together with the full name and the respective BMI. Don't forget they might have the same BMI.

Remember: BMI = mass / height^2 = mass / (height * height). (mass in kg and height in meter).

GOOD LUCK 😀
*/

// Information about Mark
var MarkInfo = {name: 'Mark Weed', mass: 95, height: 1.80,
                calBMI: function() {
                this.BMI = this.mass / (this.height * this.height);
                return this.BMI;
               }};

// Information about John
var JohnInfo = {name: 'John Stark', mass: 70, height: 1.86,
                calBMI: function() {
                this.BMI = this.mass / (this.height * this.height);
                return this.BMI;
               }};

// compare their BMIs
var compare = MarkInfo.calBMI() > JohnInfo.calBMI()
    ? console.log(MarkInfo.name + ' has a highest BMI, which is ' + MarkInfo.BMI)
    : MarkInfo.BMI() < JohnInfo.BMI()
    ? console.log(JohnInfo.name + ' has a highest BMI, which is ' + JohnInfo.BMI)
    : console.log(MarkInfo.name + ' and ' + JohnInfo.name + ' have the same BMI of ' + MarkInfo.BMI)