import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import PaymentScreen from './screens/PaymentScreen';
import StaffScreen from './screens/StaffScreen';
import AirplaneScreen from './screens/AirplaneScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrdersScreen from './screens/OrdersScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import FlightsScreen from './screens/FlightsScreen';
import FlightScreen from './screens/FlightScreen';
import PassengerAdressScreen from './screens/PassengerAdressScreen';



function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;
  

  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  };
  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');
  };
  return (
    
    <BrowserRouter>
    <div className="grid-container">
    <header className="header">
      <div className="brand">
        <button onClick={openMenu}>
          &#9776;
        </button>
        <Link to="/">GoldenAirline</Link>
      </div>
      <div className="header-links">
        <Link to='/cart'>ManageBookings
        {cartItems.length > 0  && (
          <span className="badge" >{cartItems.length}</span>
        )}
        </Link>
          {userInfo ? (
              <Link to="/profile">{userInfo.name}</Link>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}     
              {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#">Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Bookings</Link>
                    <Link to="/flights">Flights</Link>
                    <Link to="/staffs">Staffs</Link>
                    <Link to="/airplanes">airplanes</Link>
                  </li>
                </ul>
              </div>
            )}
             </div>
    </header>
    <aside className="sidebar">
      <h3 >User</h3>
      <button className="sidebar-close-button" onClick={closeMenu}>x</button>
      <div
        class="bg_image"
      >
    
      <ul>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
      </div>
    </aside>

    <main className="main">
      <div className="content">
      <Route path="/profile" component={ProfileScreen} />
      <Route path="/orders" component={OrdersScreen} />
      <Route path="/order/:id" component={OrderScreen} />
      <Route path="/placeorder" component={PlaceOrderScreen} />
      <Route path="/payment" component={PaymentScreen} />
      <Route path="/passengerAdress" component={PassengerAdressScreen} />
      <Route path="/flights" component={FlightsScreen} />
      <Route path="/staffs" component={StaffScreen} />
      <Route path="/airplanes" component={AirplaneScreen} />
      <Route path="/register" component={RegisterScreen} />
      <Route path="/signin" component={SigninScreen} />
      <Route path="/cart/:id?" component={CartScreen} /> 
      <Route path="/flight/:id" component={FlightScreen} /> 
      <Route path="/category/:id" component={HomeScreen} />
      <Route path="/" exact={true} component={HomeScreen} />

      </div>

    </main>
    <footer className="footer">
      All right reserved.
    </footer>
  </div>
  </BrowserRouter>
  );
}

export default App;
