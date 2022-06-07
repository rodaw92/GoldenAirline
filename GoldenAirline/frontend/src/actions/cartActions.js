import Axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT, CART_SAVE_ADDRESS } from '../constants/cartConstatnts';
import Cookie from "js-cookie";
const addToCart=(flightId, qty) => async (dispatch, getState) => { // use getState from thuk to use Cookie 
    try{
     const {data}=await Axios.get("/api/flight/"+ flightId);
     dispatch({
         type: CART_ADD_ITEM, payload:{
         flight: data._id, // contains flight id 
         name: data.name,
         image: data.image,
         price: data.price,
         countInStock: data.countInStock,
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
  const savepassengeraddress = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_ADDRESS, payload: data });
  }
  const savePayment = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT, payload: data });
  }
export {addToCart, removeFromCart,savepassengeraddress,savePayment};