import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import styled from 'react-emotion';

import Card from './card';
import RangeInput from '../components/rangeInput';
import FovCanvas from '../components/fovCanvas';

import store from '../store';

const color = index => `hsl(${Math.round(360 / (store.sensors.length / index))}, 60%, 60%)`;

const List = styled.ul`
  margin: 0 0 1em 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 1em;
    div {
      margin-right: .5em;
    }
  }
`;

const ColorRect = styled.div`
  width: 1em;
  height: 1em;
  background-color: ${props => color(props.color)};
`;

const Sensor = observer(({ title }) => {
  const { focalLength, selectedSensors } = store;

  return (
    <Card>
      <h3>{title}</h3>

      <section>
        <section>
          <RangeInput
            title="Input Focal length"
            value={focalLength}
            max={800}
          />
          <p>
            <span>Current focal length: </span>
            <b>{focalLength}mm</b>
            <br />
            <span>Focal length on selected sensor: </span>
          </p>
          <List>
            {selectedSensors
              .map((sensor, i) => (
                <li key={sensor.name}>
                  <ColorRect color={store.selectedSensorIndices[i]} />
                  {sensor.name}: {Math.round(focalLength * sensor.crop)}mm
                </li>
              ))
            }
          </List>
        </section>

        <FovCanvas aspect={2 / 1} />
      </section>
    </Card>
  );
});

Sensor.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Sensor;
