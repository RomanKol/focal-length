import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import store from '../store';

import Card from './card';
import { Table, Thead, Td } from '../components/table';
import SensorSelect from '../components/sensorSelect';

const Sensor = observer(({ title }) => {
  const { selectedSensors } = store;

  return (
    <Card>
      <h3>{title}</h3>

      <section>
        <section>
          <SensorSelect />
          {selectedSensors.length > 0
            ? (
              <React.Fragment>
                <Table>

                  <Thead>
                    <tr>
                      <th />
                      {selectedSensors.map(sensor => <th key={sensor.name}>{sensor.name}</th>)}
                    </tr>
                  </Thead>
                  <tbody>
                    {Object.keys(selectedSensors[0]).filter(key => key !== 'name').map(key => (
                      <tr key={key}>
                        <Td>{key}</Td>
                        {selectedSensors.map(sensor => <Td key={sensor.name}>{sensor[key] || '-'}</Td>)}
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
              </React.Fragment>
            )
            : <p>No sensor selected - Select sensors to compare them</p>
          }
        </section>
        {/* <SensorSize /> */}
      </section>
    </Card>
  );
});

Sensor.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Sensor;
