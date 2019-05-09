import React from 'react';
import { Nav } from '../Nav/Nav';

export function Header(props) {

  return (
    <div className="Header">
      <h1>PalettePicker</h1>
      <Nav changeState={props.changeState}/>
    </div>
  )
}