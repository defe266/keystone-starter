import {createReducer as creatorFormReducer} from 'client/lib/Form'
import { combineReducers } from 'redux'


const forms = combineReducers({

  CONTACT: creatorFormReducer('CONTACT', {
    values: {
      name: '',
      email: '',
      subject: '',
      message: '',
      polPrivacy: false,
    }
  }),

})

export default forms
