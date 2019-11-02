import { observable, computed, autorun } from 'mobx';
import SENSORS from './sensor-formats';
// sort sensors for their crop factor ascending

class Store {
  constructor() {
    autorun(() => console.log(this));
    this.sensors = SENSORS;
  }

  @observable focalLength = 24;

  @observable selectedSensorIndices = [this.sensors.findIndex((sensor) => sensor.crop === 1)];

  /**
   * Computed property for the full frame sensor
   * @return {obj} - the full frame sensor object
   */
  @computed get fullFrameSensor() {
    return this.sensors.find((sensor) => sensor.crop === 1);
  }

  /**
   * Computed property for the selected sensors
   * @return {[obj]} - an array of sensor objects
   */
  @computed get selectedSensors() {
    return this.sensors.filter((sensor, index) => this.selectedSensorIndices.includes(index));
  }

  /**
   * Computed property for the hsl colors strings for each sensor
   * @return {[string]} - an array of hsl strings
   */
  @computed get colors() {
    return this.sensors.map((sensor, i) => {
      const hue = Math.round(360 / (this.sensors.length / i));
      return `hsl(${hue}, 75%, 60%)`;
    });
  }

  /**
   * Computed property for the hsl color strings for the selected sensors
   * @return {[string]} - an array of hsl string
   */
  @computed get selectedSensorColors() {
    return this.colors.filter((color, index) => this.selectedSensorIndices.includes(index));
  }
}

const store = new Store();

export default store;
