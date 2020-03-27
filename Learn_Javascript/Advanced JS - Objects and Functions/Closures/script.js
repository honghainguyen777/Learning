// using function closures

function interviewQuestion(job) {
  return function(name) {
    if (job === 'designer') {
      console.log(name + ', can you please explain what UX design is?');
    } else if (job === 'teacher') {
      console.log(name + ', What subject do you teach?');
    } else {
      console.log('Can you please describe your job, ' + name + '?')
    }
  }
}

interview = interviewQuestion('teacher');
interview('Hai')
