import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Dimensions from 'react-dimensions';
import { observer } from 'mobx-react';

import store from '../store';

const StyledCanvas = styled.canvas`
  width: 100%;
`;

@observer class FovCanvas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: Math.floor(props.containerWidth * window.devicePixelRatio),
      height: Math.floor(props.containerWidth * (props.aspect ** -1) * window.devicePixelRatio),
    };
    this.state.radius = Math.min(this.state.width, this.state.height);
  }

  componentDidMount() {
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  /**
   * Calcualtes the field of view angle of an focal length of an full frame sensor
   * @param {number} focalLength - the focal length in mm
   * @param {number} crop - the crop factor
   * @return {number} - the field of view in radians
   */
  calculateFieldOfView = () => {
    const diagonal = Math.sqrt((24 ** 2) + (36 ** 2));
    const radian = (2 * Math.atan((diagonal) / (2 * store.focalLength * store.crop)));
    return radian;
  };

  /**
   * Calculates the position of the start/end angle of the canvas arc
   * @description Rotates the arc 90° anticlockwise,
   * so that the arc directs upwards instead of rightwards
   * @param {number} fov - the field of view in radians
   * @return {number} - the rotated start/end angle
   */
  calculateAngle = fov => (fov / 2) - (Math.PI / 2);

  /**
   * Update the canvas
   */
  updateCanvas() {
    const { width, height } = this.state;
    const { radius } = this.state;

    const ctx = this.canvas.getContext('2d');
    const fov = this.calculateFieldOfView();
    // const angle = (fov / 2) - (Math.PI / 2);

    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.moveTo(width / 2, height);
    ctx.arc(width / 2, height, radius, this.calculateAngle(-fov), this.calculateAngle(fov), false);
    ctx.fillStyle = '#ccc';
    ctx.fill();
  }

  render() {
    const { width, height } = this.state;

    return (
      <StyledCanvas
        innerRef={(canvas) => { this.canvas = canvas; }}
        width={width}
        height={height}
      />
    );
  }
}

FovCanvas.propTypes = {
  containerWidth: PropTypes.number.isRequired,
  aspect: PropTypes.number,
};

FovCanvas.defaultProps = {
  aspect: 2 / 1,
};

export default Dimensions()(FovCanvas);
