import {
  CREATE_QUOTE_START,
  CREATE_QUOTE_SUCCESS,
  CREATE_QUOTE_FAILED,
  GET_SHIPMENT_START,
  GET_SHIPMENT_SUCCESS,
  GET_SHIPMENT_FAILED,
  GET_SHIPMENTS_START,
  GET_SHIPMENTS_SUCCESS,
  GET_SHIPMENTS_FAILED,
  SHIPMENT_DELIVERED_START,
  SHIPMENT_DELIVERED_SUCCESS,
  SHIPMENT_DELIVERED_FAILED,
  SHIPMENT_DELETE_START,
  SHIPMENT_DELETE_SUCCESS,
  SHIPMENT_DELETE_FAILED,
} from "../actions/action_shipment";

const initialState = {
  shipments: [],
  shipment: {},
  createLoading: false,
  createSuccess: false,
  getLoading: false,
  getSuccess: false,
  deliverLoading: false,
  deliverSuccess: false,
  deleteLoading: false,
  deleteSuccess: false,
  error: ""
}

export const shipment = (state=initialState, action) => {
  switch(action.type) {
    case CREATE_QUOTE_START:
      return {
        ...state,
        createLoading: true
      }
    case CREATE_QUOTE_SUCCESS:
      return {
        ...state,
        createLoading: false,
        createSuccess: true,
        shipments: state.shipments.concat(action.data),
      }
    case CREATE_QUOTE_FAILED:
      return {
        ...state,
        createLoading: false,
        createSuccess: false,
        error: action.error
      }
    case GET_SHIPMENT_START:
      return {
        ...state,
        getLoading: true,
      }
    case GET_SHIPMENT_SUCCESS:
      return {
        ...state,
        getLoading: false,
        getSuccess: true,
        shipment: action.data,
      }
    case GET_SHIPMENT_FAILED:
      return {
        ...state,
        getLoading: false,
        getSuccess: false,
        error: action.error
      }
    case GET_SHIPMENTS_START:
      return {
        ...state,
        getLoading: false
      }
    case GET_SHIPMENTS_SUCCESS:
      return {
        ...state,
        getLoading: false,
        getSuccess: true,
        shipments: action.data
      }
    case GET_SHIPMENTS_FAILED:
      return {
        ...state,
        getLoading: false,
        getSuccess: false,
        error: action.error
      }
    case SHIPMENT_DELIVERED_START:
      return {
        ...state,
        deliverLoading: true
      }
    case SHIPMENT_DELIVERED_SUCCESS:
      return {
        ...state,
        deliverLoading: false,
        deliverSuccess: true,
        shipment: action.data,
      }
    case SHIPMENT_DELIVERED_FAILED:
      return {
        ...state,
        deliverLoading: false,
        deliverSuccess: false,
        error: action.error
      }
    case SHIPMENT_DELETE_START:
      return {
        ...state,
        deleteLoading: true,
        deleteSuccess: false
      }
    case SHIPMENT_DELETE_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: true,
        shipment: action.data,
      }
    case SHIPMENT_DELETE_FAILED:
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