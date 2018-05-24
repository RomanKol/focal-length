import { observable, computed, autorun } from 'mobx';

// sort sensors for their crop factor ascending
const SENSORS = require('./sensor-formats')
  .sort((a, b) => {
    if (a.crop > b.crop) return -1;
    if (a.crop < b.crop) return 1;
    return 0;
  });

class Store {
  constructor() {
    autorun(() => console.log(this));
    this.sensors = SENSORS;
  }

  @observable focalLength = 24;
  @observable selectedSensorIndex = 0;

  @computed get fullFrameSensor() {
    return this.sensors.find(sensor => sensor.crop === 1);
  }
  @computed get selectedSensor() {
    return this.sensors[this.selectedSensorIndex];
  }
  @computed get crop() {
    return this.selectedSensor.crop;
  }
}

const store = new Store();

export default store;
