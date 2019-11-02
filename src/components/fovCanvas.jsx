import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
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
      if (store.selectedSensors.length && this.canvas) this.updateCanvas();
      else if (this.canvas) this.clearCanvas();
    }, { delay: 16.67 });
  }

  componentDidMount() {
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }


  /**
   * Calcualtes the field of view angle of a sensor for a given focal length
   * @param {number} diagonal - the diagonal of the sensor
   * @return {number} - the field of view in radians
   */
  calculateFieldOfView = (diagonal) => {
    const radian = (2 * Math.atan((diagonal) / (2 * store.focalLength)));
    // the degree value would be calculated as followed: const degree = radian * 180) / Math.PI;
    return radian;
  };

  /**
   * Calculates the position of the start/end angle of the canvas arc
   * @description Rotates the arc 90° anticlockwise,
   * so that the arc directs upwards instead of rightwards
   * @param {number} fov - the field of view in radians
   * @return {number} - the rotated start/end angle
   */
  calcAngle = (fov) => (fov / 2) - (Math.PI / 2);

  /**
   * Update the canvas
   */
  updateCanvas() {
    const { width, height } = this;
    const ctx = this.canvas.getContext('2d');

    const { selectedSensors, selectedSensorColors } = store;
    const count = store.sensors.length;

    ctx.clearRect(0, 0, width, height);

    selectedSensors.forEach((sensor, i) => {
      // draw the field of view arc
      const fov = this.calculateFieldOfView(sensor.diagonal);
      const radius = (this.radius / count) * (count - i);
      ctx.fillStyle = selectedSensorColors[i];

      ctx.beginPath();
      ctx.moveTo(width / 2, height);
      ctx.arc(width / 2, height, radius, this.calcAngle(-fov), this.calcAngle(fov), false);
      ctx.closePath();
      ctx.fill();

      // draw the degrees as text, and don'f forget the devicePixelRatio ;)
      ctx.fillStyle = '#000';
      ctx.font = `${Math.round(16 * window.devicePixelRatio)}px monospace`;
      const degrees = Math.round((fov * 180) / Math.PI);
      const xPosition = width / 2;
      const yPosition = (height - radius) + Math.round(16 * window.devicePixelRatio);
      ctx.textAlign = 'center';
      ctx.fillText(`∠ ≈ ${degrees}°`, xPosition, yPosition);
    });

    // we could also draw a camera at the center of the arc
    /*
    ctx.font = `${Math.round(48 * window.devicePixelRatio)}px monospace`;
    ctx.fillText('📷', width / 2, height - 4);
    */
  }

  /**
   * clears the canvas
   */
  clearCanvas() {
    const { width, height } = this;
    const ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);
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
  aspect: PropTypes.number,
  containerWidth: PropTypes.number.isRequired,
};

FovCanvas.defaultProps = {
  aspect: 3 / 2,
};

export default Dimensions()(FovCanvas);
