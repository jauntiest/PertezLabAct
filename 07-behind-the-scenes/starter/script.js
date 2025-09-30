'use strict';

// 1) Hoisting expectation
// console.log(title); // Uncomment to test: TDZ with let
let title = 'Behind the Scenes';

// 2) Scope chain expectation
function outer() {
  const label = 'outer';
  function inner() {
    console.log('scope:', label); // expect 'outer'
  }
  inner();
}
outer();

// 3) Call stack expectation
function one() {
  two();
}
function two() {
  console.log('stack: two');
}
one(); // expect 'stack: two'

person.greet(); // "Hello, I am Jonas"

const person = {
  name: 'Jonas',
  greet: function () {
    console.log(`Hello, I am ${this.name}`);
  },
};

// Method borrowing
const anotherPerson = { name: 'Sarah' };
anotherPerson.greet = person.greet;
anotherPerson.greet(); // "Hello, I am Sarah"

// Detached function call
const greetFunction = person.greet;
greetFunction(); // "Hello, I am undefined" (in strict mode)

// This breaks in event handlers
const button = document.querySelector('button');
button.addEventListener('click', person.greet); // `this` becomes the button element!

// Fix: use arrow function wrapper
button.addEventListener('click', () => person.greet());
// Or bind the method
button.addEventListener('click', person.greet.bind(person));

const obj = {
  name: 'Object',

  regularMethod: function () {
    console.log('Regular:', this.name); // this = obj
  },

  arrowMethod: () => {
    console.log('Arrow:', this.name); // this = global (undefined in strict mode)
  },
};

obj.regularMethod(); // "Regular: Object"
obj.arrowMethod(); // "Arrow: undefined"

const quiz = {
  name: 'Quiz Object',
  regularMethod() {
    console.log('Regular:', this.name);
  },
  arrowMethod: () => {
    console.log('Arrow:', this.name);
  },
};

quiz.regularMethod(); // Predict: ?
quiz.arrowMethod(); // Predict: ?

const timer = {
  name: 'Timer',

  // Old approach with self = this
  start: function () {
    console.log(`${this.name} starting...`);
    const self = this;

    setTimeout(function () {
      console.log(`${self.name} finished`);
    }, 1000);
  },

  // Modern approach with arrow function
  startModern: function () {
    console.log(`${this.name} starting modern...`);

    setTimeout(() => {
      console.log(`${this.name} finished modern`); // this works!
    }, 1500);
  },
};

timer.start(); // Uses self = this approach
timer.startModern(); // Uses arrow function approach

const user = {
  name: 'Alice',
  hobbies: ['reading', 'coding', 'gaming'],

  // BROKEN: arrow function loses `this`
  printHobbiesBad: () => {
    this.hobbies.forEach(hobby => {
      console.log(`${this.name} likes ${hobby}`); // this.name is undefined!
    });
  },

  // FIXED: regular function preserves `this`
  printHobbiesGood() {
    this.hobbies.forEach(hobby => {
      console.log(`${this.name} likes ${hobby}`); // this.name works!
    });
  },
};

user.printHobbiesBad(); // Fails - this.name is undefined
user.printHobbiesGood(); // Works - shows all hobbies

const functionTypes = {
  regularFunction: function () {
    console.log('Arguments length:', arguments.length);
    console.log('First argument:', arguments[0]);
  },

  arrowFunction: () => {
    // console.log(arguments); // ReferenceError: arguments is not defined
    console.log('Arrow function called');
  },

  modernFunction: (...args) => {
    console.log('Args length:', args.length);
    console.log('First arg:', args[0]);
  },
};

functionTypes.regularFunction('hello', 'world');
functionTypes.arrowFunction('test');
functionTypes.modernFunction('modern', 'approach');

// Event handlers and this binding
const userCard = {
  name: 'Sarah',
  // element: document.querySelector('.user-card'), // Commented for demo

  setupEvents() {
    // BROKEN: this becomes the button element
    // this.element.addEventListener('click', function() {
    //   console.log('Clicked user:', this.name); // this = button element!
    // });

    // FIXED: arrow function preserves outer this
    // this.element.addEventListener('click', () => {
    //   console.log('Clicked user:', this.name); // this = userCard object!
    // });

    console.log('Event setup for:', this.name);
  },
};

userCard.setupEvents();

// Array methods with this context
const calculator = {
  numbers: [1, 2, 3, 4, 5],
  multiplier: 2,

  processNumbers() {
    return this.numbers.map(num => num * this.multiplier);
  },
};

console.log('Processed numbers:', calculator.processNumbers()); // [2, 4, 6, 8, 10]

const myTimer = {
  name: 'My Timer',

  startCountdown() {
    console.log(`${this.name} starting countdown...`);

    // Your code here: use setTimeout with arrow function
    // to log "${this.name} countdown finished!" after 1 second
  },
};

myTimer.startCountdown();

// PRIMITIVES IN STACK
let age = 30;
let oldAge = age; // Independent copy
age = 31;

console.log('age:', age); // 31
console.log('oldAge:', oldAge); // 30 (unchanged!)

// OBJECTS IN HEAP
const me = { name: 'Jonas', age: 30 };
const friend = me; // Shared reference

friend.age = 27;

console.log('me:', me); // { name: 'Jonas', age: 27 }
console.log('friend:', friend); // { name: 'Jonas', age: 27 }

function changeAge(person, newAge) {
  person.age = newAge;
  return person;
}

const originalPerson = { name: 'Sarah', age: 25 };
const updatedPerson = changeAge(originalPerson, 30);

console.log('original:', originalPerson); // { name: 'Sarah', age: 30 } - Changed!
console.log('updated:', updatedPerson); // { name: 'Sarah', age: 30 } - Same object!
console.log('same object?:', originalPerson === updatedPerson); // true

const original = {
  name: 'Alice',
  age: 28,
  hobbies: ['reading', 'coding'],
};

// Spread operator shallow copy
const shallowCopy = { ...original };

shallowCopy.name = 'Bob';
console.log('original name:', original.name); // 'Alice' (unchanged)
console.log('copy name:', shallowCopy.name); // 'Bob' (changed)

// But nested objects are still shared
shallowCopy.hobbies.push('gaming');
console.log('original hobbies:', original.hobbies); // ['reading', 'coding', 'gaming'] - Changed!
console.log('copy hobbies:', shallowCopy.hobbies); // ['reading', 'coding', 'gaming'] - Same array!

// Object.assign alternative
const anotherCopy = Object.assign({}, original);
console.log('Object.assign copy:', anotherCopy);

const deepOriginal = {
  name: 'Charlie',
  age: 32,
  address: { city: 'Paris', country: 'France' },
  hobbies: ['travel', 'photography'],
};

// Modern deep copy with structuredClone
const deepCopy = structuredClone(deepOriginal);

deepCopy.address.city = 'London';
deepCopy.hobbies.push('cooking');

console.log('original address:', deepOriginal.address); // { city: 'Paris', country: 'France' }
console.log('copy address:', deepCopy.address); // { city: 'London', country: 'France' }
console.log('original hobbies:', deepOriginal.hobbies); // ['travel', 'photography']
console.log('copy hobbies:', deepCopy.hobbies); // ['travel', 'photography', 'cooking']

const problemObject = {
  name: 'Test',
  date: new Date(),
  method: function () {
    return 'hello';
  },
  undefinedValue: undefined,
};

// BROKEN: JSON method loses data
const brokenCopy = JSON.parse(JSON.stringify(problemObject));
console.log('Broken copy:', brokenCopy);
// { name: 'Test', date: '2023-...' } - Lost method and undefined!

// FIXED: structuredClone preserves most types
const workingCopy = structuredClone(problemObject);
console.log('Working copy:', workingCopy);
// Note: functions still can't be cloned, but dates work!

const userManager = {
  users: [],

  addUser: function (userData) {
    // Deep copy to avoid reference issues
    const userCopy = structuredClone(userData);
    this.users.push(userCopy);
    return this; // Method chaining
  },

  getUsers: function () {
    // Return shallow copy to prevent external mutation
    return [...this.users];
  },
};

// Test the complete system
const originalUser = { name: 'John', preferences: { theme: 'dark' } };
userManager.addUser(originalUser);

originalUser.name = 'Modified';
console.log('Original changed:', originalUser);
console.log('Stored user:', userManager.getUsers()[0]); // Still 'John'!

