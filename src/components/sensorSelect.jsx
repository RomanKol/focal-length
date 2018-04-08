import React from 'react';
import PropTyes from 'prop-types';

const SensorSelect = ({ sensors, selectedIndex, onChange }) => (
  <select
    defaultValue={selectedIndex}
    onChange={onChange}
  >
    {
      sensors.map((sensor, i) => (
        <option
          key={sensor.name}
          value={i}
        >
          {sensor.name} - [{sensor.crop}]
        </option>
      ))
    }
  </select>
);

SensorSelect.propTypes = {
  sensors: PropTyes.arrayOf(PropTyes.object),
  onChange: PropTyes.func.isRequired,
  selectedIndex: PropTyes.number,
};

SensorSelect.defaultProps = {
  sensors: [],
  selectedIndex: 1,
};

export default SensorSelect;
