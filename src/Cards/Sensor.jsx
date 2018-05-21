import React from 'react';
import PropTypes from 'prop-types';

import Card from './card';
import { Table, Thead, Td } from '../components/table';
import SensorSelect from '../components/sensorSelect';

const Sensor = (props) => {
  const {
    title,
    sensors,
    selectedSensorIndex,
    updateSelectedSensor,
    selectedSensor,
    fullFrameSensor,
  } = props;

  const comparison = selectedSensor.name !== fullFrameSensor.name;

  return (
    <Card>
      <h3>{title}</h3>

      <section>
        <section>
          <SensorSelect
            sensors={sensors}
            selectedIndex={selectedSensorIndex}
            onChange={updateSelectedSensor}
          />
          <Table>
            <Thead>
              <tr>
                <th />
                {comparison && <th>{selectedSensor.name}</th>}
                <th>{fullFrameSensor.name}</th>
              </tr>
            </Thead>
            <tbody>
              {Object.keys(selectedSensor).filter(key => key !== 'name').map(key => (
                <tr key={key}>
                  <Td>{key}</Td>
                  {comparison && <Td>{selectedSensor[key] || '-'}</Td>}
                  <Td>{fullFrameSensor[key] || '-'}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
          <footer>
            <small>
              The units of the sensor diagonal, width and height are <i>mm</i>.
              The unit of the sensor area is <i>mm²</i>.
            </small>
          </footer>
        </section>
      </section>
    </Card>
  );
};

const sensor = PropTypes.shape({
  name: PropTypes.string.isRequired,
  diagonal: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  area: PropTypes.number.isRequired,
  crop: PropTypes.number.isRequired,
});

Sensor.propTypes = {
  title: PropTypes.string.isRequired,
  sensors: PropTypes.arrayOf(sensor).isRequired,
  selectedSensorIndex: PropTypes.number.isRequired,
  updateSelectedSensor: PropTypes.func.isRequired,
  selectedSensor: sensor.isRequired,
  fullFrameSensor: sensor.isRequired,
};

export default Sensor;
