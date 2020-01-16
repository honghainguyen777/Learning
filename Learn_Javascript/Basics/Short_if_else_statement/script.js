// Short if else statement
var age = 19;
var drink = age >= 18 ? 'beer' : 'juice';
console.log(drink);

// equivalent to:
if (age >= 18) {
	console.log('beer');
} else {
	console.log('juice');
}

// one more example
var grade = 10;
var grade_pass = grade >= 4.0 ? console.log('you passed')
	: console.log('you falsed');

// equivalent to:
if (grade >= 4) {
	console.log('you passed');
} else {
	console.log('you falsed');
}