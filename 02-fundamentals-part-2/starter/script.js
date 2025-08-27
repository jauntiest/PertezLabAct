//const i = require('i');
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

//ARRAYS (this is crazy)
// const studentGrade = 85;


// const grades = [85, 92, 78, 96, 88];
// console.log(grades);

// const mixed = ['Jonas', 27, true, grades];
// console.log(mixed);

// const years = new Array(1991, 1984, 2008, 2020);
// console.log(years);

// console.log(grades[0]);
// console.log(grades[3]);

// console.log(grades.length);

// grades[0] = 99;
// console.log(grades);
// console.log(grades[0]);

// //SO FUN!
// const calcAge = function(birthYear) {
//     return 2025 - birthYear
// }

// const ages = [calcAge(2000), calcAge(1985), calcAge(1995)];
// console.log(ages);
// ages[1] = 30;
// console.log(ages);

// //ARRAY METHODS
// const friends = [ 'Queeny', 'Jenalie', 'Lester'];
// console.log(friends);
// const newLength = friends.push('Gilbert')
// console.log(friends);
// console.log(newLength);

// friends.unshift('bangis'); // adds to beginning
// console.log(friends);

// const popped = friends.pop(); // removes last
// console.log(friends);
// console.log(popped);

// const shifted = friends.shift(); // removes first
// console.log(shifted);
// console.log(friends);

// // pop()
// // shift()

// console.log(friends.indexOf('Queeny'));
// console.log(friends.indexOf('Jenalie'));


// console.log(friends.includes('Lester'));
// console.log(friends.includes('Gilbert'));



// //ARRAY ITERATION

// for (let i = 0; i < friends.length; i++) {
//     console.log(friends[i]);
// }

// friends.forEach(function (friends, index) {
//     console.log(`${index + 1}: ${friends}`);
// })



// const grades = [85, 92, 78, 96, 88, 74];
// let total = 0;

// for (let i = 0; i < grades.length; i++) {
//     total += grades[i];
// }

// const average = total / grades.length;
// console.log(`Average grade: ${average.toFixed(2)}`);

// let passedCount = 0;
// grades.forEach(grades) => {
//     if (grade >= 70) passedCount++;
// }

// console.log(`${passedCount} out of ${grades.length} students passed`) ;


//CODING CHALLENGE #2: Student Grade Manager


const grades = [78, 85, 92, 67, 88, 95, 73, 82];
function calculateAverage(grades) {
    let sum = 0
    for (let i = 0; i < grades.length; i++) {
        const element = grades[i];
        sum += element;
    }
    return sum / grades.length;
}
console.log(calculateAverage(grades));

function findHighestGrade(grades) {
    let highest = grades[0];
    for (let i = 1; i < grades.length; i++) {
        if (grades[i] > highest) {
        highest = grades[i];
        }
    }
    return highest;
}

console.log(findHighestGrade(grades));

// Function to find lowest grade
function findLowestGrade(grades) {
    let lowest = grades[0];
    for (let i = 1; i < grades.length; i++) {
        if (grades[i] < lowest) {
        lowest = grades[i];
        }
    }
    return lowest;
}

console.log(findLowestGrade(grades));

// Function to count passing students
function countPassing(grades, passingGrade) {
    let count = 0;
    for (let i = 0; i < grades.length; i++) {
        if (grades[i] >= passingGrade) {
            count++;
        }
    }
    return count;
}

console.log(`${countPassing(grades, 70)} out of ${grades.length}`);

// Generate complete report
const average = calculateAverage(grades);
const highest = findHighestGrade(grades);
const lowest = findLowestGrade(grades);
const passing = countPassing(grades, 70);

console.log("=== GRADE REPORT ===");
console.log(`Average: ${average.toFixed(2)}`);
console.log(`Highest: ${highest}`);
console.log(`Lowest: ${lowest}`);
console.log(`Passing students: ${passing} out of ${grades.length}`);

