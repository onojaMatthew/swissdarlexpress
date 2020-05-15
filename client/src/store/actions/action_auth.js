export const SEND_EMAIL_START = "SEND_EMAIL_START";
export const SEND_EMAIL_SUCCESS = "SEND_EMAIL_SUCCESS";
export const SEND_EMAIL_FAILED = "SEND_EMAIL_FAILED";
export const CHANGE_PASSWORD_START = "CHANGE_PASSWORD_START";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_FAILED = "CHANGE_PASSWORD_FAILED";

export const sendEmailStart = () => {
  return {
    type: SEND_EMAIL_START
  }
}

export const sendEmailSuccess = (data) => {
  return {
    type: SEND_EMAIL_SUCCESS,
    data
  }
}

export const sendEmailFailed = (error) => {
  return {
    type: SEND_EMAIL_FAILED,
    error
  }
}

export const sendEmail = (data) => {
  return dispatch => {
    dispatch(sendEmailStart());
    fetch(`/v1/auth/recover`, {
      method: "PUT",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(sendEmailFailed(resp.error));
        dispatch(sendEmailSuccess(resp));
      })
      .catch(err => {
        dispatch(sendEmailFailed(err.message));
      });
  }
}

export const changePasswordStart = () => {
  return {
    type: CHANGE_PASSWORD_START
  }
}

export const changePasswordSuccess = (data) => {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    data
  }
}

export const changePasswordFailed = (error) => {
  return {
    type: CHANGE_PASSWORD_FAILED,
    error
  }
}

export const changePassword = (data) => {
  return dispatch => {
    dispatch(changePasswordStart());
    fetch("/v1/auth/reset_password", {
      method: "PUT",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(sendEmailFailed(resp.error));
        dispatch(sendEmailSuccess(resp));
      })
      .catch(err => {
        dispatch(sendEmailFailed(err.message));
      });
  }
}