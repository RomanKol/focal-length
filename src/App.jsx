import React, { Component } from 'react';

import RangeInput from './components/rangeInput';
import Table from './components/table';
import FovCanvas from './components/fovCanvas';
import SensorSelect from './components/sensorSelect';

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

    this.state = {
      focalLength: 24,
      selectedSensorIndex: SENSORS.findIndex(sensor => sensor.crop === 1) || 0,
    };
  }

  updateFocalLength = (e) => {
    this.setState({
      focalLength: parseFloat(e.target.value),
    });
  };

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

        <header className="card">
          <h1>Focal length comparison</h1>
          <p>Compare different focal lengths on various sensors</p>
        </header>

        <section className="card">
          <h3>Focal length and sensor/frame size</h3>

          <div className="row">
            <div className="column">
              <RangeInput
                title="Input Focal length"
                value={focalLength}
                max={800}
                onChange={this.updateFocalLength}
              />
              <p>
                <span>Current focal length: </span>
                <b>{focalLength}mm</b>
                <br />
                <span>Focal length on selected crop: </span>
                <b>{Math.round(focalLength * crop)}mm</b>
              </p>
            </div>

            <div className="column">
              <SensorSelect
                sensors={SENSORS}
                selectedIndex={selectedSensorIndex}
                onChange={this.updateSelectedSensor}
              />
              <pre>
                {JSON.stringify(selectedSensor, null, 2)}
              </pre>
            </div>
          </div>

        </section>

        <section className="card">
          <h3>Field of view</h3>
          <FovCanvas
            width={500}
            height={250}
            focalLength={focalLength}
            crop={crop}
          />
        </section>

        <section className="card">
          <h3>Sensors</h3>
          <Table
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
        </section>

        <footer className="card">
          <span>created by Roman Kollatschny, 2018</span>
        </footer>

      </main>
    );
  }
}

export default App;
