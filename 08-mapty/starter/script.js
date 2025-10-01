'use strict';
 
console.log('HOUR 1: Mapty OOP Foundation');
// base class
class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  clicks = 0;
 
  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }
 
  // start with underscore to make a private method that only class workout use
  _setDescription() {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
 
    // generate a description using the workout type and current date
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
 
  click() {
    this.clicks++;
  }
}
 
const testWorkout = new Workout([40.7128, -74.006], 5.2, 24);
console.log('Test Workout: ', testWorkout);
// console.log(`Workout ID: ${testWorkout.id}`);
// console.log(`Workout Date: ${testWorkout.date}`);
 
// testWorkout.click();
// testWorkout.click();
// testWorkout.click();
// console.log(`Click counts: ${testWorkout.clicks}`);
 
class Running extends Workout {
  type = 'running';
 
  constructor(coords, distance, duration, cadence) {
    // call the parent constructor with super()
    super(coords, distance, duration);
    // store the steps per minute
    this.cadence = cadence;
    // calculates the pace automatically
    this.calPace();
    // generate description now that we have the type
    this._setDescription();
  }
 
  calPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
 
class Cycling extends Workout {
  type = 'cycling';
 
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }
 
  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}
 
// Create a running workout
const run1 = new Running([39.7392, -104.9903], 5.2, 24, 178);
console.log('Running workout:', run1);
console.log('Running pace:', run1.pace.toFixed(1), 'min/km');
console.log('Running description:', run1.description);
 
// Create a cycling workout
const cycling1 = new Cycling([39.7392, -104.9903], 27, 95, 523);
console.log('Cycling workout:', cycling1);
console.log('Cycling speed:', cycling1.speed.toFixed(1), 'km/h');
console.log('Cycling description:', cycling1.description);
 
// Test inheritance - both have click method from Workout
run1.click();
cycling1.click();
console.log('Run clicks:', run1.clicks);
console.log('Cycling clicks:', cycling1.clicks);
 
console.log('HOUR 2: Geolocation and Maps');
 
// function getPosition() {
//   console.log('Requesting user location:');
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       function (position) {
//         const { latitude } = position.coords;
//         const { longitude } = position.coords;
//         console.log(`Your current location: ${latitude}, ${longitude}`);
//       },
//       function (error) {
//         console.log('Could not get position', error.message);
//       }
//     );
//   } else {
//     console.log('Geolocation is not supported by this browser');
//   }
// }
 
function getPosition() {
  if (navigator.geolocation) {
    console.log('🔍 Requesting user location...');
    navigator.geolocation.getCurrentPosition(
      // function (position) {
      //   const { latitude } = position.coords;
      //   const { longitude } = position.coords;
      //   console.log(`Your current location: ${latitude}, ${longitude}`);
 
      //   // Create a Google Maps link to verify the location
      //   const googleMapsUrl = `https://www.google.pt/maps/@${latitude},${longitude}`;
      //   console.log(`View on Google Maps: ${googleMapsUrl}`);
      // },
      loadMap,
      function (error) {
        console.error('Geolocation error:', error);
 
        let message = 'Could not get your position. ';
 
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message +=
              'Location access was denied. Please enable location services and refresh the page.';
            break;
          case error.POSITION_UNAVAILABLE:
            message += 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            message += 'Location request timed out.';
            break;
          default:
            message += 'An unknown error occurred.';
            break;
        }
 
        alert(`📍 ${message}`);
        loadDefaultMap();
      },
      {
        timeout: 10000,
        enableHighAccuracy: true,
        maximumAge: 600000,
      }
    );
  } else {
    alert('❌ Geolocation is not supported by this browser');
    loadDefaultMap();
  }
}
 
getPosition();
 
function loadMap(position) {
  // Leaflet map integration
  const { latitude, longitude } = position.coords;
  console.log(`Loading map at coordinates: ${latitude}, ${longitude}`);
 
  const coords = [latitude, longitude];
 
  const map = L.map('map').setView(coords, 13);
 
  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
 
  L.marker(coords).addTo(map).bindPopup('You are here!').openPopup();
 
  console.log('Map created successfully!');
}
 
function loadDefaultMap() {
  console.log('Loading default map location (London)');
 
  // use the default coordinates
  const defaultCoords = [51.5074, -0.1278];
 
  const map = L.map('map').setView(defaultCoords, 13);
 
  L.tileLayer('https://{s}.tile.openstreetpmap.fr/hot/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
 
  L.marker(coords).addTo(map).bindPopup('You are here!').openPopup();
 
  console.log('Default map created successfully!');
}