import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import Dimensions from 'react-dimensions';

import store from '../store';

const SensorSize = observer(({ aspect, containerWidth: width }) => {
  const height = width * (aspect ** -1);
  const { selectedSensors, selectedSensorColors } = store;

  // calculate scaling, if sensor dimension is bigger than the the rect, scale down, else scale up
  const maxWidth = Math.max(...selectedSensors.map((sensor) => sensor.width));
  const maxHeight = Math.max(...selectedSensors.map((sensor) => sensor.height));

  // shift/translate the sensors to center them
  const scaling = Math.min(width / maxWidth, height / maxHeight);
  const xShift = Math.round((width - (maxWidth * scaling)) / 2);
  const yShift = Math.round((height - (maxHeight * scaling)) / 2);

  const Rect = (sensor, i) => {
    const strokeWidth = 1;
    const styles = {
      fill: selectedSensorColors[i],
      strokeWidth,
      stroke: '#000',
    };

    const x = Math.round(sensor.width * scaling);
    const y = Math.round(sensor.height * scaling);

    return (
      <rect
        key={sensor.name}
        x={0 + strokeWidth + xShift}
        y={Math.round(height - y) + strokeWidth + yShift}
        width={x - (strokeWidth * 2)}
        height={y - (strokeWidth * 2)}
        fill="none"
        {...styles}
      />
    );
  };

  return (
    <section>
      <svg viewBox={`0,0,${width},${height}`}>
        {selectedSensors.map(Rect).reverse()}
      </svg>
    </section>
  );
});

SensorSize.propTypes = {
  aspect: PropTypes.number,
  containerWidth: PropTypes.number.isRequired,
};

SensorSize.defaultProps = {
  aspect: 3 / 2,
};

export default Dimensions()(SensorSize);
