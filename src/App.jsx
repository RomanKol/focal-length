import React, { Component } from 'react';
import styled from 'react-emotion';

import Card from './Cards/card';
import RangeInput from './components/rangeInput';
import SensorTable from './components/table';
import FovCanvas from './components/fovCanvas';

import Sensor from './Cards/Sensor';

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

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

  renderUnitInfo = () => (
    <footer>
      <small>The units fo the sensor diagonal, width and height are <i>mm</i></small>
      <br />
      <small>The unit of the sensor area is <i>mm²</i></small>
    </footer>
  )

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

        <Card>
          <h3>Field of view</h3>

          <Column>
            <Column>
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
            </Column>

            <FovCanvas
              width={500}
              height={250}
              focalLength={focalLength}
              crop={crop}
            />
          </Column>
        </Card>

        <Card>
          <h3>Sensors</h3>
          <SensorTable
            header={tableHeader}
            data={SENSORS}
            selected={selectedSensorIndex}
            sorting="name"
          />
          {this.renderUnitInfo()}
        </Card>

        <footer className="card">
          <span>created by Roman Kollatschny, 2018</span>
        </footer>

      </main >
    );
  }
}

export default App;
