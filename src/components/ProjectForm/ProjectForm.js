import React from 'react';

export const ProjectForm = (props) => {

  return (

    <form id="projects" onSubmit={props.handleSubmit} autoComplete="off">
      <label htmlFor="projectTitle">Create a Project:</label>
      <div>
        <input  onChange={props.handleChange} 
                id="projectTitle" 
                value={props.projectTitle} 
                type="text" 
                placeholder={props.projectError || "ex. Home Decor.."}>
        </input>
        <input className="submit-btn" type="submit"></input>
      </div>
    </form>

  )
}