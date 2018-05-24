import React from 'react';
import { observer } from 'mobx-react';

import store from '../store';

const SensorSelect = observer(() => (
  <select
    defaultValue={store.selectedSensorIndex}
    onChange={(e) => { store.selectedSensorIndex = parseInt(e.target.value, 10); }}
  >
    {store.sensors.map((sensor, i) => (
      <option key={sensor.name} value={i} >
        {sensor.name} - [{sensor.crop}]
      </option>
    ))}
  </select>
));

export default SensorSelect;
