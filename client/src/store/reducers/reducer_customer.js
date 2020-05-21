import {
  DELETE_START,
  DELETE_SUCCESS,
  DELETE_FAILED,
  GET_START,
  GET_SUCCESS,
  GET_FAILED,
} from "../actions/action_customer";

const initialState = {
  customers: [],
  customer: {},
  loading: false,
  success: false,
  error: ""
}

export const customer = (state=initialState, action) => {
  switch(action.type) {
    case DELETE_START:
      return {
        ...state,
        loading: true
      }
    case DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        customer: action.data
      }
    case DELETE_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case GET_START:
      return {
        ...state,
        loading: true
      }
    case GET_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        customers: action.data,
      }
    case GET_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    default:
      return state;
  }
}