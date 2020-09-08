import cookie from "cookies-js";

const adminToKen = 'admin_token';
const usernameKey = 'username';
export function getToken() {
  return cookie.get(adminToKen)
}

export function setToken(token) {
  return cookie.set(adminToKen, token)
}

export function removeToken() {
  return cookie.expire(adminToKen)
}

export function setUserName(value) {
  return cookie.set(usernameKey, value)
}

export function getUserName() {
  return cookie.get(usernameKey)
}
export function removeUserName(){
  return cookie.expire(usernameKey)
}

