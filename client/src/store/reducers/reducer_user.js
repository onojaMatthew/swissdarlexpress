import {
  REGISTRATION_START,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_START,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  GET_USER_START,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  GET_USERS_START,
  GET_USERS_SUCCESS,
  GET_USERS_FAILED,
  UPLOAD_PHOTO_START,
  UPLOAD_PHOTO_SUCCESS,
  UPLOAD_PHOTO_FAILED,
  DELETE_USER_START,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
  ASSIGN_ROLE_START,
  ASSIGN_ROLE_SUCCESS,
  ASSIGN_ROLE_FAILED,
} from "../actions/action_user";

const initialState = {
  users: [],
  user: {},
  registerLoading: false,
  registerSuccess: false,
  logingLoading: false,
  logingSuccess: false,
  getLoading: false,
  getSuccess: false,
  deleteLoading: false,
  deleteSuccess: false,
  uploadLoading: false,
  uploadSuccess: false,
  logoutLoading: false,
  logoutSuccess: false,
  roleLoading: false,
  roleSuccess: false,
  error: ""
}


export const users = (state=initialState, action) => {
  switch(action.type) {
    case REGISTRATION_START:
      return {
        ...state,
        registerLoading: true,
      }
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        registerLoading: false,
        registerSuccess: true,
        users: state.users.concat(action.data),
      }
    case REGISTRATION_FAILED:
      return {
        ...state,
        registerLoading: false,
        registerSuccess: false,
        error: action.error
      }
    case LOGIN_START:
      return {
        ...state,
        loginLoading: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        loginSuccess: true,
        user: action.data,
      }
    case LOGIN_FAILED:
      return {
        ...state,
        loginLoading: false,
        loginSuccess: false,
        error: action.error
      }
    case LOGOUT_START:
      return {
        ...state,
        logoutLoading: true
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        logoutLoading: false,
        logoutSuccess: true,        
        user: action.data,
      }
    case LOGOUT_FAILED:
      return {
        ...state,
        logoutLoading: false,
        logoutSuccess: false,        
        error: action.error
      }
    case GET_USER_START:
      return {
        ...state,
        getLoading: true,
        
      }
    case GET_USER_SUCCESS:
      return {
        ...state,
        getLoading: false,
        getSuccess: true,
        users: action.data,
      }
    case GET_USER_FAILED:
      return {
        ...state,
        getLoading: false,
        getSuccess: false,
        error: action.error
      }
    case GET_USERS_START:
      return {
        ...state,
        getLoading: true
      }
    case GET_USERS_SUCCESS:
      return {
        ...state,
        getLoading: false,
        getSuccess: true,
        users: action.data
      }
    case GET_USERS_FAILED:
      return {
        ...state,
        getLoading: false,
        getSuccess: false,
        error: action.error
      }
    case UPLOAD_PHOTO_START:
      return {
        ...state,
        uploadLoading: true
      }
    case UPLOAD_PHOTO_SUCCESS:
      return {
        ...state,
        uploadLoading: false,
        uploadSuccess: true,
        users: action.data,
      }
    case UPLOAD_PHOTO_FAILED:
      return {
        ...state,
        uploadLoading: false,
        uploadSuccess: false,
        error: action.error
      }
    case DELETE_USER_START:
      return {
        ...state,
        deleteLoading: true
      }
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: true,
        users: action.data,
      }
    case DELETE_USER_FAILED:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: false,
        error: action.error
      }
    case ASSIGN_ROLE_START:
      return {
        ...state,
        roleLoading: true,
      }
    case ASSIGN_ROLE_SUCCESS:
      return {
        ...state,
        roleLoading: false,
        roleSuccess: true,
        user: action.data,
      }
    case ASSIGN_ROLE_FAILED:
      return {
        ...state,
        roleLoading: false,
        roleSuccess: false,
        error: action.error
      }
    default:
      return state
  }
}

