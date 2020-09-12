import { combineReducers } from 'redux';
import login from './model/loginReducer'
import info from './model/infoReducer'

export default combineReducers({
  login,
  info
})
