import React from 'react';

import Sensor from './Cards/Sensor';
import FieldOfView from './Cards/FieldOfView';
import Card from './Cards/card';
import SensorTable from './components/table';

const App = () => {
  const tableHeader = {
    name: 'Sensor',
    diagonal: 'Sensor diagonal',
    width: 'Sensor width',
    height: 'Sensor height',
    crop: 'Crop factor',
  };

  return (
    <main>

      <Card>
        <h1>Focal length comparison</h1>
        <p>Compare different focal lengths on various sensors</p>
      </Card>

      <Sensor title="Sensor/frame size" />

      <FieldOfView title="Field of view" />

      <Card>
        <h3>Sensors</h3>
        <SensorTable
          header={tableHeader}
          sorting="name"
        />
        <footer>
          <small>The units fo the sensor diagonal, width and height are <i>mm</i></small>
          <br />
          <small>The unit of the sensor area is <i>mm²</i></small>
        </footer>
      </Card>

      <footer>
        <span>created by Roman Kollatschny, 2018</span>
      </footer>

    </main >
  );
};

export default App;
