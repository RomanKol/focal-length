import React from 'react';
import { observer } from 'mobx-react';

import store from '../store';

const SensorSelect = observer(() => {
  const onChangeHandler = (e) => {
    store.selectedSensorIndices = Array.from(e.target.options)
      .reduce((indices, option, index) => (option.selected ? [...indices, index] : indices), []);
  };

  return (
    <select
      defaultValue={store.selectedSensorIndices}
      onChange={onChangeHandler}
      size={5}
      multiple
    >
      {store.sensors.map((sensor, i) => (
        <option key={sensor.name} value={i}>
          {sensor.name} - [{sensor.crop}]
        </option>
      ))}
    </select>
  );
});

export default SensorSelect;
