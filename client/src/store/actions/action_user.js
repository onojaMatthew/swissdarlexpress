import Auth from "../../helper/Auth"
import { localAuth } from "../../helper/authentcate";

export const REGISTRATION_START = "REGISTRATION_START";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAILED = "REGISTRATION_FAILED";
export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGOUT_START = "LOGOUT_START";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";
export const GET_USER_START = "GET-USER_START";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";
export const GET_USERS_START = "GET_USERS_START";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAILED = "GET_USERS_FAILED";
export const UPLOAD_PHOTO_START = "UPLOAD_PHOTO-START";
export const UPLOAD_PHOTO_SUCCESS = "UPLOAD_PHOTO_SUCCESS";
export const UPLOAD_PHOTO_FAILED = 'UPLOAD_PHOTO_FAILED';
export const DELETE_USER_START = "DELETE_USER_SART";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILED = "DELETE_USER_FAILED";
export const ASSIGN_ROLE_START = "ASSIGN_ROLE_START";
export const ASSIGN_ROLE_SUCCESS = "ASSIGN_ROLE_SUCCESS";
export const ASSIGN_ROLE_FAILED = "ASSIGN_ROLE_FAILED";

const BASE_URL = process.env.REACT_APP_API_URL;
 
/**
 * Handles account logout
 */
export const logoutStart = () => {
  return {
    type: LOGIN_START
  }
}

export const logoutSuccess = ( data ) => {
  return {
    type: LOGOUT_SUCCESS,
    data
  }
}

export const logoutFailed = ( error ) => {
  return {
    type: LOGOUT_FAILED,
    error
  }
}

export const logout = () => {
  return dispatch => {
    dispatch( logoutStart() );
    fetch( `${BASE_URL}/logout`, {
      method: "GET",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json"
      }
    } )
      .then( response => response.json() )
      .then( resp => {
        dispatch( logoutSuccess( resp ) );
      } )
      .catch( err => {
        dispatch( logoutFailed( err.message ) );
      } );
  }
}

/**
 * Action types for agent registration
 */
export const registrationStart = () => {
  return {
    type: REGISTRATION_START
  }
}

export const registrationSuccess = ( data ) => {
  return {
    type: REGISTRATION_SUCCESS,
    data
  }
}

export const registrationFailed = ( error ) => {
  return {
    type: REGISTRATION_FAILED,
    error
  }
}

/**
 * Action creator for agent registration
 * @param {data} data of the person registering
 */
export const register = ( data ) => {
  return dispatch => {
    dispatch( registrationStart() );
    fetch( `${BASE_URL}/user`, {
      method: "POST",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify( data )
    } )
      .then( response => response.json() )
      .then( resp => {
        if ( resp.error ) return dispatch( registrationFailed(resp.error));
        dispatch( registrationSuccess( resp ) );
      } )
      .catch( err => {
        dispatch( registrationFailed( `Request failed. ${err.message}`));
      } );
  }
}

/**
 * Action types for agent login
 */

export const loginStart = () => {
  return {
    type: LOGIN_START
  }
}

export const loginSuccess = ( data ) => {
 return {
   type: LOGIN_SUCCESS,
   data
 }
}

export const loginFailed = ( error ) => {
 return {
   type: LOGIN_FAILED,
   error
 }
}

/**
* Action creator for agents login
*/

export const onLogin = ( data ) =>{
 return dispatch => {
   dispatch( loginStart() );
   fetch( `${BASE_URL}/login`, {
     method: "POST",
     headers: {
       ACCEPT: "application/json",
       "Content-Type": "application/json"
     },
     body: JSON.stringify( data )
   } )
     .then( response => response.json())
     .then( resp => {
       if ( resp.error ) {
         dispatch( loginFailed( resp.error ));
         return;
       }
       dispatch( loginSuccess( resp ));
       Auth.authenticateUser( JSON.stringify( resp ));
     })
     .catch( err => {
       dispatch( loginFailed(err.message) );
     });
 }  
}

export const getUserStart = () => {
  return {
    type: GET_USER_START
  }
}

export const getUserSuccess = (data) => {
  return {
    type: GET_USER_SUCCESS,
    data
  }
}

export const getUserFailed = (error) => {
  return {
    type: GET_USER_FAILED,
    error
  }
}

export const getUser = (userId) => {
  return dispatch => {
    dispatch(getUserStart());
    fetch(`${BASE_URL}/user/:${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": localAuth().token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getUserFailed(resp.error));
        dispatch(getUserSuccess(resp));
      })
      .catch(err => {
        dispatch(getUserFailed(`Request failed. ${err.message}`));
      });
  }
}

export const getUsersStart = () => {
  return {
    type: GET_USERS_START
  }
}

export const getUsersSuccess = (data) => {
  return {
    type: GET_USERS_SUCCESS,
    data
  }
}

export const getUsersFailed = (error) => {
  return {
    type: GET_USERS_FAILED,
    error
  }
}

export const getUsers = () => {
  return dispatch => {
    dispatch(getUsersStart());
    fetch(`${BASE_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": localAuth().token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(getUsersFailed(resp.error));
        dispatch(getUsersSuccess(resp));
      })
      .catch(err => {
        dispatch(getUsersFailed(`Request failed. ${err.message}`));
      });
  }
}

export const deleteUserStart = () => {
  return {
    type: DELETE_USER_START
  }
}

export const deleteUserSuccess = (data) => {
  return {
    type: DELETE_USER_SUCCESS,
    data
  }
}

export const deleteUserFailed = (error) => {
  return {
    type: DELETE_USER_FAILED,
    error
  }
}

export const deleteUser = (userId) => {
  return dispatch => {
    dispatch(deleteUserStart());
    fetch(`${BASE_URL}/user/delete/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": localAuth().token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(deleteUserFailed(resp.error));
        dispatch(deleteUserSuccess(resp));
      })
      .then(() => {
        dispatch(getUsers());
      })
      .catch(err => {
        dispatch(deleteUserFailed(`Failed to delete. ${err.message}`));
      });
  }
}

export const uploadPhotoStart = () => {
  return {
    type: UPLOAD_PHOTO_START
  }
}

export const uploadPhotoSuccess = (data) => {
  return {
    type: UPLOAD_PHOTO_SUCCESS,
    data
  }
}

export const uploadPhotoFailed = (error) => {
  return {
    type: UPLOAD_PHOTO_FAILED,
    error
  }
}

export const uploadPhoto = (data, userId) => {
  return dispatch => {
    dispatch(uploadPhotoStart());
    fetch(`${BASE_URL}/profile/photo/:${userId}`, {
      method: "PUT",
      headers: {
        "x-auth-token": localAuth().token
      },
      body: data
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(uploadPhotoFailed(resp.error));
        dispatch(uploadPhotoSuccess(resp))
      })
      .catch(err => {
        dispatch(uploadPhotoFailed(`Failed to upload. ${err.message}`));
      });
  }
}

export const roleStart = () => {
  return {
    type: ASSIGN_ROLE_START
  }
}

export const roleSuccess = (data) => {
  return {
    type: ASSIGN_ROLE_SUCCESS,
    data
  }
}

export const roleFailed = (error) => {
  return {
    type: ASSIGN_ROLE_FAILED,
    error
  }
}

export const role = (userId) => {
  return dispatch => {
    dispatch(roleStart());
    fetch(`${BASE_URL}/role/${userId}/admin`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": localAuth().token
      }
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return dispatch(roleFailed(resp.error));
        dispatch(roleSuccess(resp));
      })
      .catch(err => {
        dispatch(roleFailed(`Request failed. ${err.message}`));
      });
  }
}


