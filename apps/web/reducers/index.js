import ready from './ready'
import positions from './positions'
import layout from './layout'
import page from './page'
import menus from './menus'
import forms from './forms'

import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import {i18nState} from "redux-i18n"

const rootReducer = combineReducers({
  ready,
  positions,
  menus,
  layout,
  page,
  forms,
  routing,
  i18nState
})

export default rootReducer