'use strict';
 
class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  clicks = 0;
 
  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }
 
  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
 
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
 
  click() {
    this.clicks++;
  }
}
 
const testWorkout = new Workout ([40.7128, -74.006], 5.2, 24);
console.log ('Test workout:', testWorkout);
 
class Running extends Workout {
    type = 'running';
 
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
        this._setDescription();
    }

    calcPace() {
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}