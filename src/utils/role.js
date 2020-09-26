import WebStorageES6 from 'web-storage-es6'

let localStorage = new WebStorageES6('Local')
const role = 'role'

export function setRole(val) {
  return localStorage.put(role, val)
}

export function getRole() {
  return localStorage.get(role)
}

export function removeRole() {
  return localStorage.forget(role)
}