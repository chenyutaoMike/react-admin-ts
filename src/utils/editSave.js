
import WebStorageES6 from 'web-storage-es6'

let localStorage = new WebStorageES6('Local')
const editDetailData = 'editDetailData'

export function getEditDetailData() {
  return localStorage.get(editDetailData)
}

export function saveEditDetailData(val) {

  return localStorage.put(editDetailData, val)
}

export function removeEditDetailData() {
  return localStorage.forget(editDetailData)
}