import express from 'express';
import Airplane from '../models/airplaneModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get("/", async (req, res) => {
  
  const airplanes = await Airplane.find({});
  res.send(airplanes);
});


router.get('/:id', async (req, res) => {
  const airplane = await Airplane.findOne({ _id: req.params.id });
  if (airplane) {
    res.send(airplane);
  } else {
    res.status(404).send({ message: 'airplane Not Found.' });
  }
});

router.post("/", async (req, res) => {
  const airplane = new Airplane({
    numser: req.body.numser,
    model: req.body.model,
    manufactorer: req.body.manufactorer,
    rating: req.body.rating,
    staff: req.body.staff,
  });
  const newairplane = await airplane.save();
  if(newairplane){
   return res.status(201).send({message: 'New airplane Created'}, newairplane);
  }
  return res.status(505).send({message: 'Error In creating airplane'});
})
router.put('/:id', isAuth, isAdmin, async (req, res) => {
  const airplaneId = req.params.id;
  const airplane = await Airplane.findById(airplaneId);
  if (airplane) {
    airplane.airplaneNum = req.body.airplaneNum;
    airplane.numser = req.body.numser;
    airplane.model = req.body.model;
    airplane.manufactorer = req.body.manufactorer;
    airplane.rating = req.body.rating;
    airplane.staff = req.body.staff;
    const updatedairplane = await airplane.save();
    if (updatedairplane) {
      return res.status(200).send({ message: 'airplane Updated', data: updatedairplane });
    }
  }
  return res.status(500).send({ message: ' Error in Updating airplane.' });
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  const deletedairplane = await Airplane.findById(req.params.id);
  if (deletedairplane) {
    await deletedairplane.remove();
    res.send({ message: 'airplane Deleted' });
  } else {
    res.send('Error in Deletion.');
  }
});
export default router;
