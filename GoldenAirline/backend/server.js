import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import passengerRoute from './routes/passengerRoute';
import flightRoute from './routes/flightRoute';
import airplaneRoute from './routes/airplaneRoute';
import bodyParser from 'body-parser';
import uploadRoute from './routes/uploadRoute';  
import orderRoute from './routes/orderRoute';  
import staffRoute from './routes/staffRoute';  

dotenv.config();

const app = express(); 
const mongodbUrl = config.MONGODB_URL; 
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true,
  })
  .catch((error) => console.log(error.reason)); 
  app.use(bodyParser.json());
  app.use('/api/uploads', uploadRoute); // to link uploads route to the /uploads/ api and send it to the Frontend
  app.use('/api/users', passengerRoute); // to link passenger route to the /users/ api  and send it to the Frontend
  app.use('/api/flights', flightRoute); // to link flight route to the /flights/ api and send it to the Frontend
  app.use('/api/orders', orderRoute); // to link booking order route to the /orders/ api and send it to the Frontend
  app.use('/api/staffs', staffRoute);// to link staff route to the /staffs/ api and send it to the Frontend

  app.use('/api/airplanes', airplaneRoute);
  app.get('/api/config/paypal', (req, res) => {
    res.send(config.PAYPAL_CLIENT_ID);
  }); // to link paypal with it is client ID, which i took it from paypal developer website then send it to the front end
  app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
  app.use(express.static(path.join(__dirname, '/../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
  });
  




app.listen(5000, () => { console.log('Server started at http://localhost:5000');});
  