import React, { Component } from 'react';

import namer from 'color-namer';
import convert from 'color-convert';

export class Color extends Component {

  determineLightLevel(hex) {
    const baseHex = hex.slice(1, 7);

    let hsl = convert.hex.hsl(baseHex);

    let lightLvl = hsl[2];

    return lightLvl <= 40 ? true : false;
  }

  hexToName(hex) {
    let names = namer(hex);
    return names.ntc[0].name;
  }

  render() {
    const { hex, locked, toggleLocked } = this.props;
    const style = { backgroundColor: hex };

    let lightClass = this.determineLightLevel(hex) ? 'light' : '';

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