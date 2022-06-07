import React, { useEffect } from 'react';
import { addToCart,removeFromCart } from '../actions/bookingCartActions';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
 

function CartScreen(props){
    const cart = useSelector  (state=> state.cart); // to access the cart from redux store -
    const {cartItems} =cart;

    const flightId= props.match.params.id;
   // const qty = props.location.search? Number(props.location.search.split("=")[1]): 1;
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1; // Number used to convert sting value to number

    const dispatch=useDispatch();
    const removeFromCartHandler = (flightId) => {
        dispatch(removeFromCart(flightId));
      }

    useEffect(()=>{ 

        if(flightId){
            dispatch(addToCart(flightId,qty))
        }
    },[]  );

    const checkOutHandler= ()=> {
      props.history.push("/signin?redirect=PassengerAdress");
    }
    return <div className="cart">
    <div className="cart-list">
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
                    Number of Seats:
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.flight, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.NumOfSeats).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    <button type="button" className="button" onClick={() => removeFromCartHandler(item.flight)} >
                      Delete
                    </button>
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
  <div className="cart-action">
    <h3>
        Subtotal ({cartItems.reduce((a,c)=> a+ c.qty, 0)} items)
        :
        ${cartItems.reduce((a,c)=> a+ c.price * c.qty, 0 )}
    </h3>
    <button onClick={checkOutHandler}  className="button primary full-width" disabled={cartItems.length === 0}>
        Proceed to Checkout
      </button>
  </div>
  </div>
}

export default CartScreen;