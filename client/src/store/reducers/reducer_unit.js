import {
  UNIT_START,
  UNIT_SUCCESS,
  UNIT_FAILED,
  GET_UNIT_START,
  GET_UNIT_SUCCESS,
  GET_UNIT_FAILED,
  UPDATE_UNIT_START,
  UPDATE_UNIT_SUCCESS,
  UPDATE_UNIT_FAILED,
  DELETE_UNIT_START,
  DELETE_UNIT_SUCCESS,
  DELETE_UNIT_FAILED,
} from "../actions/action_units";

const initialState = {
  units: [],
  unit: {},
  loading: false,
  success: false,
  getLoading: false,
  getSuccess: false,
  deleteLoading: false,
  deleteSuccess: false,
  updateLoading: false,
  updateSuccess: false,
  error: ""
}

export const units = (state=initialState, action) => {
  switch(action.type) {
    case UNIT_START:
      return {
        ...state,
        loading: true,
      }
    case UNIT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        units: state.units.concat(action.data),
      }
    case UNIT_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case GET_UNIT_START:
      return {
        ...state,
        getLoading: true
      }
    case GET_UNIT_SUCCESS:
      return {
        ...state,
        getLoading: false,
        getSuccess: true,
        units: action.data,
      }
    case GET_UNIT_FAILED:
      return {
        ...state,
        getLoading: false,
        getSuccess: false,
        error: action.error
      }
    case UPDATE_UNIT_START:
      return {
        ...state,
        updateLoading: true,
        
      }
    case UPDATE_UNIT_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: true,
        unit: action.data,
      }
    case UPDATE_UNIT_FAILED:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: false,
        error: action.error
      }
    case DELETE_UNIT_START:
      return {
        ...state,
        deleteLoading: true
      }
    case DELETE_UNIT_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: true,
        unit: action.data
      }
    case DELETE_UNIT_FAILED:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: false,
        error: action.error
      }
    default: 
      return state;
  }
}