// console.log(`Fundamentals Part 2`);

// // Functions - Declarations and Expressions
// console.log("=== FUNCTIONS ===");

// function logger() { 
// }

// logger();
// logger();
// logger();

// function fruitProcessor(apples, oranges) {
//     console.log(apples, oranges);
//     const Juice = `Juice with ${apples} apples and ${oranges} oranges.`;
//     return Juice
// }

// const appleJuice = fruitProcessor(5, 0);
// console.log(appleJuice);

// const appleOrangeJuice = fruitProcessor(2, 4);
// console.log(appleOrangeJuice);


// //Function Expressions
// const calcAge1 = function (birthYear) {
//   return 2037 - birthYear;
// };

// function calcAge(birthYear, currentYear) {
//   // Parameters
//   const age = currentYear - birthYear;
//   return age;
// }

// const myAge = calcAge(1991, 2037); // Arguments
// const herAge = calcAge(2005, 2037);

// console.log(`I am ${myAge} years old`);
// console.log(`She is ${herAge} years old`);

// function introduce(firstName, lastName, age) {
//   const introduction = `Hi, I'm ${firstName} ${lastName} and I'm ${age} years old.`;
//   return introduction;
// }

// console.log(introduce("Jonas", "Schmedtmann", 46)); // All good
// console.log(introduce("Sarah")); // Missing parameters become undefined


// function calcAge3(birthYear) {
//     return 2037 - birthYear;
// }

// //CALCULATION
// function yearsUntilRetirement(birthYear, firstName) {
//     const age = calcAge3(birthYear);
//     const retirement = 65 - age;

//     if (retirement > 0) {
//         return `${firstName} retires in ${retirement} years.`;
//     } else {
//         return `${firstName} has already retired.`;
//     }
// }
// //INPUT
// console.log(yearsUntilRetirement(2004, 'JD'))


// const globalVar = `I am global`;
// const localVar = 'I am local';

// function testScope() {
//     console.log(globalVar);
//     console.log(localVar);
// }

// testScope ();
// console.log(globalVar);
// console.log(localVar);



// // Coding Challenge #1

// // Function to calculate average of 3 scores

// function teamNames(dolphins, koalas) {
//     console.log(dolphins, koalas);
//     const score = `Score with ${dolphins} dolphins and ${koalas} koalas.`;
//     return score;
// }



// function calcAverage(score1, score2, score3) {
//   return average = (score1 + score2 + score3) / 3;
// }

// // Function to check winner
// function checkWinner(avgDolphins, avgKoalas) {
//   // Your code here
//   // Remember: team needs DOUBLE the score to win
//   // Use template literals for nice output

//   if (avgDolphins >= 2 * avgKoalas) {
//     return `Dolphins win (${avgDolphins} vs. ${avgKoalas})`;
//   } else if (avgKoalas >= 2 * avgDolphins) {
//     return `Koalas win (${avgKoalas} vs. ${avgDolphins})`; 
//   } else {
//     return `No team wins...`;   
// }

// }

// // Test Data 1
// let scoreDolphins = calcAverage(44, 23, 71);
// let scoreKoalas = calcAverage(65, 54, 49);
// console.log(checkWinner(scoreDolphins, scoreKoalas));

// // Test Data 2
// scoreDolphins = calcAverage(85, 54, 41);
// scoreKoalas = calcAverage(23, 34, 27);
// console.log(checkWinner(scoreDolphins, scoreKoalas));

