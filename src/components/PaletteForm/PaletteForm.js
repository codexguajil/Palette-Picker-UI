import React, { Component } from 'react';

export class PaletteForm extends Component {

  mapProjectOptions = () => {
    const options = this.props.projects.map(project => 
      <option id={project.id} key={project.id}>{project.title}</option>);

    return options;
  }

  render() {

    return (

      <form id="palettes" onSubmit={this.props.handleSubmit} autoComplete="off">
        <label htmlFor="paletteTitle">Save this Palette:</label>
        <div>
          <select>
            { 
              this.props.projects.length 
                ? this.mapProjectOptions()
                : <option></option>
            }
          </select>
          <input  onChange={this.props.handleChange} 
                  id="paletteTitle" 
                  value={this.props.paletteTitle} 
                  type="text" 
                  placeholder={this.props.paletteError || "ex. Autumn Colors.."}>
          </input>
          <input className="submit-btn" type="submit"></input>
        </div>
      </form>

    )
  }
}