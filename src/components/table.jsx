import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { observer } from 'mobx-react';

export const TableWrapper = styled.div`
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  max-width: 100%;
  margin-bottom: .5rem;
  border-collapse: collapse;
`;

export const Thead = styled.thead`
  th {
    border-bottom: 2px solid rgba(0, 0, 0, 0.12);
    font-weight: 700;
    text-align: right;
  }
`;

export const Th = styled.th`
  padding: 10px;
  line-height: 1.5;
  min-width: 6em;
`;
/* eslint-disable no-confusing-arrow */
export const Tr = styled.tr`
  ${props => props.selected ? 'background-color: #eee;' : ''}
`;
/* eslint-enable no-confusing-arrow */

export const Td = styled.td`
  padding: 10px;
  line-height: 1.5;
  min-width: 6em;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  :not(:first-child) {
    text-align: right;
  }
`;

const SimpleTable = observer((props) => {
  const keys = Object.keys(props.header).filter(key => !key.startsWith('_'));

  return (
    <Table>
      <Thead>
        <Tr>
          {keys.map(key => <Th key={key}>{props.header[key]}</Th>)}
        </Tr>
      </Thead>
      <tbody>
        {props.body.map((item, i) => (
          <Tr key={item[props.mapKey]} selected={props.selected.includes(i)}>
            {keys.map(key => <Td key={`${item[props.mapKey]}-${key}`}> {item[key]} </Td>)}
          </Tr>
        ))}
      </tbody>
    </Table>
  );
});

SimpleTable.propTypes = {
  header: PropTypes.objectOf(PropTypes.string).isRequired,
  body: PropTypes.arrayOf(PropTypes.object).isRequired,
  selected: PropTypes.arrayOf(PropTypes.number),
  mapKey: PropTypes.string.isRequired,
};

SimpleTable.defaultProps = {
  selected: [],
};

export default SimpleTable;
