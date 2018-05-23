import React from 'react';
import PropTypes from 'prop-types';

import Card from './card';
import RangeInput from '../components/rangeInput';
import FovCanvas from '../components/fovCanvas';

const Sensor = (props) => {
  const {
    title,
    focalLength,
    crop,
    updateFocalLength,
  } = props;

  return (
    <Card>
      <h3>{title}</h3>

      <section>
        <section>
          <RangeInput
            title="Input Focal length"
            value={focalLength}
            max={800}
            onChange={updateFocalLength}
          />
          <p>
            <span>Current focal length: </span>
            <b>{focalLength}mm</b>
            <br />
            <span>Focal length on selected crop: </span>
            <b>{Math.round(focalLength * crop)}mm</b>
          </p>
        </section>

        <FovCanvas
          aspect={2 / 1}
          focalLength={focalLength}
          crop={crop}
        />
      </section>
    </Card>
  );
};

Sensor.propTypes = {
  title: PropTypes.string.isRequired,
  focalLength: PropTypes.number.isRequired,
  crop: PropTypes.number.isRequired,
  updateFocalLength: PropTypes.func.isRequired,
};

export default Sensor;
