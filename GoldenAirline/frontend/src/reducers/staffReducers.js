import { STAFF_LIST_FAIL, STAFF_LIST_REQUEST, STAFF_LIST_SUCCESS,
    STAFF_DETAILS_REQUEST, STAFF_DETAILS_SUCCESS,STAFF_DETAILS_FAIL,
     STAFF_SAVE_REQUEST, 
     STAFF_SAVE_SUCCESS,
     STAFF_SAVE_FAIL,
     STAFF_DELETE_SUCCESS,
     STAFF_DELETE_REQUEST,
     STAFF_DELETE_FAIL,

     STAFF_CATEGORY_SUCCESS,
     STAFF_CATEGORY_REQUEST} from "../constants/staffConstants";
  
  function staffListReducer(state={staffs:[]}, action)
  {
    switch(action.type){
        case STAFF_LIST_REQUEST:
            return { loading: true, staffs: [] };// means i will show a loading box in this
        case STAFF_LIST_SUCCESS:  //means I get the data from the server
            return {loading: false, staffs: action.payload};
        case STAFF_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
                
    }
  }

  function staffDetailsReducer(state={staff:{}}, action) // I replace [] by {} because i return an object
  {
    switch(action.type){
        case STAFF_DETAILS_REQUEST:
            return {loading: true};// means i will show a loading box in this
        case STAFF_DETAILS_SUCCESS:  //means I get the data from the server
            return {loading: false, staff: action.payload};
        case STAFF_DETAILS_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
                
    }
  }
  function staffDeleteReducer(state = { staff: {} }, action) {
    switch (action.type) {
      case STAFF_DELETE_REQUEST:
        return { loading: true };
      case STAFF_DELETE_SUCCESS:
        return { loading: false, staff: action.payload, success: true };
      case STAFF_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }
  
  function staffsaveReducer(state = { staff: {} }, action) {
    switch (action.type) {
      case STAFF_SAVE_REQUEST:
        return { loading: true };
      case STAFF_SAVE_SUCCESS:
        return { loading: false, success: true, staff: action.payload };
      case STAFF_SAVE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }
  export {staffListReducer, staffDetailsReducer,staffsaveReducer,staffDeleteReducer,};