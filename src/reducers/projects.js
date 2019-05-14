 export const project = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PROJECT':
      return  [...state, {name: action.name, palettes: action.palette }]
    case 'ADD_PALETTE':
      let project = state.find(project => project.name == action.id)
      project.palettes.push({name: action.name, id: action.id, colors: action.palette})
      return state;
    default:
      return state;
  }
}