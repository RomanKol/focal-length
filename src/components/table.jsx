import React from 'react';
import PropTypes from 'prop-types';

const Table = ({ header, data, selected }) => {
  const keys = Object.keys(header);

  return (
    <table>
      <thead>
        <tr>
          {keys.map(key => <th key={key}>{header[key]}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => (
          <tr key={item.name} className={i === selected ? 'selected' : ''}>
            {keys.map(key => <td key={`${item.name}-${key}`}> {item[key]} </td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  header: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  selected: PropTypes.number,
};

Table.defaultProps = {
  selected: null,
};

export default Table;
