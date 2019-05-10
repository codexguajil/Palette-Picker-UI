import React, { Component } from 'react';
import { Header } from '../Header/Header';
import { Nav } from '../Nav/Nav';
import { Palette } from '../Palette/Palette';

export class App extends Component {
  constructor() {
    super();
    this.state = { activeNav: false };
  }

  toggleNav = (e) => {
    this.setState({ activeNav: e.target.checked });
  }

  render() {
    return (
      <div className="App">
        <Header toggleNav={this.toggleNav} activeNav={this.state.activeNav}/>
        <Nav activeNav={this.state.activeNav}/>
        <Palette />
      </div>
    );
  }
  
}

export default App;