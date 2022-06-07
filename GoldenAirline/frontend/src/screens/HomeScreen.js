import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listflights } from '../actions/flightActions';

function HomeScreen(props) {

  const category = props.match.params.id ? props.match.params.id : '';
  const flightList = useSelector((state) => state.flightList);
  const { flights, loading, error } = flightList;
  const dispatch = useDispatch();
  useEffect(() => { 
    dispatch(listflights(category)); 
  
    return () => { 
      //
    }; 
  }, [category]);


  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <ul className="flights">
          {flights.map((flight) => (
            <li key={flight._id}>
              <div className="flight">
                <Link to={'/flight/' + flight._id}>
                  <img
                    className="flight-image"
                    src={flight.image}
                    alt="flight"
                  />
                </Link>
                <div className='card'>
                <div className="flight-name">
                  <Link to={'/flight/' + flight._id}>Flight Number:{flight.flightNum}</Link>
                </div>
                <div className="flight-brand">Origin:{flight.origin}</div>
                <div className="flight-brand">Destination: {flight.dest}</div>
                <div className="flight-price">${flight.price}</div>
                
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
export default HomeScreen;
