import React from 'react';
import PropTypes from 'prop-types';

const RangeInput = props => (
  <label htmlFor={props.title}>
    {props.title}
    <input
      type="range"
      id={props.title}
      name={props.title}
      {...props}
    />
  </label>
);

RangeInput.propTypes = {
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  steps: PropTypes.number,
};

RangeInput.defaultProps = {
  min: 0,
  max: 800,
  steps: 1,
  value: 35,
};

export default RangeInput;
