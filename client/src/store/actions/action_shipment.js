import { localAuth } from "../../helper/authentcate";

export const CREATE_QUOTE_START = "CREATE_QUOTE_START";
export const CREATE_QUOTE_SUCCESS = "CREATE_QUOTE_SUCCESS";
export const CREATE_QUOTE_FAILED = "CREATE_QUOTE_FAILED";
export const GET_SHIPMENT_START = "GET_SHIPMENT_START";
export const GET_SHIPMENT_SUCCESS = "GET_SHIPMENT_SUCCESS";
export const GET_SHIPMENT_FAILED = "GET_SHIPMENT_FAILED";
export const GET_SHIPMENTS_START = "GET-SHIPMENT_START";
export const GET_SHIPMENTS_SUCCESS = "GET_SHIPMENTS_SUCCESS";
export const GET_SHIPMENTS_FAILED = "GET_SHIPMENTS_FAILED";
export const SHIPMENT_DELIVERED_START = "SHIPMENT_DELIVERED_START";
export const SHIPMENT_DELIVERED_SUCCESS = "SHIPMENT_DELIVERED_SUCCESS";
export const SHIPMENT_DELIVERED_FAILED = "SHIPMENT_DELIVERED_FAILED";
export const SHIPMENT_DELETE_START = "SHIPMENT_DELETE-START";
export const SHIPMENT_DELETE_SUCCESS = "SHIPMENT_DELETE_SUCCESS";
export const SHIPMENT_DELETE_FAILED = "SHIPMENT_DELETE_FAILED";
export const VIEW_START = "VIEW_START";
export const VIEW_SUCCESS = "VIEW_SUCCESS";
export const VIEW_FAILED = "VIEW_FAILED";

export const createStart = () => {
  return {
    type: CREATE_QUOTE_START
  }
}

export const createSuccess = (data) => {
  return {
    type: CREATE_QUOTE_SUCCESS,
    data
  }
}

export const createFailed = (error) => {
  return {
    type: CREATE_QUOTE_FAILED,
    error
  }
}

export const requestShipment = (data) => {
  return dispatch => {
    createStart();
    fetch(`/v1/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(createFailed(resp.error));
        dispatch(createSuccess(resp));
      })
      .catch(err =>{
        return dispatch(createFailed(`Request failed. ${err.message}`));
      });
  }
}

export const getShipmentStart = () => {
  return {
    type: GET_SHIPMENT_START
  }
}

export const getShipmentSuccess = (data) => {
  return {
    type: GET_SHIPMENT_SUCCESS,
    data
  }
}

export const getShipmentFailed = (error) => {
  return {
    type: GET_SHIPMENT_FAILED,
    error
  }
}

export const getShipment = (quoteId) => {
  return dispatch => {
    dispatch(getShipmentStart());
    fetch(`/v1/single/${quoteId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": localAuth().token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getShipmentFailed(resp.error));
        dispatch(getShipmentSuccess(resp));
      })
      .catch(err => {
        dispatch(getShipmentFailed(`Request failed. ${err.message}`));
      });
  }
}

export const viewStart = () => {
  return {
    type: VIEW_START
  }
}

export const viewSuccess = (data) => {
  return {
    type: VIEW_SUCCESS,
    data
  }
}

export const viewFailed = (error) => {
  return {
    type: VIEW_FAILED,
    error
  }
}

export const view = (shippingId) => {
  return dispatch => {
    dispatch(viewStart());
    fetch(`/v1/quote/${shippingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": localAuth().token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(viewFailed(resp.error));
        dispatch(viewSuccess(resp));
      })
      .catch(err => {
        dispatch(viewFailed(`${err.message}`));
      });
  }
}
export const getShipmentsStart = () => {
  return {
    type: GET_SHIPMENTS_START
  }
}

export const getShipmentsSuccess = (data) => {
  return {
    type: GET_SHIPMENTS_SUCCESS,
    data
  }
}

export const getShipmentsFailed = (error) => {
  return {
    type: GET_SHIPMENTS_FAILED,
    error
  }
}

export const getShipments = () => {
  return dispatch => {
    dispatch(getShipmentsStart());
    fetch(`/v1/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": localAuth().token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getShipmentsFailed(resp.error));
        dispatch(getShipmentsSuccess(resp));
      })
      .catch(err => {
        dispatch(getShipmentsFailed(`Request failed. ${err.message}`));
      });
  }
}

export const shipmentDeliveredStart = () => {
  return {
    type: SHIPMENT_DELIVERED_START
  }
}

export const shipmentDeliveredSuccess = (data) => {
  return {
    type: SHIPMENT_DELIVERED_SUCCESS,
    data
  }
}

export const shipmentDeliveredFailed = (error) => {
  return {
    type: SHIPMENT_DELIVERED_FAILED,
    error
  }
}

export const shipmentDelivered = (shipmentId) => {
  return dispatch => {
    dispatch(shipmentDeliveredStart());
    fetch(`/v1/quote/${shipmentId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": localAuth().token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(shipmentDeliveredFailed(resp.error));
        dispatch(shipmentDeliveredSuccess(resp));
      })
      .then(() => {
        dispatch(getShipment(shipmentId));
      })
      .catch(err => {
        dispatch(shipmentDeliveredFailed(`Request failed. ${err.mesage}`));
      });
  }
}

export const shipmentDeletedStart = () => {
  return {
    type: SHIPMENT_DELETE_START
  }
}

export const shipmentDeletedSuccess = (data) => {
  return {
    type: SHIPMENT_DELETE_SUCCESS,
    data
  }
}

export const shipmentDeletedFailed = (error) => {
  return {
    type: SHIPMENT_DELETE_FAILED,
    error
  }
}

export const shipmentDelete = (shipmentId) => {
  return dispatch => {
    dispatch(shipmentDeletedStart());
    fetch(`/v1/quote/${shipmentId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": localAuth().token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(shipmentDeletedFailed(resp.error));
        dispatch(shipmentDeletedSuccess(resp));
      })
      .then(() => {
        dispatch(getShipments());
      })
      .catch(err => {
        dispatch(shipmentDeletedFailed(err.mesage));
      });
  }
}