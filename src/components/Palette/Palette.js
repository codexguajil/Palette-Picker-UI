import React, { Component } from 'react';
import { Color } from '../Color/Color';

export class Palette extends Component {
  constructor() {
    super();
    this.state = { colors: [] };
  }

  componentDidMount = () => {
    let initialColors = [];

    for (let i = 0; i < 5; i++) {
      let randColor = this.generateColor();
      initialColors.push(randColor);
    }

    this.setState({ colors: initialColors });
  }

  generateColor() {
    return '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
  }

  render() {
    const { colors } = this.state;

    return colors 
      ? <div className="Palette">
        {
          colors.map(color => <Color hex={color}/>) 
        }
      </div>
      : <p>LOADING..</p>
  }
}