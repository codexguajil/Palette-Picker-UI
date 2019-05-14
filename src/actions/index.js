export const addPalette = (palette, id, name) => ({
  type: 'ADD_PALETTE',
  palette,
  id,
  name
})

export const addProject = (name, palette) => ({
  type: 'ADD_PROJECT',
  name,
  palette: [],
})

export const currentColors = (colors) => ({
  type: 'CURR_COLORS',
  colors
})