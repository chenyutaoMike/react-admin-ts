import { GETCATEGORY } from '../actionTypes'
let info = {
  categoryList: []
}

export default (state = info, action) => {
  switch (action.type) {
    case GETCATEGORY:
      console.log('change')
      console.log(action.value)
      return Object.assign(state, {
        categoryList: action.value
      })
    default:
      return state
  }
}