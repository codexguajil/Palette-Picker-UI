import React from 'react';
import arrow from '../../media/arrow.svg';

export function Header(props) {

  let labelStyle = {backgroundImage: `url(${arrow})`}

  return (
    <div className="Header">
      <h1>PalettePicker</h1>
      <label style={labelStyle} for="toggle" className={`label ${props.activeNav ? 'flipped' : ''}`} ></label>
      <input id="toggle" onChange={props.toggleNav} type="checkbox" />
    </div>
  )
}