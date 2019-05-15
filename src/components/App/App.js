import React, { Component } from 'react';
import { Header } from '../Header/Header';
import { Nav } from '../Nav/Nav';
import { Palette } from '../Palette/Palette';

export class App extends Component {
  constructor() {
    super();
    this.state = { 
      activeNav: false,
      currHex: []
    };
  }

  toggleNav = (e) => {
    this.setState({ activeNav: e.target.checked });
  }

  setHex = (hex) => {
    this.setState({ currHex: hex });
  }

  render() {
    return (
      <div className="App">
        <Header toggleNav={this.toggleNav} activeNav={this.state.activeNav}/>
        <Nav colors={this.state.currHex} activeNav={this.state.activeNav}/>
        <Palette colors={this.state.currHex} setHex={this.setHex}/>
      </div>
    );
  }
  
}