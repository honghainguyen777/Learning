/*
John and Mike both play basketball in different teams. In the latest 3 games, John's team scored 89, 120 and 103 points, while Mike's team scored 116, 94 and 123 points.

1. Calculate the average score for each team
2. Decide which teams wins in average (highest average score), and print the winner to the console. Also include the average score in the output.
3. Then change the scores to show different winners. Don't forget to take into account there might be a draw (the same average score)

4. EXTRA: Mary also plays basketball, and her team scored 97, 134 and 105 points. Like before, log the average winner to the console. HINT: you will need the && operator to take the decision. If you can't solve this one, just watch the solution, it's no problem :)
5. Like before, change the scores to generate different winners, keeping in mind there might be draws.

GOOD LUCK 😀
*/

var averScoreTeam1 = (89 + 120 + 103)/3;
var averScoreTeam2 = (116 + 94 + 123)/3;
var averScoreTeam3 = (116 + 94 + 123)/3;
var winner, score;

// shorthand if-else version
var [winner, score] = averScoreTeam1 > (averScoreTeam2 && averScoreTeam3)
    ? ['john\'s', averScoreTeam1]
    : averScoreTeam2 > (averScoreTeam1 && averScoreTeam3)
    ? ['Mike\'s', averScoreTeam2]
    : averScoreTeam3 > (averScoreTeam1 && averScoreTeam2)
    ? ['Marry\'s', averScoreTeam3]
    : (averScoreTeam1 === averScoreTeam2) && (averScoreTeam1 > averScoreTeam3)
    ? ['John\'s and Mike\'s', averScoreTeam1]
    : (averScoreTeam1 === averScoreTeam3) && (averScoreTeam1 > averScoreTeam2)
    ? ['John\'s and Marry\'s', averScoreTeam1]
    : (averScoreTeam2 === averScoreTeam3) && (averScoreTeam2 > averScoreTeam1)
    ? ['Mike\'s and Marry\'s', averScoreTeam2]
    : ['draw', averScoreTeam1]
winner === 'draw' ? console.log('Three teams are draw with ' + averScoreTeam1 + ' points') 
    : console.log(winner + ' team\(s\) win\(s\) the match with ' + score + ' points')



// switch version
switch (true) {
    case averScoreTeam1 > (averScoreTeam2 && averScoreTeam3):
        winner = 'john\'s';
        score = averScoreTeam1;
        break;
    case averScoreTeam2 > (averScoreTeam1 && averScoreTeam3):
        winner = 'Mike\'s';
        score = averScoreTeam2;
        break;
    case averScoreTeam3 > (averScoreTeam1 && averScoreTeam2):
        winner = 'Marry\'s';
        score = averScoreTeam3;
        break;
    case (averScoreTeam1 === averScoreTeam2) && (averScoreTeam1 > averScoreTeam3):
        winner = 'John\'s and Mike\'s';
        score = averScoreTeam1;
        break;
    case (averScoreTeam1 === averScoreTeam3) && (averScoreTeam1 > averScoreTeam2):
        winner = 'John\'s and Marry\'s';
        score = averScoreTeam1;
        break;
    case (averScoreTeam2 === averScoreTeam3) && (averScoreTeam2 > averScoreTeam1):
        winner = 'Mike\'s and Marry\'s';
        score = averScoreTeam2;
        break;
    default:
        winner = 'draw';
        score = averScoreTeam1;
}

winner === 'draw' ? console.log('Three teams are draw with ' + averScoreTeam1 + ' points') 
    : console.log(winner + ' team\(s\) win\(s\) the match with ' + score + ' points')


