import React, { Component } from 'react';
import { fetchApiData } from '../../utils/api';
import { connect } from 'react-redux';
import { addProject, addPalette } from '../../actions';

export class Nav extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      project: '',
    }
  }

  navClassBuilder = (boolean) => {
    return `Nav ${boolean ? 'active' : ''}`
  }

  saveProject = async () => {
    let currProject = this.props.project.find(project => project.name === this.state.project)
    let optionsObject = {
      method: 'POST',
      body: JSON.stringify({title: currProject.name}),
      headers: {
        'Content-Type' : 'application/json'
      },
    }
    try {
      const response = await fetchApiData('projects', optionsObject);
      console.log(response);
      this.savePalettes(currProject)
    } catch (error) {
      return error;
    }
  }

  savePalettes = async (project) => {
    console.log(project)
    let name = this.state.name
    let palettesObject = {
      title: project.name,
      name: name,
      color1: project.palettes[0].colors[0].hex,
      color2: project.palettes[0].colors[1].hex,
      color3: project.palettes[0].colors[2].hex,
      color4: project.palettes[0].colors[3].hex,
      color5: project.palettes[0].colors[4].hex
    }
    let optionsObject = {
      method: 'POST',
      body: JSON.stringify(palettesObject),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const response = await fetchApiData('palettes', optionsObject);
      console.log(response);
    } catch (error) {
      return error;
    }
  }

  handleChange = (e) => {
    this.setState({
      name: e.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {name} = this.state
    const {palette} = this.props
    this.props.addProject(name)
    this.setState({
      project: name
    })
  }

  addPalette = (e) => {
    e.preventDefault()
    const { palette } = this.props
    const { name, project } = this.state
    this.props.addPalette(palette, project, name)
  }

  toggleDropDown = () => {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  selectProject = (e) => {
    this.setState({
      project: e.target.name
    })
  }

  render() {
    let navClass = this.navClassBuilder(this.props.activeNav);
    return (
      <div className={navClass}>
        <form className="new-project" onSubmit={this.handleSubmit}>
          <input className="project-name-input"
                value={this.state.name}
                name="name"
                onChange={this.handleChange}
                placeholder="project-name"
          ></input>
          <button className="info-section projects">
            create a new project.
          </button>
        </form>
        <form className="new-project" onSubmit={this.addPalette}>
          <input className="project-name-input"
                value={this.state.name}
                name="name"
                onChange={this.handleChange}
                placeholder="project-name"
          ></input>
          <button className="info-section palettes">
          add this palette to current project
        </button>
        </form>
        <div className="dropdown">
          <button className="dropbtn" onClick={this.toggleDropDown}>Dropdown
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content" id="myDropdown">
          { this.state.project &&
            this.props.project.map(project => {
              return <a href="#" 
                        onClick={this.selectProject}
                        name={project.name}
              >{project.name}</a>
            })
          }
          </div>
          </div> 
        <button className="info-section create-new"
                onClick={this.saveProject}
        >
          Save
        </button>
        <button className="tutorial">
          <p>Press the ‘spacebar’ key to generate a new palette</p>
        </button>
      </div>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  addProject: (project, palette) => dispatch(addProject(project, palette)),
  addPalette: (project, id, name) => dispatch(addPalette(project, id, name)),
})

export const mapStateToProps = (state) => ({
  palette: state.currentColors,
  project: state.project
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
