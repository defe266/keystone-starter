import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

import categories from './categories'
import category from './category'
import products from './products'

export default combineReducers({
  category,
  categories,
  products
})