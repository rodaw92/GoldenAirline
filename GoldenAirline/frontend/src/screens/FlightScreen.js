import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsFlight } from '../actions/flightActions';

function FlightScreen(props) {
    const [qty, setQty] = useState(1);
    const flightDetails = useSelector((state) => state.flightDetails);
    const { flight, loading, error } = flightDetails;

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(detailsFlight(props.match.params.id));
  
      return () => {
        //
      };
    }, []);
//const flight = data.flights.find(x => x._id === props.match.params.id);
const handleAddToCart = () => {
  props.history.push('/cart/' + props.match.params.id + '?qty=' + qty); //a method to redirect the user to another url
};

 return <div>
      <div className="back-to-result">
        <Link to="/">Back to result</Link>
      </div>
      {loading ?
        <div>Loading...</div>
      : error ? 
        <div>{error} </div>
      :
        <div className="details">
        <div className="details-image">
                <img src={flight.image} alt="flight"></img>
              </div>
              <div className="details-info">
                <ul>
                  <li>
                    <h4>Flight Number:{flight.flightNum}</h4>
                  </li>
                  <li> 
                    Origin: <b>{flight.origin}</b>
                  </li>
                  <li> 
                    Destination: <b>{flight.dest}</b>
                  </li>
                  <li> 
                    Date of Flight: <b>{flight.date}</b>
                  </li>
                  <li>
                    Description:
                    <div>{flight.description}</div>
                  </li>
                </ul>
              </div>
              <div className="details-action">
                <ul>
                  <li>Price: {flight.price}</li>
                  <li>
                    Status:{' '}
                    {flight.NumOfSeats > 0 ? 
                    (<span className='success' >Available</span> 
                    ):(<span className='danger' >fully Booked.</span> )}
                  </li>
                  <li>
                    Number of requested seats:{' '}
                    <select
                      value={qty}
                      onChange={(e) => {
                        setQty(e.target.value);
                      }}
                    >
                      {[...Array(flight.NumOfSeats).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </li>
                  <li>
                    {flight.NumOfSeats > 0 && (
                      <button
                       onClick={handleAddToCart}
                        className="button primary"
                      >
                        Book
                      </button>
                    )}
                  </li>
                </ul>
              </div>
            </div>
      } 
      

 </div>
}

 export default FlightScreen;
 