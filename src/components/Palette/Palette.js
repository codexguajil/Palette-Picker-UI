import React, { Component } from 'react';
import { Color } from '../Color/Color';

export class Palette extends Component {
  constructor() {
    super();
    this.state = { colors: [] };
  }

  componentDidMount = () => {
    this.regeneratePalette();
    document.addEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = (event) => {
    if (event.keyCode === 32) this.regeneratePalette();
  }

  regeneratePalette = (colors = []) => {
    for (let i = 0; i < 5; i++) {
      let randColor = this.generateColor();
      colors.push(randColor);
    }
    this.setState({ colors });
  }

  generateColor() {
    return '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
  }

  render() {
    const { colors } = this.state;

    let paletteClass = this.props.active ? 'active' : '';

    return colors 
      ? <div className={`Palette ${paletteClass}`}>
        <div className="colors">
        {
          colors.map(color => <Color key={color} hex={color}/>) 
        }
        </div>
        <div className={`sidebar`}>sidebar</div>
      </div>
      : <p>LOADING..</p>
  }
}