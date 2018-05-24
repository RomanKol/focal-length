import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import Card from './card';
import RangeInput from '../components/rangeInput';
import FovCanvas from '../components/fovCanvas';

import store from '../store';

const Sensor = observer(({ title }) => {
  const { focalLength, crop } = store;

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
            <span>Focal length on selected crop: </span>
            <b>{Math.round(focalLength * crop)}mm</b>
          </p>
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
