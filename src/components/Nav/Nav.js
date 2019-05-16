import React, { Component } from 'react';
import { fetchApiData } from '../../utils/api';

export class Nav extends Component {
  constructor() {
    super();
    this.state = { 
      projects: [],
      projectTitle: '',
      paletteTitle: '',
      projectError: '',
      paletteError: ''
    }
  }

  componentDidMount() {
    this.gatherProjects();
  }

  navClassBuilder(boolean) {
    return `Nav ${boolean ? 'active' : ''}`
  }

  gatherProjects = async () => {
    try {
      const projectResponse = await fetchApiData('projects', { method: 'GET' });

      const paletteResponse = await fetchApiData('palettes', { method: 'GET' });

      let projects = projectResponse.map(project => { 
        let projectObj = { title: project.title, id: project.id, palettes: [] }

        paletteResponse.forEach(palette => {
          if (palette.project_id === project.id) {
            projectObj.palettes.push(palette);
          }
        });
        return projectObj;
      });
      this.setState({ 
        projects,
        projectTitle: '',
        paletteTitle: ''
      });  
  
    } catch (error) {
      return error;
    }
  }

  handleChange = (e) => {
    const { value, id } = e.target;
    this.setState({ [id]: value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    e.persist();
    const { id } = e.target;
    const { projectTitle, paletteTitle } = this.state;
    const { colors } = this.props;
    switch (id) {
      case 'projects' :
        let projectOptions = { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: projectTitle })
        }
        await fetchApiData(id, projectOptions);
        this.gatherProjects();
        return id;
      case 'palettes' :
        let projects = await fetchApiData('projects', { method: 'GET' });
        let options = Array.from(e.target.querySelectorAll('option'));
        let project_id = options.find(option => option.selected).id;
        let body = { 
          name: paletteTitle, 
          color1: colors[0].hex, 
          color2: colors[1].hex, 
          color3: colors[2].hex, 
          color4: colors[3].hex, 
          color5: colors[4].hex,
          project_id
        };
        let paletteOptions = { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        }
        await fetchApiData(id, paletteOptions);
        this.gatherProjects();
        return id;
      default :
        return id;
    }   
  }

  handleDelete = async (e) => {
    const { id, value } = e.target;
    let response = await fetchApiData(`${value}/${id}`, { method: 'DELETE' });
    if (response.statusText === 'No Content') this.gatherProjects();
  }

  handlePatch = async (e) => {
    const { colors } = this.props;
    const { id, value } = e.target;
    let name = e.target.parentElement.querySelector('p').innerText;
    let options = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        name, 
        color1: colors[0].hex, 
        color2: colors[1].hex, 
        color3: colors[2].hex, 
        color4: colors[3].hex, 
        color5: colors[4].hex
      })
    }
    let response = await fetchApiData(`${value}/${id}`, options);
    console.log(response); // make popup message
  }

  render() {
    const { projects, projectTitle, paletteTitle, projectError, paletteError } = this.state;

    let navClass = this.navClassBuilder(this.props.activeNav);

    return (
      <div className={navClass}>
        <div className="info-section form">

          <form id="projects" onSubmit={this.handleSubmit}>
            <label htmlFor="projectTitle">Create a Project:</label>
            <div>
              <input  onChange={this.handleChange} 
                      id="projectTitle" 
                      value={projectTitle} 
                      type="text" 
                      placeholder={projectError || "ex. Home Decor.."}>
              </input>
              <input className="submit-btn" type="submit"></input>
            </div>
          </form>

          <form id="palettes" onSubmit={this.handleSubmit}>
            <label htmlFor="paletteTitle">Save this Palette:</label>
            <div>
              <select>
                { 
                  projects.length 
                    ? projects.map(project => <option id={project.id} key={project.id}>{project.title}</option>)
                    : <option></option>
                }
              </select>
              <input  onChange={this.handleChange} 
                      id="paletteTitle" 
                      value={paletteTitle} 
                      type="text" 
                      placeholder={paletteError || "ex. Autumn Colors.."}>
              </input>
              <input className="submit-btn" type="submit"></input>
            </div>
          </form>

        </div>
        <div className="line-break"></div>
        <div className="info-section projects">

          {
            projects.length
              ? projects.map(project => (
                <div className="project-container" key={project.id}>

                  <h6>TITLE:</h6>
                  <p key={project.id}>{project.title}</p>
                  <button className="project-delete" value="projects" id={project.id} onClick={this.handleDelete}>X</button>

                  <div>
                    <h6>PALETTES:</h6>
                    {
                      project.palettes.length
                        ? project.palettes.map(palette => 
                          <div key={palette.id} className="palette-container">
                            <p id="paletteEdit" contentEditable="true" onClick={() => this.props.setHex([
                              {hex: palette.color1}, 
                              {hex: palette.color2}, 
                              {hex: palette.color3}, 
                              {hex: palette.color4}, 
                              {hex: palette.color5}
                              ])}>{palette.name}</p>
                            <div className="palette-buttons">
                              <button className="palette-save" value="palettes" id={palette.id} onClick={this.handlePatch}>SAVE</button>
                              <button className="palette-delete" value="palettes" id={palette.id} onClick={this.handleDelete}>X</button>
                            </div>
                          </div>)
                        : <p>Add a palette!</p>
                    } 
                  </div>
                </div>
                )
              )
              : <p className="splash-text">◄ Try Creating a Project!</p>
          }
          
        </div>
        <div className="tutorial">
          <p>Press the ‘spacebar’ key to generate a new palette</p>
        </div>
      </div>
    )
  }
}
