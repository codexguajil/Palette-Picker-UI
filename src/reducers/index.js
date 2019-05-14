import {combineReducers} from 'redux'
import {project} from './projects'
import {palettes} from './palettes'
import {currentColors} from './currentColors'

export const rootReducer = combineReducers({
  currentColors,
  project,
  palettes
})