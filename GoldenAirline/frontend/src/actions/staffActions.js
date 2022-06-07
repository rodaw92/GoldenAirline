import { STAFF_LIST_FAIL, STAFF_LIST_REQUEST, STAFF_LIST_SUCCESS,
    STAFF_DETAILS_FAIL,STAFF_DETAILS_REQUEST, STAFF_DETAILS_SUCCESS, 
    STAFF_SAVE_SUCCESS, STAFF_SAVE_REQUEST, STAFF_SAVE_FAIL, 
    STAFF_DELETE_SUCCESS, STAFF_DELETE_FAIL, STAFF_DELETE_REQUEST } from "../constants/staffConstants";
 import axios from 'axios';
 import Axios from 'axios';
 
 const listStaffs = (

 ) => async (dispatch) => {
   try {
     dispatch({ type: STAFF_LIST_REQUEST }); // dipatch has an object {} and this object has a type
     const { data } = await axios.get( // to send AJAX request to the server
       '/api/staffs'
     );
     dispatch({ type: STAFF_LIST_SUCCESS, payload: data }); // when getting the data from the server I return the data by payLoad
   } catch (error) {
     dispatch({ type: STAFF_LIST_FAIL, payload: error.message });
   }
 };
 
 
 
 
 const saveStaff = (staff) => async (dispatch, getState) => {
     try {
       dispatch({ type: STAFF_SAVE_REQUEST, payload: staff }); // firstly I defined the constant as a saving request to the server
       const {
         userSignin: { userInfo }, // to define if the user is admin user
       } = getState();
       if (!staff._id) { // if the staff member is not exist, save it
         const { data } = await Axios.post('/api/staffs', staff, { //  to send AJAX request to axios server API /staffs to save a new staff
           headers: {
             Authorization: 'Bearer ' + userInfo.token, // to define if the user is admin user
           },
         });
         dispatch({ type: STAFF_SAVE_SUCCESS, payload: data }); // disaptch the action and reder the result to the frontend
       } else {
         const { data } = await Axios.put( // if the satff already exist so equest its details from the server
           '/api/staffs/' + staff._id,
           staff,
           {
             headers: {
               Authorization: 'Bearer ' + userInfo.token,
             },
           }
         );
         dispatch({ type: STAFF_SAVE_SUCCESS, payload: data }); // after completing the action dipatch a sccessful request
       }
     } catch (error) {
       dispatch({ type: STAFF_SAVE_FAIL, payload: error.message }); // if there are error dispatch a failure
     }
   };
   
 const detailStaff = (staffId) => async (dispatch) => {// use async when you need to use await
     try {
       dispatch({ type: STAFF_DETAILS_REQUEST, payload: staffId }); // define in payLoad staffId to return to the user the staff that selcted by the user
       const { data } = await axios.get('/api/staffs/' + staffId);
       dispatch({ type: STAFF_DETAILS_SUCCESS, payload: data });
     } catch (error) {
       dispatch({ type: STAFF_DETAILS_FAIL, payload: error.message });
     }
   };
 
 const deleteStaff = (staffId) => async (dispatch, getState) => {
     try {
       const {
         userSignin: { userInfo },
       } = getState();
       dispatch({ type: STAFF_DELETE_REQUEST, payload: staffId });
       const { data } = await axios.delete('/api/staffs/' + staffId, {
         headers: {
           Authorization: 'Bearer ' + userInfo.token,
         },
       });
       dispatch({ type: STAFF_DELETE_SUCCESS, payload: data, success: true });
     } catch (error) {
       dispatch({ type: STAFF_DELETE_FAIL, payload: error.message });
     }
   };
 
 export {listStaffs, detailStaff,saveStaff,deleteStaff};