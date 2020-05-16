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
  VIEW_START,
  VIEW_SUCCESS,
  VIEW_FAILED,
  APPROVE_START,
  APPROVE_SUCCESS,
  APPROVE_FAILED,
  CHANGE_STATUS_START,
  CHANGE_STATUS_SUCCESS,
  CHANGE_STATUS_FAILED,
  CURRENT_MONTH_SALE_START,
  CURRENT_MONTH_SALE_SUCCESS,
  CURRENT_MONTH_SALE_FAILED,
  SEARCH_START,
  SEARCH_SUCCESS,
  SEARCH_FAILED,
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
  viewLoading: false,
  viewSuccess: false,
  approveLoading: false,
  approveSuccess: false,
  statusLoading: false,
  statusSuccess: false,
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
    case SEARCH_START:
      return {
        ...state,
        getLoading: true
      }
    case SEARCH_SUCCESS:
      return {
        ...state,
        getLoading: false,
        getSuccess: true,
        shipments: action.data,
      }
    case SEARCH_FAILED:
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
    case VIEW_START:
      return {
        ...state,
        viewLoading: true,
      }
    case VIEW_SUCCESS:
      return {
        ...state,
        viewLoading: false,
        viewSuccess: true,
        shipment: action.data,
      }
    case VIEW_FAILED:
      return {
        ...state,
        viewLoading: true,
        viewSuccess: false,
        error: action.error
      }
    case APPROVE_START:
      return {
        ...state,
        approveLoading: true
      }
    case APPROVE_SUCCESS:
      return {
        ...state,
        approveLoading: false,
        approveSuccess: true,
        shipment: action.data,
      }
    case APPROVE_FAILED:
      return {
        ...state,
        approveLoading: false,
        approveSuccess: false,
        error: action.error
      }
    case CHANGE_STATUS_START:
      return {
        ...state,
        statusLoading: true
      }
    case CHANGE_STATUS_SUCCESS:
      return {
        ...state,
        statusLoading: false,
        statusSuccess: true,
        shipment: action.data,
      }
    case CHANGE_STATUS_FAILED:
      return {
        ...state,
        statusLoading: false,
        statusSuccess: false,
        error: action.error
      }
    case CURRENT_MONTH_SALE_START:
      return {
        ...state,
        getLodaing: true
      }
    case CURRENT_MONTH_SALE_SUCCESS:
      return {
        ...state,
        getLodaing: false,
        getSuccess: true,
        shipment: action.data,
      }
    case CURRENT_MONTH_SALE_FAILED:
      return {
        ...state,
        getLodaing: false,
        getSuccess: false,
        error: action.error
      }
    default:
      return state;
  }
}