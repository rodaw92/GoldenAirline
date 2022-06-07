import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  saveStaff,
  listStaffs,
  deleteStaff,
} from '../actions/staffActions';

function StaffScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState(''); 
  const [empnum, setEmpNum] = useState(' ');
  const [name, setName] = useState(' ');
  const [surname, setSurname] = useState(' ');
  const [salary, setSalary] = useState(' ');
  const [phone, setPhone]= useState(' ');
  const [Address, setAddress]= useState(' ');
  const [hours, setHours]= useState(' ');
  const [isPilot, setIsPilot]= useState(' ');
  const staffList = useSelector((state) => state.staffList) ;
  const { loading, staffs, error } = staffList  || {}; ;

  const staffSave = useSelector((state) => state.staffSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = staffSave || {};

  const staffDelete = useSelector((state) => state.staffDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = staffDelete || {};
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false); // to close the window when the user finish adding or updating a staff
    }
    dispatch(listStaffs());
    return () => {
      //
    };
  }, [successSave, successDelete]);

  const openModal = (staff) => {
    setModalVisible(true);
    setId(staff._id);
    setEmpNum(staff.empnum);
    setName(staff.name);
    setSurname(staff.surname);
    setSalary(staff.salary);
    setPhone(staff.phone);
    setAddress(staff.Address);
    setIsPilot(staff.isPilot);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveStaff({
        _id: id,
        empnum,
        name,
        surname,
        salary,
        phone,
        Address,
        hours,
        isPilot,
      })
    );
  };
  const deleteHandler = (staff) => {
    dispatch(deleteStaff(staff._id));
  };
  return (
    <div className="content content-margined">
      <div className="staff-header">
        <h3>staffs</h3>
        <button className="button primary" onClick={() => openModal({})}>
          Create a staff
        </button>
      </div>
      {modalVisible && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Add a new staff</h2>
              </li>
              <li>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>


              <li>
                <label htmlFor="empnum">Employee Number</label>
                <input
                  type="text"
                  name="empnum"
                  value={empnum}
                  id="empnum"
                  onChange={(e) => setEmpNum(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="surname">SurName</label>
                <input
                  type="text"
                  name="surname"
                  value={surname}
                  id="surname"
                  onChange={(e) => setSurname(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="salary">Salary</label>
                <input
                  type="text"
                  name="salary"
                  value={salary}
                  id="salary"
                  onChange={(e) => setSalary(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={phone}
                  id="phone"
                  onChange={(e) => setPhone(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="Address">Address</label>
                <input
                  type="text"
                  name="Address"
                  value={Address}
                  id="Address"
                  onChange={(e) => setAddress(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="isPilot">Pilot</label>
                <input
                  type="text"
                  name="isPilot"
                  value={isPilot}
                  id="isPilot"
                  onChange={(e) => setIsPilot(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="hours">Flying Hours</label>
                <input
                  type="text"
                  name="hours"
                  value={hours}
                  id="hours"
                  onChange={(e) => setHours(e.target.value)}
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

      <div className="staff-list">
        <table className="table">
          <thead>
            <tr>
              <th>staff Num</th>
              <th>Name</th>
              <th>Sur Name</th>
              <th>phone</th>
              <th>Address</th>
              <th>Hours</th>
              <th>Salary</th>
              <th>Is Pilot</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {staffs.map((staff) => (
              <tr key={staff._id}>
                <td>{staff.empnum}</td>
                <td>{staff.name}</td>
                <td>{staff.surname}</td>
                <td>{staff.phone}</td>
                <td>{staff.Address}</td>
                <td>{staff.hours}</td>
                <td>{staff.salary}</td>
                <td>{staff.isPilot}</td>
                <td>
                  <button className="button" onClick={() => openModal(staff)}>
                    Edit
                  </button>{' '}
                  <button
                    className="button"
                    onClick={() => deleteHandler(staff)}
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
export default StaffScreen;
