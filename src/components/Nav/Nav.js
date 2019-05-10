import React, { Component } from 'react';

export class Nav extends Component {

  render() {
    return (
      <div className={`Nav ${this.props.activeNav ? 'active' : ''}`}>
        <div className="tutorial">
          <p>Press the ‘spacebar’ key to generate a new palette</p>
        </div>
      </div>
    )
  }
}
