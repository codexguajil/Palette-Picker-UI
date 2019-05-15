import React, { Component } from 'react';
import { fetchApiData, postApiData, deleteApiData } from '../../utils/api';

export class Nav extends Component {
  constructor() {
    super();
    this.state = { 
      projects: [],
      // palettes: [],
      projectTitle: '',
      paletteTitle: '',
      projectError: '',
      paletteError: ''
    }
  }

  componentDidMount() {
    this.gatherProjects();
    // this.gatherPalettes();
  }

  navClassBuilder(boolean) {
    return `Nav ${boolean ? 'active' : ''}`
  }

  gatherProjects = async () => {
    try {
      const response = await fetchApiData('projects');

      this.setState({ 
        projects: response,
        projectTitle: '',
      });  
  
    } catch (error) {
      return error;
    }
  }

  gatherPalettes = async (id) => {
    try {
      const response = await fetchApiData('palettes');

      this.setState({ 
        palettes: response,
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
        await postApiData(id, { title: projectTitle });
        this.gatherProjects();
        return id;
      case 'palettes' :
        let projects = await fetchApiData('projects');
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
        await postApiData(id, body);
        this.gatherPalettes();
        return id;
      default :
        return id;
    }   
  }

  handleDelete = async (e) => {
    const { id, value } = e.target;
    let response = await deleteApiData(`${value}/${id}`);
    if (response === 'No Content') this.gatherProjects();
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
                    : <option>Create a Project!</option>
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
                <div key={project.id}>
                  <div>
                    <h3>Project Title:</h3>
                    <p key={project.id}>{project.title}</p>
                    <button value="projects" id={project.id} onClick={this.handleDelete}>X</button>
                  </div>
                  <div>
                    <p>Palettes:</p>
                    {
                      // palettes.length
                      //   && palettes.filter(palette => palette.project_id === project.id);
                    }
                  </div>
                </div>
                )
              )
              : <p>Create a Project!</p>
          }
          
        </div>
        <div className="tutorial">
          <p>Press the ‘spacebar’ key to generate a new palette</p>
        </div>
      </div>
    )
  }
}
