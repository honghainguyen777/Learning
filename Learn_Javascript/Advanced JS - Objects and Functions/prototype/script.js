// create a constructor name Dogs for the information of all Dogs

var Dogs = function(name, sex, yearOfBirth) {
  this.name = name,
  this.sex = sex,
  this.yearOfBirth = yearOfBirth,
  this.calcAge = function() {
    this.age = 2020 - this.yearOfBirth;
    return this.age;
  }
}

Dogs.prototype.ageDogToHuman = function() {
  if (this.age === 1) {
    this.ageHuman = 15;
  } else if (this.age === 2) {
    this.ageHuman = 15 + 9;
  } else {
    this.ageHuman = 15 + 9 + 5 * (this.age - 2);
  }
  return this.ageHuman;
};

var kitty = new Dogs('Kitty', 'male', 2018);
var weed = new Dogs('Weed', 'male', 1991);

kitty.calcAge();
kitty.ageDogToHuman();
weed.calcAge();
weed.ageDogToHuman();
