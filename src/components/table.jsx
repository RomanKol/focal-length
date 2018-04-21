import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const Table = styled('table')`
  width: 100%;
  max-width: 100%;
  margin-bottom: 1.25rem;
  border-collapse: collapse;
`;

const Thead = styled('thead')`
  th {
    border-bottom: 2px solid rgba(0, 0, 0, 0.12);
    font-weight: 700;
    text-align: left;
  }
`;

const Th = styled('th')`
  padding: 10px;
  line-height: 1.5;
`;
/* eslint-disable no-confusing-arrow */
const Tr = styled('tr')`
  ${props => props.selected ? 'background-color: #eee;' : ''}
`;
/* eslint-enable no-confusing-arrow */

const Td = styled('td')`
  padding: 10px;
  line-height: 1.5;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  :not(:first-child) {
    text-align: right;
  }
`;

const SensorTable = ({ header, data, selected }) => {
  const keys = Object.keys(header);

  return (
    <Table>
      <Thead>
        <Tr>
          {keys.map(key => <Th key={key}>{header[key]}</Th>)}
        </Tr>
      </Thead>
      <tbody>
        {data.map((item, i) => (
          <Tr key={item.name} selected={i === selected}>
            {keys.map(key => <Td key={`${item.name}-${key}`}> {item[key]} </Td>)}
          </Tr>
        ))}
      </tbody>
    </Table>
  );
};

SensorTable.propTypes = {
  header: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  selected: PropTypes.number,
};

SensorTable.defaultProps = {
  selected: null,
};

export default SensorTable;
