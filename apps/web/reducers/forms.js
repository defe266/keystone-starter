import creatorFormReducer from '../lib/creatorFormReducer'
import { combineReducers } from 'redux'


const forms = combineReducers({

  CONTACT: creatorFormReducer('CONTACT', {
    data: {
      name: '',
      email: '',
      subject: '',
      message: '',
    }
  }),

})

export default forms
