import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';

// 'Fix' the rc-slider labels
const SliderWrapper = styled.div`
  margin-bottom: 1em;
  padding: 1em 0;
  & span.rc-slider-mark-text {
    transform: rotate(90deg);
    top: 10px;
    text-align: left;
    width: auto !important;
    margin-left: -2.6% !important;
  }
`;

const RangeInput = (props) => {
  const { title, ...others } = props;
  return (
    <label htmlFor={title}>
      {title}

      <SliderWrapper>
        <Slider {...others} included={false} />
      </SliderWrapper>

      {/* <input
      type="range"
      id={title}
      name={title}
      {...props}
    /> */}
    </label>
  );
};

RangeInput.propTypes = {
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  steps: PropTypes.number,
  marks: PropTypes.objectOf(PropTypes.string),
};

RangeInput.defaultProps = {
  min: 0,
  max: 800,
  steps: 1,
  defaultValue: 35,
  marks: [16, 24, 35, 50, 70, 100, 200, 400, 600, 800].reduce((obj, num) => ({ ...obj, [num]: `${num}mm` }), {}),
};

export default RangeInput;
