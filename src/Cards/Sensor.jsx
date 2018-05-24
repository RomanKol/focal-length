import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import store from '../store';

import Card from './card';
import { Table, Thead, Td } from '../components/table';
import SensorSelect from '../components/sensorSelect';

const Sensor = observer(({ title }) => {
  const {
    selectedSensor,
    fullFrameSensor,
  } = store;

  const comparison = selectedSensor.name !== fullFrameSensor.name;

  return (
    <Card>
      <h3>{title}</h3>

      <section>
        <section>
          <SensorSelect />
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
});

Sensor.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Sensor;
