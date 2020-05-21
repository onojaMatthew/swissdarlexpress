import {
  REPORT_START,
  REPORT_SUCCESS,
  REPORT_FAILED,
  DELETE_START,
  DELETE_SUCCESS,
  DELETE_FAILED,
  GET_START,
  GET_SUCCESS,
  GET_FAILED,
} from "../actions/action_report";

const initialState = {
  reports: [],
  report: {},
  loading: false,
  success: false,
  getLoading: false,
  getSuccess: false,
  deleteLoading: false,
  deleteSuccess: false,
  error: ""
}

export const report = (state=initialState, action) => {
  switch(action.type) {
    case REPORT_START:
      return {
        ...state,
        loading: true,
      }
    case REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        reports: state.reports.concat(action.data),
      }
    case REPORT_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case DELETE_START:
      return {
        ...state,
        deleteLoading: true
      }
    case DELETE_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: true,
        report: action.data
      }
    case DELETE_FAILED:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: false,
        error: action.error
      }
    case GET_START:
      return {
        ...state,
        getLoading: true
      }
    case GET_SUCCESS:
      return {
        ...state,
        getLoading: false,
        getSuccess: true,
        reports: action.data,
      }
    case GET_FAILED:
      return {
        ...state,
        getLoading: false,
        getSuccess: false,
        error: action.error
      }
    default:
      return state;
  }
}