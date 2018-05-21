import React, { Component } from 'react';

import Card from './Cards/card';
import SensorTable from './components/table';

import Sensor from './Cards/Sensor';
import FieldOfView from './Cards/FieldOfView';

// sort sensors for their crop factor ascending
const SENSORS = require('./sensor-formats')
  .sort((a, b) => {
    if (a.crop > b.crop) return -1;
    if (a.crop < b.crop) return 1;
    return 0;
  });

class App extends Component {
  constructor(props) {
    super(props);

    this.fullFrame = SENSORS.find(sensor => sensor.crop === 1);

    this.state = {
      focalLength: 24,
      selectedSensorIndex: SENSORS.findIndex(sensor => sensor.crop === 1) || 0,
    };
  }

  updateFocalLength = value => this.setState({ focalLength: value });

  updateSelectedSensor = (e) => {
    this.setState({
      selectedSensorIndex: parseInt(e.target.selectedIndex, 10),
    });
  };

  render() {
    const tableHeader = {
      name: 'Sensor',
      diagonal: 'Sensor diagonal',
      width: 'Sensor width',
      height: 'Sensor height',
      crop: 'Crop factor',
    };

    const {
      selectedSensorIndex,
      focalLength,
    } = this.state;

    const selectedSensor = SENSORS[selectedSensorIndex];
    const { crop } = selectedSensor;

    return (
      <main>

        <Card>
          <h1>Focal length comparison</h1>
          <p>Compare different focal lengths on various sensors</p>
        </Card>

        <Sensor
          title="Sensor/frame size"
          sensors={SENSORS}
          selectedSensor={selectedSensor}
          selectedSensorIndex={selectedSensorIndex}
          updateSelectedSensor={this.updateSelectedSensor}
          fullFrameSensor={this.fullFrame}
        />

        <FieldOfView
          title="Field of view"
          focalLength={focalLength}
          crop={crop}
          updateFocalLength={this.updateFocalLength}
        />

        <Card>
          <h3>Sensors</h3>
          <SensorTable
            header={tableHeader}
            data={SENSORS}
            selected={selectedSensorIndex}
            sorting="name"
          />
          <footer>
            <small>The units fo the sensor diagonal, width and height are <i>mm</i></small>
            <br />
            <small>The unit of the sensor area is <i>mm²</i></small>
          </footer>
        </Card>

        <footer className="card">
          <span>created by Roman Kollatschny, 2018</span>
        </footer>

      </main >
    );
  }
}

export default App;
