import React, { Component } from 'react';
import { Color } from '../Color/Color';
import convert from 'color-convert';

export class Palette extends Component {

  componentDidMount = async () => {
    document.addEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = (event) => {
    if (event.keyCode === 32) {
      if (event.path[0].id !== 'projectTitle' && event.path[0].id !== 'paletteTitle') this.generatePalette();
    }
  }

  generatePalette = () => {
    const { colors } = this.props;
    let colorPalette = [];

    let lockedState = colors.filter(color => color.locked);

    if (!colors.length || !lockedState.length) {
      let hex = '#' + convert.hsl.hex(this.generateBaseColor());
      colorPalette.push({ hex, locked: false });
    }

    for (let i = 0; i < 5; i++) {

      if (colors && colors[i] && colors[i].locked) {
        colorPalette.push(colors[i]);

      } else if (!colorPalette[i]) {

        let baseHSL;
        let prevHSL;

        if (colorPalette[0]) {
          baseHSL = convert.hex.hsl(colorPalette[0].hex.slice(1, 7));

          prevHSL = convert.hex.hsl(colorPalette[i - 1].hex.slice(1, 7));
        } else {
          baseHSL = convert.hex.hsl(lockedState[0].hex.slice(1, 7));

          prevHSL = baseHSL;
        }
        let newHSL = this.generateColor(baseHSL, prevHSL);

        colorPalette.push({ hex: '#' + convert.hsl.hex(newHSL), locked: false });
      }
    }
    this.props.setHex(colorPalette);
  }

  generateBaseColor() {
    let randomHue = this.numberGenerator(0, 360);
    let randomSaturation = this.numberGenerator(20, 50);
    let randomLightness = this.numberGenerator(50, 75);
    return [randomHue, randomSaturation, randomLightness];
  }

  generateColor = (baseHSL, prevHSL) => {
    let newHSL = [];

    let hueIncrement = baseHSL[0] > 180 
      ? this.numberGenerator(-40, -20) : this.numberGenerator(20, 40);
    newHSL.push( prevHSL[0] + hueIncrement );

    let saturationIncrement = baseHSL[1] > 35 
      ? this.numberGenerator(-15, -5) : this.numberGenerator(5, 15);
    newHSL.push( prevHSL[1] + saturationIncrement );

    let lightIncrement = baseHSL[2] > 50 
      ? this.numberGenerator(-15, -5) : this.numberGenerator(5, 15);
    newHSL.push( prevHSL[2] + lightIncrement );

    return newHSL;
  }

  numberGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  toggleLocked = (hex) => {
    let storedPalette = this.props.colors;

    let foundColor = storedPalette.find(color => color.hex === hex)
    foundColor.locked = !foundColor.locked;

    this.props.setHex(storedPalette);
  }

  render() {
    const { colors } = this.props;
    
    if (!colors.length) this.generatePalette();

    return colors 
      ? <div className={`Palette`}>
        <div className="colors">
        {
          colors.map(color => <Color key={color.hex} toggleLocked={this.toggleLocked} {...color}/>) 
        }
        </div>
      </div>
      : <p>Loading...</p>
  }
}