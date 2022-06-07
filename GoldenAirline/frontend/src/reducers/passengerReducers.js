import { passenger_SIGNIN_REQUEST, passenger_SIGNIN_SUCCESS, passenger_SIGNIN_FAIL, passenger_REGISTER_REQUEST, passenger_REGISTER_SUCCESS, passenger_REGISTER_FAIL, passenger_DETAILS_REQUEST, passenger_DETAILS_SUCCESS, passenger_DETAILS_FAIL, passenger_UPDATE_PROFILE_REQUEST, passenger_UPDATE_PROFILE_SUCCESS, passenger_UPDATE_PROFILE_FAIL, passenger_UPDATE_PROFILE_RESET } from "../constants/passengerConstants";


function passengerSigninReducer(state = {}, action) {
    switch (action.type) {
      case passenger_SIGNIN_REQUEST:
        return { loading: true };
      case passenger_SIGNIN_SUCCESS:
        return { loading: false, passengerInfo: action.payload };
      case passenger_SIGNIN_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  };
  function passengerRegisterReducer(state = {}, action) {
    switch (action.type) {
      case passenger_REGISTER_REQUEST:
        return { loading: true };
      case passenger_REGISTER_SUCCESS:
        return { loading: false, passengerInfo: action.payload };
      case passenger_REGISTER_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }
  export const passengerDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
      case passenger_DETAILS_REQUEST:
        return { loading: true };
      case passenger_DETAILS_SUCCESS:
        return { loading: false, passenger: action.payload };
      case passenger_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
   const passengerUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
      case passenger_UPDATE_PROFILE_REQUEST:
        return { loading: true };
      case passenger_UPDATE_PROFILE_SUCCESS:
        return { loading: false, success: true };
      case passenger_UPDATE_PROFILE_FAIL:
        return { loading: false, error: action.payload };
      case passenger_UPDATE_PROFILE_RESET:
        return {}; // MEANS the default state 
      default:
        return state;
    }
  };
  export { passengerSigninReducer,passengerRegisterReducer,passengerUpdateProfileReducer};