import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import  LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
function PlaceOrderScreen(props) {

  const cart = useSelector(state => state.cart);
  const orderCreate = useSelector(state => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const { cartItems, passengeraddress, payment } = cart;
  if (!passengeraddress.address) {
    props.history.push("/passengerAdress");
  } else if (!payment.paymentMethod) {
    props.history.push("/payment");
  }
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + taxPrice;

  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    // create an order
    dispatch(createOrder({ ...cart,
      orderItems: cartItems, passengeraddress, payment, itemsPrice, taxPrice, totalPrice
    }));  // here it means that by dispatching this action we gonna use all the fields of cart object and replaced cartItems by orderItems
  }
  useEffect(() => {
    if (success) {
      props.history.push("/order/" + order._id);
      dispatch({type: ORDER_CREATE_RESET});
    }

  }, [dispatch, order, props.history,success]);

  return <div>
    <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
    <div className="placeorder">
      <div className="placeorder-info">
        <div>
          <h3>
            Passenger Address
          </h3>
          <div>
            {cart.passengeraddress.address}, {cart.passengeraddress.city},
          {cart.passengeraddress.postalCode}, {cart.passengeraddress.country},
          </div>
        </div>
        <div>
          <h3>Payment</h3>
          <div>
            Payment Method: {cart.payment.paymentMethod}
          </div>
        </div>
        <div>
          <ul className="cart-list-container">
            <li>
              <h3>
                Booking Cart
          </h3>
              <div>
                Price
          </div>
            </li>
            {
              cartItems.length === 0 ?
                <div>
                  Cart is empty
          </div>
                :
                cartItems.map(item =>
                  <li>
                    <div className="cart-image">
                      <img src={item.image} alt="flight" />
                    </div>
                    <div className="cart-name">
                      <div>
                        <Link to={"/flight/" + item.flight}>
                          {item.name}
                        </Link>

                      </div>
                      <div>
                        Number Of Seats: {item.qty}
                      </div>
                    </div>
                    <div className="cart-price">
                      ${item.price}
                    </div>
                  </li>
                )
            }
          </ul>
        </div>

      
      </div>
      <div className="placeorder-action">
        <ul>
          <li>
            <button className="button primary full-width" onClick={placeOrderHandler} >Confirm Booking</button>
          </li>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          <li>
            <h3>Booking Summary</h3>
          </li>
          <li>
            <div>Flight</div>
            <div>£{itemsPrice}</div>
          </li>
          <li>
            <div>Tax</div>
            <div>£{taxPrice}</div>
          </li>
          <li>
            <div>Total</div>
            <div>£{totalPrice}</div>
          </li>
        </ul>



      </div>

    </div>
  </div>

}

export default PlaceOrderScreen;