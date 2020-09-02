import { setToken, setUserName, getToken, getUserName } from '../utils/app';
import { LOGIN } from './actionTypes';
let login = {
  username: getUserName() || '',
  token: getToken() || ''
}

export default (state = login, action) => {
  switch (action.type) {
    case LOGIN:
      // 设置token
      setToken(action.value.token)
      // 设置username
      setUserName(action.value.username)
      return Object.assign(state, {
        username: getUserName(),
        token: getToken()
      })
    default:
      return state
  }
  return state
}