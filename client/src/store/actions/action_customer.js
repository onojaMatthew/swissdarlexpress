import { localAuth } from "../../helper/authentcate";

export const DELETE_START = "DELETE_START";
export const DELETE_SUCCESS = "DELETE_SUCCESS";
export const DELETE_FAILED = "DELETE_FAILED";
export const GET_START = "GET_START";
export const GET_SUCCESS = "GET_SUCCESS";
export const GET_FAILED = "GET_FAILED";


export const deleteStart = () => {
  return {
    type: DELETE_START
  }
}

export const deleteSuccess = (data) => {
  return {
    type: DELETE_SUCCESS,
    data
  }
}

export const deleteFailed = (error) => {
  return {
    type: DELETE_FAILED,
    error
  }
}

export const deleteCustomer = (customerId) => {
  return dispatch => {
    dispatch(deleteStart());
    fetch(`/v1/customer/delete/${customerId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": localAuth().token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(deleteFailed(resp.error));
        dispatch(deleteSuccess(resp));
      })
      .catch(err => {
        return dispatch(deleteFailed(err.message));
      });
  }
}

export const getStart = () => {
  return {
    type: GET_START
  }
}

export const getSuccess = (data) => {
  return {
    type: GET_SUCCESS,
    data
  }
}

export const getFailed = (error) => {
  return {
    type: GET_FAILED,
    error
  }
}

export const getCustomer = () => {
  return dispatch => {
    dispatch(getStart());
    fetch(`/v1/customer`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": localAuth().token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getFailed(resp.error));
        dispatch(getSuccess(resp));
      })
      .catch(err => {
        return dispatch(getFailed(err.message));
      });
  }
}