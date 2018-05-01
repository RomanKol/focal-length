import React, { Component } from 'react';
import styled from 'react-emotion';

import RangeInput from './components/rangeInput';
import SensorTable from './components/table';
import FovCanvas from './components/fovCanvas';
import SensorSelect from './components/sensorSelect';

const Card = styled.section`
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 2px 3px rgba(140, 140, 140, 0.5), 0 0 1px rgba(0, 0, 0, .14);
  border-radius: 2px;
  margin-bottom: 1rem;
  overflow: hidden;
  :first-child {
    margin-top: 1rem;
  }
  > *:first-child {
    margin-top: 0;
  }
  > *:last-child {
    margin-bottom: 0;
  }
`;

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

        <Card>
          <h3>Focal length and sensor/frame size</h3>

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

            <Column>
              <SensorSelect
                sensors={SENSORS}
                selectedIndex={selectedSensorIndex}
                onChange={this.updateSelectedSensor}
              />
              <pre>
                {JSON.stringify(selectedSensor, null, 2)}
              </pre>
            </Column>
          </Column>

        </Card>

        <Card>
          <h3>Field of view</h3>
          <FovCanvas
            width={500}
            height={250}
            focalLength={focalLength}
            crop={crop}
          />
        </Card>

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

      </main>
    );
  }
}

export default App;
