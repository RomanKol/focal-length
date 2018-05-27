import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { observer } from 'mobx-react';
import { observable, autorun } from 'mobx';

import Dimensions from 'react-dimensions';

import store from '../store';

const StyledCanvas = styled.canvas`
  width: 100%;
`;

@observer class FovCanvas extends Component {
  @observable width = 0;
  @observable height = 0;
  @observable radius = 0;

  constructor(props) {
    super(props);
    this.width = Math.floor(props.containerWidth * window.devicePixelRatio);
    this.height = Math.floor(props.containerWidth * (props.aspect ** -1) * window.devicePixelRatio);
    this.radius = Math.min(this.width, this.height);

    autorun(() => {
      if (store.selectedSensors.length || store.focalLength) this.updateCanvas();
    }, { delay: 16.67 });
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
  calculateFieldOfView = (crop) => {
    const diagonal = Math.sqrt((24 ** 2) + (36 ** 2));
    const radian = (2 * Math.atan((diagonal) / (2 * store.focalLength * crop)));
    return radian;
  };

  /**
   * Calculates the position of the start/end angle of the canvas arc
   * @description Rotates the arc 90° anticlockwise,
   * so that the arc directs upwards instead of rightwards
   * @param {number} fov - the field of view in radians
   * @return {number} - the rotated start/end angle
   */
  calcAngle = fov => (fov / 2) - (Math.PI / 2);

  /**
   * Update the canvas
   */
  updateCanvas() {
    const { width, height } = this;
    const ctx = this.canvas.getContext('2d');

    const count = store.sensors.length;

    ctx.clearRect(0, 0, width, height);

    store.selectedSensors.forEach((sensor, i) => {
      const fov = this.calculateFieldOfView(sensor.crop);
      const radius = (this.radius / count) * (count - i);
      ctx.fillStyle = `hsl(${Math.round(360 / (count / store.selectedSensorIndices[i]))}, 60%, 60%)`;

      ctx.beginPath();
      ctx.moveTo(width / 2, height);
      ctx.arc(width / 2, height, radius, this.calcAngle(-fov), this.calcAngle(fov), false);
      ctx.closePath();
      ctx.fill();
    });
  }

  render() {
    return (
      <StyledCanvas
        innerRef={(canvas) => { this.canvas = canvas; }}
        width={this.width}
        height={this.height}
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
