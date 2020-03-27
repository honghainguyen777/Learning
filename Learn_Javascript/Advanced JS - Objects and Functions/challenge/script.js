/////////////////////////////
// CODING CHALLENGE


/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/
/*
--- Expert level ---

8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)

9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.

10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).

11. Display the score in the console. Use yet another method for this.
*/


(function() {
  //function constructor called Question: question, answers (1 correct), correct answers
  var Question = function(question, answers, correntAnswer) {
    this.question = question;
    this.answers = answers;
    this.correntAnswer = correntAnswer;
  };

  // using the above constructor to build some questions
  question1 = new Question('Who is the president of Germany?', ['Angela Merkel', 'Frank-Walter Steinmeier', 'Donald Trump'], 'Frank-Walter Steinmeier');
  question2 = new Question('Where is Vietnam?', ['Europe', 'America', 'Asia'], 'Asia');
  question3 = new Question('What is COVID-19?', ['Virus', 'Bullshit', 'Alien'], 'Virus');
  question4 = new Question('Does Hai love Javascript?', ['Nope', 'He loves it', 'He bored'], 'I love it');

  // store all question inside an array
  var questions = [question1, question2, question3, question4];

  // select one random question and log it on the console with possible answers, each question has a number
  Question.prototype.printQuestion = function(n) {
    console.log('Question ' + n + ': ' + this.question);
    for (var i = 0; i < this.answers.length; i++) {
      console.log(i + 1 + '. ' + this.answers[i]);
    }
  }

  // call out the loop for questioning reqeatedly
  questionLoop();

  // questioning reqeatedly
  function questionLoop() {
    //initialize the number of questions has been asked
    var countQuestion = 1;
    // current score - correct answer
    var score = 0;

    // infinite loop
    // Instead of this, we can make a function nextQuestion, then call it at the end
    // inside the function (recursive function) and after the function
    while (true) {
      // display the question and possible answers
      var numQuestion = Math.floor(Math.random() * questions.length);
      currentQuestion = questions[numQuestion]
      currentQuestion.printQuestion(countQuestion);

      // prompt for user to enter his/her answer
      var userAnswer = prompt('Please enter your answer for question ' + countQuestion + ': (type \'exit\' to exit the quiz)');
      //if the user want to exiit, then break the loop
      if (userAnswer === 'exit') {
        console.log('See you soon! Bye!');
        break;
      }

      // check if answer is correct and valid - print it to the console
      if (userAnswer > 0 && userAnswer <= currentQuestion.answers.length) {
        // if user answer correctly
        if (currentQuestion.answers[userAnswer - 1] === currentQuestion.correntAnswer) {
          // increase score by 1
          score += 1;
          console.log('You answered correctly!');
          // print score and number of questions
          printScore(score, countQuestion);
        } else {
          // if not correct, print current score and no. of question
          console.log('You are wrong!');
          printScore(score, countQuestion);
        }
      } else {
        // if the user enter an invalid answer
        console.log('You entered an invalid answer!');
        console.log('-------------------------------------');
        // go to the next iteration
        continue;
      }
      // create a dashed line
      console.log('-------------------------------------');
      // increase the number of question has been asked by 1
      countQuestion +=1;
    };
  };

  // Function for printing the score, we can use prototype here instead of.
  function printScore(score, countQuestion) {
    console.log('Current score: ' + score + ' out of ' + countQuestion);
  }
})();



// make sure the code is private
