import { AIRPLANE_LIST_FAIL, AIRPLANE_LIST_REQUEST, AIRPLANE_LIST_SUCCESS,
    AIRPLANE_DETAILS_REQUEST, AIRPLANE_DETAILS_SUCCESS,AIRPLANE_DETAILS_FAIL,
     AIRPLANE_SAVE_REQUEST, 
     AIRPLANE_SAVE_SUCCESS,
     AIRPLANE_SAVE_FAIL,
     AIRPLANE_DELETE_SUCCESS,
     AIRPLANE_DELETE_REQUEST,
     AIRPLANE_DELETE_FAIL,
     AIRPLANE_CATEGORY_FAIL,
     AIRPLANE_CATEGORY_SUCCESS,
     AIRPLANE_CATEGORY_REQUEST} from "../constants/airplaneConstants";
  
  function airplaneListReducer(state={airplanes:[]}, action)
  {
    switch(action.type){
        case AIRPLANE_LIST_REQUEST:
            return { loading: true, airplanes: [] };// means i will show a loading box in this
        case AIRPLANE_LIST_SUCCESS:  //means I get the data from the server
            return {loading: false, airplanes: action.payload};
        case AIRPLANE_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
                
    }
  }
  function airplanesListCategoryReducer(state={airplane:{}}, action) // I replace [] by {} because i return an object
  {
    switch(action.type){
        case AIRPLANE_CATEGORY_REQUEST:
            return {loading: true};// means i will show a loading box in this
        case AIRPLANE_CATEGORY_SUCCESS:  //means I get the data from the server
            return {loading: false, airplane: action.payload};
        case AIRPLANE_CATEGORY_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
                
    }
  }
  function airplaneDetailsReducer(state={airplane:{}}, action) // I replace [] by {} because i return an object
  {
    switch(action.type){
        case AIRPLANE_DETAILS_REQUEST:
            return {loading: true};// means i will show a loading box in this
        case AIRPLANE_DETAILS_SUCCESS:  //means I get the data from the server
            return {loading: false, airplane: action.payload};
        case AIRPLANE_DETAILS_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
                
    }
  }
  function airplaneDeleteReducer(state = { airplane: {} }, action) {
    switch (action.type) {
      case AIRPLANE_DELETE_REQUEST:
        return { loading: true };
      case AIRPLANE_DELETE_SUCCESS:
        return { loading: false, airplane: action.payload, success: true };
      case AIRPLANE_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }
  
  function airplanesaveReducer(state = { airplane: {} }, action) {
    switch (action.type) {
      case AIRPLANE_SAVE_REQUEST:
        return { loading: true };
      case AIRPLANE_SAVE_SUCCESS:
        return { loading: false, success: true, airplane: action.payload };
      case AIRPLANE_SAVE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }
  export {airplaneListReducer, airplaneDetailsReducer,airplanesaveReducer,airplaneDeleteReducer,airplanesListCategoryReducer};