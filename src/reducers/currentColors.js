export const currentColors = (state = [], action) => {
  switch (action.type) {
    case 'CURR_COLORS':
      return action.colors
    default:
      return state
  }
}