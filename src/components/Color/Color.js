import React, { Component } from 'react';
import namer from 'color-namer';

export class Color extends Component {
  constructor() {
    super();
    this.state = { checked: false };
  }

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
    const { hex, locked, toggleLocked } = this.props;
    const style = { backgroundColor: hex };

    let lightClass = this.determineLightness(hex) ? 'light' : '';

    let colorName = this.hexToName(hex).toUpperCase();

    let lockClass = locked ? 'locked' : '';

    return (
      <div onMouseDown={() => toggleLocked(hex)} style={ style } className="Color">
        <span className={`lock ${lockClass} ${lightClass}`} ></span>
        <p className={ `hex ${lightClass}` }>{ hex }</p>
        <p className={ `name ${lightClass}` }>{ colorName }</p>
      </div>
    )
  }
}