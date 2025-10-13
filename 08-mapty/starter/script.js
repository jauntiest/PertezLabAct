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

  const form = document.querySelector('.form');
  const containerWorkouts = document.querySelector('.workouts');
  const inputType = document.querySelector('.form__input--type');
  const inputDistance = document.querySelector('.form__input--distance');
  const inputDuration = document.querySelector('.form__input--duration');
  const inputCadence = document.querySelector('.form__input--cadence')
  const inputElevation = document.querySelector('.form__input--elevation')
  
 
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

_getPosition() {
  if (navigator.geolocation) {
    console.log('🔍 Requesting user location...');
    navigator.geolocation.getCurrentPosition(
      this._loadMap.bind(this),
      this._handleLocationError.bind(this),
      {
        timeout: 10000,
        enableHighAccuracy: true,
        maximumAge: 600000
      }
    );
  } else {
    alert('❌ Geolocation is not supported by this browser');
    this._loadDefaultMap();
  }
}

_handleLocationError(error) {
  console.error('Geolocation error:', error);

  let message = 'Could not get your position. ';

  switch(error.code) {
    case error.PERMISSION_DENIED:
      message += 'Location access was denied. Please enable location services and refresh the page.';
      break;
    case error.POSITION_UNAVAILABLE:
      message += 'Location information is unavailable. Using default location.';
      break;
    case error.TIMEOUT:
      message += 'Location request timed out. Using default location.';
      break;
    default:
      message += 'An unknown error occurred. Using default location.';
      break;
  }

  alert(`📍 ${message}`);
  this._loadDefaultMap();
}

_loadDefaultMap() {
  console.log('📍 Loading default map location (London)');
  // Use London as default coordinates
  const defaultCoords = [51.5074, -0.1278];

  this.#map = L.map('map').setView(defaultCoords, this.#mapZoomLevel);

  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(this.#map);

  // Handling clicks on map
  this.#map.on('click', this._showForm.bind(this));

  // Render markers for workouts loaded from localStorage
  this.#workouts.forEach(work => {
    this._renderWorkoutMarker(work);
  });

  console.log('🗺️ Default map loaded successfully');
}

_loadMap(position) {
  const { latitude } = position.coords;
  const { longitude } = position.coords;
  console.log(`Loading map at coordinates: ${latitude}, ${longitude}`);

  const coords = [latitude, longitude];

  this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(this.#map);

  // Handling clicks on map
  this.#map.on('click', this._showForm.bind(this));

  // Render markers for workouts loaded from localStorage
  this.#workouts.forEach(work => {
    this._renderWorkoutMarker(work);
  });

  console.log('Map loaded successfully with', this.#workouts.length, 'saved workouts');
}

_getLocalStorage() {
  try {
    const data = localStorage.getItem('workouts');

    if (!data) {
      console.log('No saved workouts found');
      return;
    }

    console.log('Loading saved workouts from localStorage');
    this.#workouts = JSON.parse(data);

    // Restore object prototypes
    this.#workouts = this.#workouts.map(work => {
      if (work.type === 'running') {
        return new Running(work.coords, work.distance, work.duration, work.cadence);
      }
      if (work.type === 'cycling') {
        return new Cycling(work.coords, work.distance, work.duration, work.elevationGain);
      }
    });

    this.#workouts.forEach(work => {
      this._renderWorkout(work);
    });

    console.log(`Loaded ${this.#workouts.length} workouts from storage`);
  } catch (error) {
    console.error('Error loading workouts from localStorage:', error);
    // Clear corrupted data
    localStorage.removeItem('workouts');
    this.#workouts = [];
  }
}

_setLocalStorage() {
  try {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
    console.log(`Saved ${this.#workouts.length} workouts to localStorage`);
  } catch (error) {
    console.error('Error saving workouts to localStorage:', error);
    alert('Could not save workout data. Storage might be full.');
  }
}

// Test the geolocation
getPosition();

function createTestMap() {
  // Default coordinates (Denver, Colorado)
  const coords = [39.7392, -104.9903];
  const zoomLevel = 13;

  // Create the map
  const map = L.map('map').setView(coords, zoomLevel);

  // Add tile layer (the actual map images)
  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Add a marker to test
  L.marker(coords).addTo(map).bindPopup('Test location!').openPopup();

  console.log('Map created successfully!');
}

// Test the map creation
createTestMap();

function createMapAtUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        const coords = [latitude, longitude];

        console.log(`Creating map at user location: ${coords}`);

        // Create map centered on user's location
        const map = L.map('map').setView(coords, 13);

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // Add marker at user's location
        L.marker(coords).addTo(map).bindPopup('You are here!').openPopup();
      },
      function () {
        alert('Could not get your position');
      }
    );
  }
}

// Test user-centered map
createMapAtUserLocation();

class App {
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #workouts = [];

  constructor() {
  // Get user's position
  this._getPosition();

  // Get data from local storage
  this._getLocalStorage();

  // Attach event handlers
  form.addEventListener('submit', this._newWorkout.bind(this));
  inputType.addEventListener('change', this._toggleElevationField);
  containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));

  // Add keyboard support
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !form.classList.contains('hidden')) {
      this._hideForm();
    }
  }.bind(this));
}

_showForm(mapE) {
  this.#mapEvent = mapE;
  form.classList.remove('hidden');
  inputDistance.focus();

  // Add visual feedback
  const { lat, lng } = mapE.latlng;
  console.log(`Form opened for location: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
}

// The _moveToPopup method handles all clicks within the container
_moveToPopup(e) {
  const workoutEl = e.target.closest('.workout');

  if (!workoutEl) return; // Click was not on a workout element

  // Continue with navigation logic...
}

// The _moveToPopup method handles all clicks within the container
_moveToPopup(e) {
  const workoutEl = e.target.closest('.workout');

  if (!workoutEl) return;

  const workout = this.#workouts.find(
    work => work.id === workoutEl.dataset.id
  );

  this.#map.setView(workout.coords, this.#mapZoomLevel, {
    animate: true,
    pan: {
      duration: 1,
    },
  });
}

  _loadMap(position) {
  const { latitude } = position.coords;
  const { longitude } = position.coords;
  const coords = [latitude, longitude];

  this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(this.#map);

  // Handling clicks on map
  this.#map.on('click', this._showForm.bind(this));

  // Render markers for workouts loaded from localStorage
  this.#workouts.forEach(work => {
    this._renderWorkoutMarker(work);
  });
}

  _newWorkout(e) {
  const validInputs = (...inputs) =>
    inputs.every(inp => Number.isFinite(inp));
  const allPositive = (...inputs) => inputs.every(inp => inp > 0);

  e.preventDefault();

  // Get data from form
  const type = inputType.value;
  const distance = +inputDistance.value;
  const duration = +inputDuration.value;
  const { lat, lng } = this.#mapEvent.latlng;
  let workout;

  // Enhanced validation with specific error messages
  const showValidationError = (message) => {
    alert(`❌ Validation Error: ${message}`);
    inputDistance.focus();
  };

  // Check for empty inputs
  if (!distance || !duration) {
    return showValidationError('Distance and duration are required!');
  }

  // If workout running, create running object
  if (type === 'running') {
    const cadence = +inputCadence.value;

    if (!cadence) {
      return showValidationError('Cadence is required for running workouts!');
    }

    if (!validInputs(distance, duration, cadence)) {
      return showValidationError('All inputs must be valid numbers!');
    }

    if (!allPositive(distance, duration, cadence)) {
      return showValidationError('All values must be positive numbers!');
    }

    workout = new Running([lat, lng], distance, duration, cadence);
  }

  // If workout cycling, create cycling object
  if (type === 'cycling') {
    const elevation = +inputElevation.value;

    // Note: elevation can be negative (downhill), so we don't check allPositive for it
    if (!validInputs(distance, duration, elevation)) {
      return showValidationError('Distance, duration, and elevation must be valid numbers!');
    }

    if (!allPositive(distance, duration)) {
      return showValidationError('Distance and duration must be positive numbers!');
    }

    workout = new Cycling([lat, lng], distance, duration, elevation);
  }

  // Add new object to workout array
  this.#workouts.push(workout);

  // Render workout on map as marker
  this._renderWorkoutMarker(workout);

  // Render workout on list
  this._renderWorkout(workout);

  // Hide form + clear input fields
  this._hideForm();

  // Set local storage to all workouts
  this._setLocalStorage();

  console.log(`✅ Created ${type} workout:`, workout);
}

  // NEW METHOD: Save workouts to localStorage
  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  // NEW METHOD: Load workouts from localStorage
  _getLocalStorage() {
  const data = localStorage.getItem('workouts');

  if (!data) return;

  this.#workouts = JSON.parse(data);

  // Restore object prototypes
  this.#workouts = this.#workouts.map(work => {
    if (work.type === 'running') {
      return new Running(work.coords, work.distance, work.duration, work.cadence);
    }
    if (work.type === 'cycling') {
      return new Cycling(work.coords, work.distance, work.duration, work.elevationGain);
    }
  });

  this.#workouts.forEach(work => {
    this._renderWorkout(work);
  });
}

// NEW METHOD: Render markers for restored workouts
_renderWorkoutMarkersFromStorage() {
  this.#workouts.forEach(workout => {
    this._renderWorkoutMarker(workout);
  });
}

  // NEW METHOD: Reset all data (useful for development/testing)
  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

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

localStorage.setItem('key', 'value'); // Save data
const data = localStorage.getItem('key'); // Retrieve data
localStorage.removeItem('key'); // Delete specific data
localStorage.clear(); // Delete all data

// Important: localStorage only stores strings
// Objects must be converted to JSON strings
const obj = { name: 'John', age: 30 };
localStorage.setItem('user', JSON.stringify(obj));
const retrievedObj = JSON.parse(localStorage.getItem('user'));

_getLocalStorage() {
  const data = localStorage.getItem('workouts');

  if (!data) return;

  this.#workouts = JSON.parse(data);

  // Restore object prototypes
  this.#workouts = this.#workouts.map(work => {
    if (work.type === 'running') {
      return new Running(work.coords, work.distance, work.duration, work.cadence);
    }
    if (work.type === 'cycling') {
      return new Cycling(work.coords, work.distance, work.duration, work.elevationGain);
    }
  });

  this.#workouts.forEach(work => {
    this._renderWorkout(work);
  });
}

// NEW METHOD: Render markers for restored workouts
_renderWorkoutMarkersFromStorage() {
  this.#workouts.forEach(workout => {
    this._renderWorkoutMarker(workout);
  });
}

// NEW METHOD: Handle clicks on workout list
_moveToPopup(e) {
  // Match only the workout element
  const workoutEl = e.target.closest('.workout');

  if (!workoutEl) return;

  const workout = this.#workouts.find(
    work => work.id === workoutEl.dataset.id
  );

  this.#map.setView(workout.coords, this.#mapZoomLevel, {
    animate: true,
    pan: {
      duration: 1,
    },
  });
}

// Development helper methods (add to App class)
_showAllWorkouts() {
  console.log('All workouts:', this.#workouts);
  return this.#workouts;
}

_clearAllData() {
  if (confirm('⚠️ This will delete all workout data. Are you sure?')) {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

_exportWorkouts() {
  const dataStr = JSON.stringify(this.#workouts, null, 2);
  console.log('Workout data (copy this to backup):');
  console.log(dataStr);
  return dataStr;
}

_importWorkouts(workoutData) {
  try {
    const workouts = JSON.parse(workoutData);
    localStorage.setItem('workouts', workoutData);
    location.reload();
    console.log('✅ Workouts imported successfully');
  } catch (error) {
    console.error('❌ Error importing workouts:', error);
    alert('Invalid workout data format');
  }
}

// Add these to global scope for easy console access
_getAppHelpers() {
  return {
    showWorkouts: this._showAllWorkouts.bind(this),
    clearData: this._clearAllData.bind(this),
    exportData: this._exportWorkouts.bind(this),
    importData: this._importWorkouts.bind(this),
  };
}