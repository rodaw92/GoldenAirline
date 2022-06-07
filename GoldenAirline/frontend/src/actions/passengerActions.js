import Axios from 'axios';
import Cookie from 'js-cookie';
import { passenger_SIGNIN_REQUEST, passenger_SIGNIN_SUCCESS, passenger_SIGNIN_FAIL, 
  passenger_REGISTER_FAIL, passenger_REGISTER_SUCCESS, passenger_REGISTER_REQUEST, passenger_DETAILS_REQUEST, passenger_DETAILS_SUCCESS, passenger_DETAILS_FAIL, passenger_UPDATE_PROFILE_SUCCESS, passenger_UPDATE_PROFILE_FAIL, passenger_UPDATE_PROFILE_REQUEST, passenger_LOGOUT} from "../constants/passengerConstants";

const signin = (email, password) => async (dispatch) => {
    dispatch({ type: passenger_SIGNIN_REQUEST, payload: { email, password } });
    try {
      const { data } = await Axios.post("/api/passengers/signin", { email, password });
      dispatch({ type: passenger_SIGNIN_SUCCESS, payload: data });
      Cookie.set('passengerInfo', JSON.stringify(data));// this if the passenger close the screen and open it again  the data info will exist in cookie
    } catch (error) {
      dispatch({ type: passenger_SIGNIN_FAIL, payload: error.message });
    }
  }
    const signout = () => (dispatch) => {
      Cookie.remove("passengerInfo");
      Cookie.remove("cartItems");
      Cookie.remove("passengeraddressAddress");
  dispatch({ type: passenger_LOGOUT });
  document.location.href = '/signin';
    }
    
  const register = (name, email, password,phone) => async (dispatch) => {
    dispatch({ type: passenger_REGISTER_REQUEST, payload: { name, email, password,phone } });
    try {
      const { data } = await Axios.post("/api/passengers/register", { name, email, password,phone });
      dispatch({ type: passenger_REGISTER_SUCCESS, payload: data });
      Cookie.set('passengerInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: passenger_REGISTER_FAIL, payload: error.message });
    }
  }
  const detailspassenger = (passengerId) => async (dispatch, getState) => {
    dispatch({ type: passenger_DETAILS_REQUEST, payload: passengerId });
    const {
      passengerSignin: { passengerInfo },
    } = getState();
    try {
      const { data } = await Axios.get(`/api/passengers/${passengerId}`, {
        headers: { Authorization: `Bearer ${passengerInfo?.token}` },
      });
      dispatch({ type: passenger_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: passenger_DETAILS_FAIL , payload: message });
    }
  };
   const updatepassengerProfile = (passenger) => async (dispatch, getState) => {
    dispatch({ type: passenger_UPDATE_PROFILE_REQUEST, payload: passenger });
    const {
      passengerSignin: { passengerInfo },
    } = getState();
    try {
      const { data } = await Axios.put(`/api/passengers/profile`, passenger, { // to end AJAX request to update passenger profile
        headers: { Authorization: `Bearer ${passengerInfo.token}` },
      });
      dispatch({ type: passenger_UPDATE_PROFILE_SUCCESS, payload: data });
      dispatch({ type: passenger_SIGNIN_SUCCESS, payload: data });
      Cookie.set('passengerInfo', JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: passenger_UPDATE_PROFILE_FAIL, payload: message });
    }
  };
  export  {signin,signout, register,detailspassenger,updatepassengerProfile};