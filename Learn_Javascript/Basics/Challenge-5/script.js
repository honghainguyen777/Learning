/*****************************
 * CODING CHALLENGE 5
 */

/*
Remember the tip calculator challenge? Let's create a more advanced version using everything we learned!

This time, John and his family went to 5 different restaurants. The bills were $124, $48, $268, $180 and $42.
John likes to tip 20% of the bill when the bill is less than $50, 15% when the bill is between $50 and $200, and 10% if the bill is more than $200.

Implement a tip calculator using objects and loops:
1. Create an object with an array for the bill values
2. Add a method to calculate the tip
3. This method should include a loop to iterate over all the paid bills and do the tip calculations
4. As an output, create 1) a new array containing all tips, and 2) an array containing final paid amounts (bill + tip). HINT: Start with two empty arrays [] as properties and then fill them up in the loop.


EXTRA AFTER FINISHING: Mark's family also went on a holiday, going to 4 different restaurants. The bills were $77, $375, $110, and $45.
Mark likes to tip 20% of the bill when the bill is less than $100, 10% when the bill is between $100 and $300, and 25% if the bill is more than $300 (different than John).

5. Implement the same functionality as before, this time using Mark's tipping rules
6. Create a function (not a method) to calculate the average of a given array of tips. HINT: Loop over the array, and in each iteration store the current sum in a variable (starting from 0). After you have the sum of the array, divide it by the number of elements in it (that's how you calculate the average)
7. Calculate the average tip for each family
8. Log to the console which family paid the highest tips on average

GOOD LUCK 😀
*/

// Create an array of all bills for John
JohnExp = {
  name: 'John',
  bills: [124, 268, 180, 42],
  tipCal: function() {
    this.tips = [];
    this.finalAmounts = [];
    for (i = 0; i < this.bills.length; i++) {
      var percentage;
      var bill = this.bills[i]
      bill < 50 ? percentage = 20 :
        bill > 200 ? percentage = 10 :
        percentage = 15
      this.tips.push(bill * percentage / 100);
      this.finalAmounts.push(bill + bill * percentage / 100)
    }
  }
}

// Create an array of all bills for Mark
MarkExp = {
  name: 'Mark',
  bills: [77, 375, 110, 45],
  tipCal: function() {
    this.tips = [];
    this.finalAmounts = [];
    for (i = 0; i < this.bills.length; i++) {
      var percentage;
      var bill = this.bills[i]
      bill < 50 ? percentage = 20 :
        bill > 200 ? percentage = 25 :
        percentage = 10
      this.tips.push(bill * percentage / 100);
      this.finalAmounts.push(bill + bill * percentage / 100)
    }
  }
}

// create a function to calculate average amout of tip
var tipAverCal = function(tips) {
  var totalTip = 0;
  for (i = 0; i < tips.length; i++) {
    totalTip = totalTip + tips[i]
  }
  return totalTip / tips.length;
}

// Perform the tipCal
JohnExp.tipCal();
MarkExp.tipCal();

// which family has paid the highest tips on average
JohnTipAver = tipAverCal(JohnExp.tips);
MarkTipAver = tipAverCal(MarkExp.tips);
var compare = JohnTipAver > MarkTipAver ?
  console.log(JohnExp.name + ' has paid the highest tips of $' + JohnTipAver + ' on average') :
  JohnTipAver < MarkTipAver ?
  console.log(MarkExp.name + ' has paid the highest tips of $' + MarkTipAver + ' on average') :
  console.log('Both families have spent the same amout on tips of $' + JohnTipAver)


/* Long code:
var john = {
  bills: [124, 48, 268, 180, 42],
  tips: [],
  final: [],
  calcTip: function() {
    for (var i = 0; i < this.bills.length; i++) {
      if (this.bills[i] < 50) {
        this.tips.push(this.bills[i] * 0.2);
      } else if (this.bills[i] > 200) {
        this.tips.push(this.bills[i] * 0.1);
      } else {
        this.tips.push(this.bills[i] * 0.15);
      }
    }
  },
  calcTotal: function() {
    for (var i = 0; i < this.tips.length; i++) {
      this.final.push(this.tips[i] + this.bills[i]);
    }
  }
}

john.calcTip();
john.calcTotal();


var mark = {
  bills: [77, 475, 110, 45],
  tips: [],
  final: [],
  calcTip: function() {
    for (var i = 0; i < this.bills.length; i++) {
      if (this.bills[i] < 50) {
        this.tips.push(this.bills[i] * 0.2);
      } else if (this.bills[i] > 200) {
        this.tips.push(this.bills[i] * 0.25);
      } else {
        this.tips.push(this.bills[i] * 0.1);
      }
    }
  },
  calcTotal: function() {
    for (var i = 0; i < this.tips.length; i++) {
      this.final.push(this.tips[i] + this.bills[i]);
    }
  }
}

mark.calcTip();
mark.calcTotal();

var avgTip = function(tips) {
  total = 0;
  for (var i = 0; i < tips.length; i++) {
    total += tips[i];
  }
  return total / tips.length;
}

johnTip = avgTip(john.tips);
markTip = avgTip(mark.tips);

if (johnTip > markTip) {
  console.log('John family paid the highest tip of ' + johnTip + ' in average');
} else if (johnTip < markTip) {
  console.log('Mark family paid the highest tip of ' + markTip + ' in average');
} else {
  console.log('Both Mark and Mark families paid the same tip of ' + markTip + ' in average');
}

*/
