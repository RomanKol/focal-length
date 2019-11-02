import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import styled from '@emotion/styled';

import Card from './card';
import RangeInput from '../components/rangeInput';
import FovCanvas from '../components/fovCanvas';

import store from '../store';

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
    flex: 1 1 50%;
    div {
      margin-right: .5em;
    }
  }
`;

const ColorCircle = styled.div`
  width: 1em;
  height: 1em;
  background-color: ${(props) => store.selectedSensorColors[props.index]};
  border-radius: 50%;
`;

const Sensor = observer(({ title }) => {
  const { focalLength, selectedSensors } = store;

  return (
    <Card>
      <header>
        <h3>{title}</h3>
      </header>

      <section>
        <RangeInput
          title="Input Focal length"
          value={focalLength}
          max={800}
        />

        <p>
          <span>Current focal length: </span>
          <strong>
            {focalLength}
mm
          </strong>
        </p>
      </section>

      <section>
        <p>Selected sensors:</p>

        <List>
          {selectedSensors
            .map((sensor, i) => (
              <li key={sensor.name}>
                <ColorCircle index={i} />
                <span>
                  {sensor.name}
:
                  {' '}
                </span>
                <strong>
                  {Math.round(focalLength * sensor.crop)}
mm
                </strong>
              </li>
            ))}
        </List>

        <FovCanvas aspect={2 / 1} />
      </section>
    </Card>
  );
});

Sensor.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Sensor;
