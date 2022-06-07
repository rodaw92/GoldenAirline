import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { userDetailsReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer } from './reducers/userReducers';
import Cookie from "js-cookie";
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    myOrderListReducer,
    orderListReducer,
    orderDeleteReducer,
    orderDeliverReducer,
  } from './reducers/orderReducers';
import { flightDeleteReducer, flightDetailsReducer, flightListReducer, flightsaveReducer, flightsListCategoryReducer } from './reducers/flightReducer';
import { staffDeleteReducer, staffDetailsReducer, staffListReducer, staffsaveReducer } from './reducers/staffReducers';
import { airplaneDeleteReducer, airplaneDetailsReducer, airplaneListReducer, airplanesaveReducer, airplanesListCategoryReducer } from './reducers/airplaneReducers';
 

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON('userInfo') || null; // means the userInfo is based on the data that get from the user

const initialState ={cart: {cartItems}, userSignin: { userInfo }, };
const reducer = combineReducers({
   flightList: flightListReducer,
   flightDetails: flightDetailsReducer,
   flightSave: flightsaveReducer,
  flightDelete: flightDeleteReducer,
  flightsListCategory: flightsListCategoryReducer,
  staffList: staffListReducer,
  staffDetails: staffDetailsReducer,
  staffDelete:staffDeleteReducer,
  staffsave: staffsaveReducer,

  airplaneList: airplaneListReducer,
  airplanesListCategory:airplanesListCategoryReducer,
  airplaneDetails: airplaneDetailsReducer,
  airplaneDelete:airplaneDeleteReducer,
  airplanesave: airplanesaveReducer,

    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    userDetails : userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    myOrderList: myOrderListReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    orderDeliver: orderDeliverReducer,


})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // to see the state of actions in developer mode in the browser
const store = createStore( reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;