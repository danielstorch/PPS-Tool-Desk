import { CLOSE_OPEN_NAV_LEFT, SET_CURRENT_PAGE } from '../actions/PPSToolActions'

const initialState = {
    NavBarOpen: false,
    CurrentPage: 'Home'
  }

  

export default function NavigationReducer(state = initialState, action) {
  switch (action.type) {
    case CLOSE_OPEN_NAV_LEFT:
      return Object.assign({}, state, {
          NavBarOpen : state.trueOrFalseValue
        });
    case SET_CURRENT_PAGE:
      return Object.assign({}, state, {
          CurrentPage : action.newPage
        });
    default:
      return state
  }
}