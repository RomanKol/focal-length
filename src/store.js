import { observable, computed, autorun } from 'mobx';
import SENSORS from './sensor-formats';
// sort sensors for their crop factor ascending

class Store {
  constructor() {
    autorun(() => console.log(this));
    this.sensors = SENSORS;
  }

  @observable focalLength = 24;
  @observable selectedSensorIndices = [this.sensors.findIndex(sensor => sensor.crop === 1)];

  @computed get fullFrameSensor() {
    return this.sensors.find(sensor => sensor.crop === 1);
  }
  @computed get selectedSensors() {
    return this.sensors.filter((sensor, index) => this.selectedSensorIndices.includes(index));
  }
}

const store = new Store();

export default store;
