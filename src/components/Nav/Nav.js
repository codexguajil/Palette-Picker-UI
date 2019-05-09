import React, { Component } from 'react';

export class Nav extends Component {

  toggleCheckbox = (e) => {
    this.props.changeState({ activeSidebar: e.target.checked });
  } 

  render() {
    return (
      <div className="Nav">
        <div className="tutorial">
          <p>Press the ‘spacebar’ key to generate a new palette</p>
        </div>
        <div className="toolbar">
          <input onChange={this.toggleCheckbox} type="checkbox" />
        </div>
      </div>
    )
  }
}