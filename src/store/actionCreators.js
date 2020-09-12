import { LOGOUT, GETCATEGORY } from './actionTypes'
import { GetCategoryAll } from '../api/info'
export const Logout = () => ({
  type: LOGOUT
})

const createCategoryAll = (value) => ({
  type: GETCATEGORY,
  value
})

export const getCategory = (requestData) => {
  return dispatch => {
    GetCategoryAll(requestData).then(res => {
      let result = res.data;
      if (result.resCode === 0) {
        dispatch(createCategoryAll(result.data))
      }
    })
  }
}