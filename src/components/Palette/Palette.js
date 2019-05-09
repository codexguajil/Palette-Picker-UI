import React, { Component } from 'react';
import { Color } from '../Color/Color';
import { fetchProjects } from '../../utils/api';

export class Palette extends Component {
  constructor() {
    super();
    this.state = { 
      colors: [],
      savedProjects: [],
      savedPalettes: [],
    };
  }

  componentDidMount = async () => {
    this.regeneratePalette();
    document.addEventListener('keydown', this.handleKeydown);
    this.fetchProjects()
    this.fetchPalettes()
  }

  fetchProjects = async () => {
    let projects = await fetchApiData('projects')
    this.setState({
      savedProjects: projects[0]
    })
  }

  fetchPalettes = async () => {
    let palettes = await fetchApiData('palettes')
    this.setState({
      savedPalettes: palettes[0]
    })
  }

  handleKeydown = (event) => {
    if (event.keyCode === 32) this.regeneratePalette();
  }

  regeneratePalette = (colors = []) => {
    for (let i = 0; i < 5; i++) {
      let randColor = this.generateColor();
      colors.push(randColor);
    }
    this.setState({ colors });
  }

  generateColor() {
    return '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
  }

  render() {
    const { colors } = this.state;

    let paletteClass = this.props.active ? 'active' : '';

    return colors 
      ? <div className={`Palette ${paletteClass}`}>
        <div className="colors">
        {
          colors.map(color => <Color key={color} hex={color}/>) 
        }
        </div>
        <div className={`sidebar`}>sidebar{this.state.savedProjects.name}</div>
      </div>
      : <p>LOADING..</p>
  }
}