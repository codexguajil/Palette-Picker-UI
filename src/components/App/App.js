import React, { Component } from 'react';
import { Header } from '../Header/Header';
import { Nav } from '../Nav/Nav';
import { Palette } from '../Palette/Palette';

export class App extends Component {
  constructor() {
    super();
    this.state = {  };
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Palette />
      </div>
    );
  }
  
}

export default App;