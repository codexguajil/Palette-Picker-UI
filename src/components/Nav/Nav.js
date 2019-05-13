import React, { Component } from 'react';
import { fetchApiData } from '../../utils/api';

export class Nav extends Component {

  navClassBuilder(boolean) {
    return `Nav ${boolean ? 'active' : ''}`
  }

  // fetchProjects = async () => {
  //   try {
  //     const response = fetchApiData('projects');
  //     console.log(response);
  //   } catch (error) {
  //     return error;
  //   }
  // }

  render() {
    let navClass = this.navClassBuilder(this.props.activeNav);
    return (
      <div className={navClass}>
        <div className="info-section projects">
          
        </div>
        <div className="info-section palettes">
          
        </div>
        <div className="info-section create-new">
          
        </div>
        <div className="tutorial">
          <p>Press the ‘spacebar’ key to generate a new palette</p>
        </div>
      </div>
    )
  }
}
