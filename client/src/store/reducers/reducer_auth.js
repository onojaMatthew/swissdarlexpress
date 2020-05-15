import {
  SEND_EMAIL_START,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILED,
  CHANGE_PASSWORD_START,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED,
} from "../actions/action_auth";

const initialState = {
  auth: {},
  loading: false,
  success: false,
  error: ""
}

export const auth = (state=initialState, action) => {
  switch(action.type) {
    case SEND_EMAIL_START:
      return {
        ...state,
        loading: true,
      }
    case SEND_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        auth: action.data,
      }
    case SEND_EMAIL_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case CHANGE_PASSWORD_START:
      return {
        ...state,
        loading: true,
      }
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        auth: action.data,
      }
    case CHANGE_PASSWORD_FAILED:
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