import { localAuth } from "../../helper/authentcate";

export const UNIT_START = "UNIT_START";
export const UNIT_SUCCESS = "UNIT_SUCCESS";
export const UNIT_FAILED = "UNIT_FAILED";
export const GET_UNIT_START = "GET_UNIT_START";
export const GET_UNIT_SUCCESS = "GET_UNIT_SUCCESS";
export const GET_UNIT_FAILED = "GET_UNIT_FAILED";
export const UPDATE_UNIT_START = "UPDATE_UNIT_START";
export const UPDATE_UNIT_SUCCESS = "UPDATE_UNIT_SUCCESS";
export const UPDATE_UNIT_FAILED = "UPDATE_UNIT_FAILED";
export const DELETE_UNIT_START = "DELETE_UNIT_START";
export const DELETE_UNIT_SUCCESS = "DELETE_UNIT_SUCCESS";
export const DELETE_UNIT_FAILED = "DELETE_UNIT_FAILED";

export const unitStart = () => {
  return {
    type: UNIT_START
  }
}

export const unitSuccess = (data) => {
  return {
    type: UNIT_SUCCESS,
    data
  }
}

export const unitFailed = (error) => {
  return {
    type: UNIT_FAILED,
    error
  }
}

export const createUnit = (data) => {
  const userId = localAuth().user && localAuth().user._id;
  const role = localAuth().user && localAuth().user.role;
  return dispatch => {
    dispatch(unitStart());
    fetch(`/v1/unit/${userId}/${role}`, {
      method: "POST",
      headers: {
        ACCEPT: 'application/json',
        "Content-Type": "application/json",
        "x-auth-token": localAuth().token
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(unitFailed(resp.error));
        dispatch(unitSuccess(resp));
      })
      .then(() => {
        dispatch(getUnit());
      })
      .catch(err => {
        return dispatch(unitFailed(err.message));
      });
  }
}

export const getUnitStart = () => {
  return {
    type: GET_UNIT_START
  }
}

export const getUnitSuccess = (data) => {
  return {
    type: GET_UNIT_SUCCESS,
    data
  }
}

export const getUnitFailed = (error) => {
  return {
    type: GET_UNIT_FAILED,
    error
  }
}

export const getUnit = () => {
  return dispatch => {
    dispatch(getUnitStart());
    fetch(`/v1/unit`, {
      method: "GET",
      headers: {
        ACCEPT: "application/json",
        "Content-type": "application/json"
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getUnitFailed(resp.error));
        dispatch(getUnitSuccess(resp));
      })
      .catch(err => {
        return dispatch(getUnitFailed(err.message));
      });
  }
}

export const updateStart = () => {
  return {
    type: UPDATE_UNIT_START
  }
}

export const updateSuccess = (data) => {
  return {
    type: UPDATE_UNIT_SUCCESS,
    data
  }
}

export const updateFailed = (error) => {
  return {
    type: UPDATE_UNIT_FAILED,
    error
  }
}

export const updateUnit = (id, data) => {
  console.log(id, data, " from action")
  const role = localAuth().user && localAuth().user.role;
  return dispatch => {
    dispatch(updateStart());
    fetch(`/v1/unit/${role}/${id}`, {
      method: "PUT",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": localAuth().token
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(updateFailed(resp.error));
        dispatch(updateSuccess(resp));
      })
      .then(() => {
        dispatch(getUnit());
      })
      .catch(err => {
        return dispatch(updateFailed(err.message));
      });
  }
}

export const deleteUnitStart = () => {
  return {
    type: DELETE_UNIT_START
  }
}

export const deleteUnitSuccess = (data) => {
  return {
    type: DELETE_UNIT_SUCCESS,
    data
  }
}

export const deleteUnitFailed = (error) => {
  return {
    type: DELETE_UNIT_FAILED,
    error
  }
}

export const deleteUnit = (id) => {
  const role = localAuth().user && localAuth().user.role;
  return dispatch => {
    dispatch(deleteUnitStart());
    fetch(`/v1/unit/${role}/${id}`, {
      method: 'DELETE',
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": localAuth().token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(deleteUnitFailed(resp.error));
        dispatch(deleteUnitSuccess(resp));
      })
      .then(() => {
        dispatch(getUnit());
      })
      .catch(err => {
        return dispatch(deleteUnitFailed(err.message));
      });
  }
}