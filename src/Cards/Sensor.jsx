import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import styled from 'react-emotion';

import store from '../store';

import Card from './card';
import {
  TableWrapper, Table, Thead, Td,
} from '../components/table';
import SensorSelect from '../components/sensorSelect';
import SensorSize from '../components/sensorSize';

const ColorCircle = styled.div`
  width: 1em;
  height: 1em;
  background-color: ${({ color }) => color};
  border-radius: 50%;
  margin: 0 0 0 auto;
`;

const Sensor = observer(({ title }) => {
  const { selectedSensors, selectedSensorColors } = store;

  const SelectedSensorTable = () => (
    <React.Fragment>
      <TableWrapper>
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
                <Td><strong>{key}</strong></Td>
                {selectedSensors.map(sensor => <Td key={sensor.name}>{sensor[key] || '-'}</Td>)}
              </tr>
            ))}
            <tr>
              <Td><strong>color</strong></Td>
              {selectedSensorColors
                .map(color => <Td key={color}><ColorCircle color={color} /></Td>)
              }
            </tr>
          </tbody>

        </Table>
      </TableWrapper>

      <footer>
        <small>
          The units of the sensor diagonal, width and height are <i>mm</i>.
          The unit of the sensor area is <i>mm²</i>.
        </small>
      </footer>
    </React.Fragment>
  );

  return (
    <Card>
      <header>
        <h3>{title}</h3>
      </header>

      <section>
        <SensorSelect />

        {selectedSensors.length > 0
          ? <SelectedSensorTable />
          : <p>No sensor selected - Select sensors to compare them</p>
        }
      </section>

      <section>
        <SensorSize />

        <footer>
          <small>The shown sensors dimensions are not to scale!</small>
        </footer>
      </section>
    </Card>
  );
});

Sensor.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Sensor;
