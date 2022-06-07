import express from 'express';
import Flight from '../models/flightModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get("/", async (req, res) => {
  const category = req.query.category ? { category: req.query.category } : {};
  const flights = await Flight.find({...category});
  res.send(flights);
});


router.get('/:id', async (req, res) => {
  const flight = await Flight.findOne({ _id: req.params.id });
  if (flight) {
    res.send(flight);
  } else {
    res.status(404).send({ message: 'flight Not Found.' });
  }
});

router.post("/", async (req, res) => {
  const flight = new Flight({
    flightNum: req.body.flightNum,
    price: req.body.price,
    image: req.body.image,
    origin: req.body.origin,
    NumOfSeats: req.body.NumOfSeats,
    dest: req.body.dest,
    description: req.body.description,
    date: req.body.date,
    schedule: req.body.schedule,
    midcity: req.body.midcity,
    airplane: req.body.airplane,
  });
  const newflight = await flight.save();
  if(newflight){
   return res.status(201).send({message: 'New flight Created'}, newflight);
  }
  return res.status(505).send({message: 'Error In creating flight'});
})

router.put('/:id', isAuth, isAdmin, async (req, res) => {
  const flightId = req.params.id;
  const flight = await Flight.findById(flightId);
  if (flight) {
    flight.flightNum = req.body.flightNum;
    flight.price = req.body.price;
    flight.image = req.body.image;
    flight.origin = req.body.origin;
    flight.NumOfSeats = req.body.NumOfSeats;
    flight.dest = req.body.dest;
    flight.description = req.body.description;
    flight.date= req.body.date;
    flight.schedule= req.body.schedule;
    flight.airplane = req.body.airplane;
    flight.midcity = req.body.midcity;
    const updatedflight = await flight.save();
    if (updatedflight) {
      return res.status(200).send({ message: 'flight Updated', data: updatedflight });
    }
  }
  return res.status(500).send({ message: ' Error in Updating flight.' });
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  const deletedflight = await Flight.findById(req.params.id);
  if (deletedflight) {
    await deletedflight.remove();
    res.send({ message: 'flight Deleted' });
  } else {
    res.send('Error in Deletion.');
  }
});
export default router;
