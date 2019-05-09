import React, { Component } from 'react';
import { Header } from '../Header/Header';
import { Nav } from '../Nav/Nav';
import { Palette } from '../Palette/Palette';

export class App extends Component {
  constructor() {
    super();
    this.state = { activeSidebar: false };
  }

  changeState = (state) => {
    this.setState(state);
  }

  render() {
    return (
      <div className="App">
        <Header changeState={this.changeState} />
        <Palette active={this.state.activeSidebar} />
      </div>
    );
  }
  
}

export default App;