import React, { Component } from 'react';
import namer from 'color-namer';

export class Color extends Component {

  determineLightness(hex) {
    const color = hex.substring(1);
    const rgbColor = parseInt(color, 16);

    const red = (rgbColor >> 16) & 0xff;
    const green = (rgbColor >> 8) & 0xff;
    const blue = (rgbColor >> 0) & 0xff;

    const lightLevel = 0.2126 * red + 0.7152 * green + 0.0722 * blue; 

    if (lightLevel < 80) return true;
  }

  hexToName(hex) {
    let names = namer(hex);
    return names.ntc[0].name;
  }

  render() {
    const { hex } = this.props;
    const style = { backgroundColor: hex };

    let lightClass = this.determineLightness(hex) ? 'light' : '';

    let colorName = this.hexToName(hex).toUpperCase();

    return (
      <div style={style} className="Color">
        <p className={`hex ${lightClass}`}>{ hex }</p>
        <p className={`name ${lightClass}`}>{ colorName }</p>
      </div>
    )
  }
}