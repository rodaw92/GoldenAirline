import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  saveflight,
  listflights,
  deleteflight,
} from '../actions/flightActions';

function FlightsScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState(''); 
  const [flightNum, setFlightNum] = useState(' ');
  const [price, setPrice] = useState(' ');
  const [image, setImage] = useState(' ');
  const [origin, setOrigin] = useState(' ');
  const [dest, setDest]= useState(' ');
  const [date, setDate]= useState(' ');
  const [NumOfSeats, setNumOfSeats] = useState(' ');
  const [schedule, setSchedule] = useState(' ');
  const [airplane, setAirplane] = useState(' ');
  const [midcity, setMidcity] = useState(' ');
  const [description, setDescription] = useState(' ');
  const [uploading, setUploading] = useState(false);
  const flightList = useSelector((state) => state.flightList);
  const { loading, flights, error } = flightList;

  const flightSave = useSelector((state) => state.flightSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = flightSave;

  const flightDelete = useSelector((state) => state.flightDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = flightDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false); // to close the window when the user finish adding or updating a flight
    }
    dispatch(listflights());
    return () => {
      //
    };
  }, [successSave, successDelete]);

  const openModal = (flight) => {
    setModalVisible(true);
    setId(flight._id);
    setFlightNum(flight.flightNum);
    setPrice(flight.price);
    setDescription(flight.description);
    setImage(flight.image);
    setOrigin(flight.origin);
    setNumOfSeats(flight.NumOfSeats);
    setDest(flight.dest);
    setDate(flight.date);
    setAirplane(flight.airplane);
    setMidcity(flight.midcity);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveflight({
        _id: id,
        flightNum,
        price,
        image,
        dest,
        origin,
        date,
        description,
        schedule,
        NumOfSeats,
        airplane,
      })
    );
  };
  const deleteHandler = (flight) => {
    dispatch(deleteflight(flight._id));
  };
  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setUploading(true);
    axios
      .post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setImage(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };
  return (
    <div className="content content-margined">
      <div className="flight-header">
        <h3>flights</h3>
        <button className="button primary" onClick={() => openModal({})}>
          Create a flight
        </button>
      </div>
      {modalVisible && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Add a new flight</h2>
              </li>
              <li>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>

              <li>
                <label htmlFor="flightNum">flightNum</label>
                <input
                  type="text"
                  name="flightNum"
                  value={flightNum}
                  id="flightNum"
                  onChange={(e) => setFlightNum(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  name="price"
                  value={price}
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  name="image"
                  value={image}
                  id="image"
                  onChange={(e) => setImage(e.target.value)}
                ></input>
                <input type="file" onChange={uploadFileHandler}></input>
                {uploading && <div>Uploading...</div>}
              </li>
            
              <li>
                <label htmlFor="origin">Origin</label>
                <input
                  type="text"
                  name="origin"
                  value={origin}
                  id="origin"
                  onChange={(e) => setOrigin(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="NumOfSeats">Number of Available Seats</label>
                <input
                  type="text"
                  name="NumOfSeats"
                  value={NumOfSeats}
                  id="NumOfSeats"
                  onChange={(e) => setNumOfSeats(e.target.value)}
                ></input>
              </li>
      
              <li>
                <label htmlFor="dest">Destination</label>
                <input
                  type="text"
                  name="dest"
                  value={dest}
                  id="dest"
                  onChange={(e) => setDest(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="date">Date of Flight</label>
                <input
                  type="date"
                  name="date"
                  value={date}
                  id="date"
                  onChange={(e) => setDate(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="schedule">Schedule</label>
                <input
                  type="text"
                  name="schedule"
                  value={schedule}
                  id="schedule"
                  onChange={(e) => setSchedule(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="airplane">airplane</label>
                <input
                  type="text"
                  name="airplane"
                  value={airplane}
                  id="airplane"
                  onChange={(e) => setAirplane(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="schedule">midcity</label>
                <input
                  type="text"
                  name="midcity"
                  value={midcity}
                  id="midcity"
                  onChange={(e) => setMidcity(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  value={description}
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </li>
              <li>
                <button type="submit" className="button primary">
                  {id ? 'Update' : 'Create'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalVisible(false)}
                  className="button secondary"
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}

      <div className="flight-list">
        <table className="table">
          <thead>
            <tr>
              <th>Flight Num</th>
              <th>Origin</th>
              <th>Dest</th>
              <th>Date</th>
              <th>Price</th>
              <th>Number of Passengers</th>
              <th>Schedule</th>
              <th>Airplane</th>
              <th>Midcity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight._id}>
                <td>{flight.flightNum}</td>
                <td>{flight.origin}</td>
                <td>{flight.dest}</td>
                <td>{flight.date}</td>
                <td>{flight.price}</td>
                <td>{flight.NumOfSeats}</td>
                <td>{flight.schedule}</td>
                <td>{flight.airplane}</td>
                <td>{flight.midcity.city}</td>
                <td>
                  <button className="button" onClick={() => openModal(flight)}>
                    Edit
                  </button>{' '}
                  <button
                    className="button"
                    onClick={() => deleteHandler(flight)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default FlightsScreen;
