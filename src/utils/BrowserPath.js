
import WebStorageES6 from 'web-storage-es6'

let localStorage = new WebStorageES6('Local')
const defaultpath = 'BrowserPath'
const defaultMenu = 'Menu'
export function getPath() {
  return localStorage.get(defaultpath)
}

export function setPath(value) {
  return localStorage.put(defaultpath, value)
}

export function getMenu() {
  return localStorage.get(defaultMenu)
}

export function setMenu(value) {
  return localStorage.put(defaultMenu, value)
}


