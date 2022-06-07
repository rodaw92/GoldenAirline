import { flight_LIST_FAIL, flight_LIST_REQUEST, flight_LIST_SUCCESS,
    flight_DETAILS_FAIL,flight_DETAILS_REQUEST, flight_DETAILS_SUCCESS, 
    flight_SAVE_SUCCESS, flight_SAVE_REQUEST, flight_SAVE_FAIL, 
    flight_DELETE_SUCCESS, flight_DELETE_FAIL, flight_DELETE_REQUEST, flight_REVIEW_CREATE_REQUEST, flight_REVIEW_CREATE_SUCCESS, flight_REVIEW_CREATE_FAIL, flight_CATEGORY_FAIL, flight_CATEGORY_SUCCESS, flight_CATEGORY_REQUEST } from "../constants/flightConstants";
 import axios from 'axios';
 import Axios from 'axios';
 
 const listflights = (
   category = '',
 ) => async (dispatch) => {
   try {
     dispatch({ type: flight_LIST_REQUEST }); // dipatch has an object {} and this object has a type
     const { data } = await axios.get( // to send AJAX request to the server
       '/api/flights?category=' +
         category
     );
     dispatch({ type: flight_LIST_SUCCESS, payload: data }); // when getting the data from the server I return the data by payLoad
   } catch (error) {
     dispatch({ type: flight_LIST_FAIL, payload: error.message });
   }
 };
 
 
 
 
 const saveflight = (flight) => async (dispatch, getState) => {
     try {
       dispatch({ type: flight_SAVE_REQUEST, payload: flight });
       const {
         userSignin: { userInfo },
       } = getState();
       if (!flight._id) {
         const { data } = await Axios.post('/api/flights', flight, {
           headers: {
             Authorization: 'Bearer ' + userInfo.token,
           },
         });
         dispatch({ type: flight_SAVE_SUCCESS, payload: data });
       } else {
         const { data } = await Axios.put(
           '/api/flights/' + flight._id,
           flight,
           {
             headers: {
               Authorization: 'Bearer ' + userInfo.token,
             },
           }
         );
         dispatch({ type: flight_SAVE_SUCCESS, payload: data });
       }
     } catch (error) {
       dispatch({ type: flight_SAVE_FAIL, payload: error.message });
     }
   };
   
 const detailsFlight = (flightId) => async (dispatch) => {// use async when you need to use await
     try {
       dispatch({ type: flight_DETAILS_REQUEST, payload: flightId }); // define in payLoad flightId to return to the user the flight that selcted by the user
       const { data } = await axios.get('/api/flights/' + flightId);
       dispatch({ type: flight_DETAILS_SUCCESS, payload: data });
     } catch (error) {
       dispatch({ type: flight_DETAILS_FAIL, payload: error.message });
     }
   };
 
 const deleteflight = (flightId) => async (dispatch, getState) => {
     try {
       const {
         userSignin: { userInfo },
       } = getState();
       dispatch({ type: flight_DELETE_REQUEST, payload: flightId });
       const { data } = await axios.delete('/api/flights/' + flightId, {
         headers: {
           Authorization: 'Bearer ' + userInfo.token,
         },
       });
       dispatch({ type: flight_DELETE_SUCCESS, payload: data, success: true });
     } catch (error) {
       dispatch({ type: flight_DELETE_FAIL, payload: error.message });
     }
   };
 
 export {listflights, detailsFlight,saveflight,deleteflight};