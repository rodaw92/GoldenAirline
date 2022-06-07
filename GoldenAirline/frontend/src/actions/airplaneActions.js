import { AIRPLANE_LIST_FAIL, AIRPLANE_LIST_REQUEST, AIRPLANE_LIST_SUCCESS,
    AIRPLANE_DETAILS_FAIL,AIRPLANE_DETAILS_REQUEST, AIRPLANE_DETAILS_SUCCESS, 
    AIRPLANE_SAVE_SUCCESS, AIRPLANE_SAVE_REQUEST, AIRPLANE_SAVE_FAIL, 
    AIRPLANE_DELETE_SUCCESS, AIRPLANE_DELETE_FAIL, AIRPLANE_DELETE_REQUEST, AIRPLANE_REVIEW_CREATE_REQUEST, AIRPLANE_REVIEW_CREATE_SUCCESS, AIRPLANE_REVIEW_CREATE_FAIL, AIRPLANE_CATEGORY_FAIL, AIRPLANE_CATEGORY_SUCCESS, AIRPLANE_CATEGORY_REQUEST } from "../constants/airplaneConstants";
 import axios from 'axios';
 import Axios from 'axios';
 
 const listAirplanes = (

 ) => async (dispatch) => {
   try {
     dispatch({ type: AIRPLANE_LIST_REQUEST }); // dipatch has an object {} and this object has a type
     const { data } = await axios.get( // to send AJAX request to the server
       '/api/airplanes'
     );
     dispatch({ type: AIRPLANE_LIST_SUCCESS, payload: data }); // when getting the data from the server I return the data by payLoad
   } catch (error) {
     dispatch({ type: AIRPLANE_LIST_FAIL, payload: error.message });
   }
 };
 
 
 
 
 const saveAirplane = (airplane) => async (dispatch, getState) => {
     try {
       dispatch({ type: AIRPLANE_SAVE_REQUEST, payload: airplane });
       const {
         userSignin: { userInfo },
       } = getState();
       if (!airplane._id) {
         const { data } = await Axios.post('/api/airplanes', airplane, {
           headers: {
             Authorization: 'Bearer ' + userInfo.token,
           },
         });
         dispatch({ type: AIRPLANE_SAVE_SUCCESS, payload: data });
       } else {
         const { data } = await Axios.put(
           '/api/airplanes/' + airplane._id,
           airplane,
           {
             headers: {
               Authorization: 'Bearer ' + userInfo.token,
             },
           }
         );
         dispatch({ type: AIRPLANE_SAVE_SUCCESS, payload: data });
       }
     } catch (error) {
       dispatch({ type: AIRPLANE_SAVE_FAIL, payload: error.message });
     }
   };
   
 const detailAirplane = (airplaneId) => async (dispatch) => {// use async when you need to use await
     try {
       dispatch({ type: AIRPLANE_DETAILS_REQUEST, payload: airplaneId }); // define in payLoad airplaneId to return to the user the airplane that selcted by the user
       const { data } = await axios.get('/api/airplanes/' + airplaneId);
       dispatch({ type: AIRPLANE_DETAILS_SUCCESS, payload: data });
     } catch (error) {
       dispatch({ type: AIRPLANE_DETAILS_FAIL, payload: error.message });
     }
   };
 
 const deleteAirplane = (airplaneId) => async (dispatch, getState) => {
     try {
       const {
         userSignin: { userInfo },
       } = getState();
       dispatch({ type: AIRPLANE_DELETE_REQUEST, payload: airplaneId });
       const { data } = await axios.delete('/api/airplanes/' + airplaneId, {
         headers: {
           Authorization: 'Bearer ' + userInfo.token,
         },
       });
       dispatch({ type: AIRPLANE_DELETE_SUCCESS, payload: data, success: true });
     } catch (error) {
       dispatch({ type: AIRPLANE_DELETE_FAIL, payload: error.message });
     }
   };
 
 export {listAirplanes, detailAirplane,saveAirplane,deleteAirplane};