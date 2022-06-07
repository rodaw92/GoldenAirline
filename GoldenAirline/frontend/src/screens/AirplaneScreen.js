import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  saveAirplane,
  listAirplanes,
  deleteAirplane,
} from '../actions/airplaneActions';



function AirplaneScreen(props) {


  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState(''); 
  const [numser, setNumser] = useState(' ');
  const [rating, setRating] = useState(' ');
  const [manufactorer, setManufactorer] = useState(' ');
  const [model, setModel] = useState(' ');
  const [staff, setStaff]= useState(' ');
  const airplaneList = useSelector((state) => state.airplaneList) ;
  const { loading, airplanes, error } = airplaneList  || {}; ;

  const airplaneSave = useSelector((state) => state.airplaneSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = airplaneSave || {};

  const airplaneDelete = useSelector((state) => state.airplaneDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = airplaneDelete || {};
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false); // to close the window when the user finish adding or updating a airplane
    }
    dispatch(listAirplanes());
    return () => {
      //
    };
  }, [successSave, successDelete]);

  const openModal = (airplane) => {
    setModalVisible(true);
    setId(airplane._id);
    setNumser(airplane.numser);
    setRating(airplane.rating);
    setManufactorer(airplane.manufactorer);
    setModel(airplane.model);
    setStaff(airplane.staff);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveAirplane({
        _id: id,
        numser,
        rating,
        manufactorer,
        model,
        staff,
      })
    );
  };
  const deleteHandler = (airplane) => {
    dispatch(deleteAirplane(airplane._id));
  };
  return (
    <div className="content content-margined">
      <div className="airplane-header">
        <h3>airplanes</h3>
        <button className="button primary" onClick={() => openModal({})}>
          Create a airplane
        </button>
      </div>
      {modalVisible && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Add a new airplane</h2>
              </li>
              <li>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>


              <li>
                <label htmlFor="numser">Airplane Serial Number</label>
                <input
                  type="text"
                  name="numser"
                  value={numser}
                  id="numser"
                  onChange={(e) => setNumser(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="rating">rating</label>
                <input
                  type="text"
                  name="rating"
                  value={rating}
                  id="rating"
                  onChange={(e) => setRating(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="model">Model</label>
                <input
                  type="text"
                  name="model"
                  value={model}
                  id="model"
                  onChange={(e) => setModel(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="manufactorer">manufactorer</label>
                <input
                  type="text"
                  name="manufactorer"
                  value={manufactorer}
                  id="manufactorer"
                  onChange={(e) => setManufactorer(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="staff">pilot</label>
                <input
                  type="text"
                  name="staff"
                  value={staff}
                  id="staff"
                  onChange={(e) => setStaff(e.target.value)}
                ></input>
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

      <div className="airplane-list">
        <table className="table">
          <thead>
            <tr>
              <th>airplane serial number</th>
              <th>rating</th>
              <th>Model</th>
              <th>manufactorer</th>
              <th>Staff</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {airplanes.map((airplane) => (
              <tr key={airplane._id}>
                <td>{airplane.numser}</td>
                <td>{airplane.rating}</td>
                <td>{airplane.model}</td>
                <td>{airplane.manufactorer}</td>
                <td>{airplane.staff}</td>
                <td>
                  <button className="button" onClick={() => openModal(airplane)}>
                    Edit
                  </button>{' '}
                  <button
                    className="button"
                    onClick={() => deleteHandler(airplane)}
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
export default AirplaneScreen;
