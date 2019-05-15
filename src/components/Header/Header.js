import React, { Component } from 'react';
import arrow from '../../media/arrow.svg';

export default class Header extends Component {

  labelClassBuilder(boolean) {
    return `label ${boolean ? 'flipped' : ''}`;
  }

  render() {
    let labelStyle = {backgroundImage: `url(${arrow})`};
    let labelClass = this.labelClassBuilder(this.props.activeNav);
    return (
      <div className="Header">
        <h1>PalettePicker</h1>
        <label style={labelStyle} htmlFor="toggle" className={labelClass} ></label>
        <input id="toggle" onChange={this.props.toggleNav} type="checkbox" />
      </div>
    )
  }
}