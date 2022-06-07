import { flight_LIST_FAIL, flight_LIST_REQUEST, flight_LIST_SUCCESS,
    flight_DETAILS_REQUEST, flight_DETAILS_SUCCESS,flight_DETAILS_FAIL,
     flight_SAVE_REQUEST, 
     flight_SAVE_SUCCESS,
     flight_SAVE_FAIL,
     flight_DELETE_SUCCESS,
     flight_DELETE_REQUEST,
     flight_DELETE_FAIL,
     flight_CATEGORY_FAIL,
     flight_CATEGORY_SUCCESS,
     flight_CATEGORY_REQUEST} from "../constants/flightConstants";
  
  function flightListReducer(state={flights:[]}, action)
  {
    switch(action.type){
        case flight_LIST_REQUEST:
            return { loading: true, flights: [] };// means i will show a loading box in this
        case flight_LIST_SUCCESS:  //means I get the data from the server
            return {loading: false, flights: action.payload};
        case flight_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
                
    }
  }
  function flightsListCategoryReducer(state={flight:{}}, action) // I replace [] by {} because i return an object
  {
    switch(action.type){
        case flight_CATEGORY_REQUEST:
            return {loading: true};// means i will show a loading box in this
        case flight_CATEGORY_SUCCESS:  //means I get the data from the server
            return {loading: false, flight: action.payload};
        case flight_CATEGORY_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
                
    }
  }
  function flightDetailsReducer(state={flight:{}}, action) // I replace [] by {} because i return an object
  {
    switch(action.type){
        case flight_DETAILS_REQUEST:
            return {loading: true};// means i will show a loading box in this
        case flight_DETAILS_SUCCESS:  //means I get the data from the server
            return {loading: false, flight: action.payload};
        case flight_DETAILS_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
                
    }
  }
  function flightDeleteReducer(state = { flight: {} }, action) {
    switch (action.type) {
      case flight_DELETE_REQUEST:
        return { loading: true };
      case flight_DELETE_SUCCESS:
        return { loading: false, flight: action.payload, success: true };
      case flight_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }
  
  function flightsaveReducer(state = { flight: {} }, action) {
    switch (action.type) {
      case flight_SAVE_REQUEST:
        return { loading: true };
      case flight_SAVE_SUCCESS:
        return { loading: false, success: true, flight: action.payload };
      case flight_SAVE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }
  export {flightListReducer, flightDetailsReducer,flightsaveReducer,flightDeleteReducer,flightsListCategoryReducer};