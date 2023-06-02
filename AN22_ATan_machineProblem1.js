// CCS0043 Source Code Template for 2T AY 2022-2023
/*

   Program: Computation of Grades using Function
   Programmer: Adrian Jude P. Tan
   Section: AN22
   Start Date: 06/02/2023
   End Date: 06/02/2023

*/

const readline = require('readline');

function calculateLetterGrade(numericalGrade) {
  if (numericalGrade >= 90) {
    return 'A';
  } else if (numericalGrade >= 80) {
    return 'B';
  } else if (numericalGrade >= 70) {
    return 'C';
  } else if (numericalGrade >= 60) {
    return 'D';
  } else {
    return 'F';
  }
}

function calculateAverageGrade(classParticipation, summativeGrade, finalExam) {
  return (classParticipation * 0.3) + (summativeGrade * 0.3) + (finalExam * 0.4);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const students = [];

function promptStudentData(index) {
  if (index === 5) {
    displayResults();
    rl.close();
    return;
  }

  const student = {};

  rl.question('Enter the name of the student: ', (name) => {
    student.name = name;

    promptEnablingAssessments(1, [], function(enablingAssessments) {
      student.classParticipation = enablingAssessments.reduce((a, b) => a + b) / enablingAssessments.length;

      promptSummativeAssessments(1, [], function(summativeAssessments) {
        student.summativeGrade = summativeAssessments.reduce((a, b) => a + b) / summativeAssessments.length;

        rl.question('Enter major exam grade: ', (finalExam) => {
          student.finalExam = parseInt(finalExam);

          student.grade = calculateAverageGrade(student.classParticipation, student.summativeGrade, student.finalExam);
          student.letterGrade = calculateLetterGrade(student.grade);

          students.push(student);
          console.log();

          promptStudentData(index + 1);
        });
      });
    });
  });
}

function promptEnablingAssessments(index, enablingAssessments, callback) {
  if (index > 5) {
    callback(enablingAssessments);
    return;
  }

  rl.question(`Enter enabling assessment ${index}: `, (enablingAssessment) => {
    enablingAssessments.push(parseInt(enablingAssessment));
    promptEnablingAssessments(index + 1, enablingAssessments, callback);
  });
}

function promptSummativeAssessments(index, summativeAssessments, callback) {
  if (index > 3) {
    callback(summativeAssessments);
    return;
  }

  rl.question(`Enter summative assessment ${index}: `, (summativeAssessment) => {
    summativeAssessments.push(parseInt(summativeAssessment));
    promptSummativeAssessments(index + 1, summativeAssessments, callback);
  });
}

function displayResults() {
  console.log('Student\t\tClass Participation\tSummative Grade\t\tGrade\t\tLetter Grade');
  students.forEach((student) => {
    console.log(`${student.name}\t\t${student.classParticipation.toFixed(2)}\t\t\t${student.summativeGrade.toFixed(2)}\t\t\t${student.grade.toFixed(2)}\t\t${student.letterGrade}`);
  });
}

promptStudentData(0);
