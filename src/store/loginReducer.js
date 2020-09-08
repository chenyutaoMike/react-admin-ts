import {  getToken, getUserName, removeToken, removeUserName } from '../utils/app';
import { LOGOUT } from './actionTypes';
import {message} from 'antd'
let login = {
  username: getUserName() || '',
  token: getToken() || ''
}

export default (state = login, action) => {
  switch (action.type) {
    case LOGOUT:
      removeToken()
      removeUserName()
      let newState = JSON.parse(JSON.stringify(state))
      newState.username = '';
      newState.token = '';
      message.success('退出成功')
      
      return newState
    default:
      return state
  }
}