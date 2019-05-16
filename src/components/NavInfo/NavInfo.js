import React, { Component } from 'react';

export class NavInfo extends Component {

  mapProjectInfo = () => {
    let mappedProjects = this.props.projects.map(project => (
      <div  className="project-container" 
            key={project.id} >

        <h6>TITLE:</h6>
        <p key={project.id}>{project.title}</p>
        <button   className="project-delete" 
                  value="projects" 
                  id={project.id} 
                  onClick={this.props.handleDelete}>X</button>

        <div>
          <h6>PALETTES:</h6>
          {
            project.palettes.length
              ? this.mapPaletteInfo(project)
              : <p>Add a palette!</p>
          } 
        </div>
      </div>
      )
    )

    return mappedProjects;
  }

  mapPaletteInfo = (project) => {
    let mappedPalettes = project.palettes.map(palette => (
      <div  key={palette.id} 
            className="palette-container" >
      
        <p id="paletteEdit" onClick={() => this.props.setHex([
          {hex: palette.color1}, 
          {hex: palette.color2}, 
          {hex: palette.color3}, 
          {hex: palette.color4}, 
          {hex: palette.color5}
          ])}>{palette.name}</p>

        <div className="palette-buttons">

          <button   className="palette-save" 
                    value="palettes" 
                    id={palette.id} 
                    onClick={this.props.handlePatch}>SAVE</button>

          <button   className="palette-delete" 
                    value="palettes" 
                    id={palette.id} 
                    onClick={this.props.handleDelete}>X</button>
        </div>
      </div>
      )
    )
    return mappedPalettes;
  }

  render() {

    return (

      <div className="info-section projects">

        {
          this.props.projects.length
            ? this.mapProjectInfo()
            : <p className="splash-text">◄ Try Creating a Project!</p>
        }
        
      </div>

    )
  }

}
