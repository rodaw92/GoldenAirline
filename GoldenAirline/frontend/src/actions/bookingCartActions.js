import Axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT, CART_SAVE_ADDRESS } from '../constants/bookingCartConstants';
import Cookie from "js-cookie";
const addToCart=(flightId, qty) => async (dispatch, getState) => { // use getState from thuk to use Cookie 
    try{
     const {data}=await Axios.get("/api/flights/"+ flightId);
     dispatch({
         type: CART_ADD_ITEM, payload:{
         flight: data._id, // contains flight id 
         flightNum: data.flightNum,
         image: data.image,
         price: data.price,
         NumOfSeats: data.NumOfSeats,
         qty
     }});
    const {cart:{cartItems}}= getState();
  Cookie.set("cartItems", JSON.stringify(cartItems)); // to save cart item in the cookie
    
    }catch(error){

    }
}
const removeFromCart = (flightId) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: flightId });
  
    const { cart: { cartItems } } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
  }
  const savepassengerAdress = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_ADDRESS, payload: data });
  }
  const savePayment = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT, payload: data });
  }
export {addToCart, removeFromCart,savepassengerAdress,savePayment};