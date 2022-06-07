import express from 'express';
import Staff from '../models/staffModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get("/", async (req, res) => {
  const staffs = await Staff.find({});
  res.send(staffs);
});

router.get('/:id', async (req, res) => {
  const staff = await Staff.findOne({ _id: req.params.id });
  if (staff) {
    res.send(staff);
  } else {
    res.status(404).send({ message: 'staff Member Not Found.' });
  }
});

router.post("/", async (req, res) => {
  const staff = new Staff({
    empnum: req.body.empnum,
    name: req.body.name,
    surname: req.body.surname,
    salary: req.body.salary,
    phone: req.body.phone,
    Address: req.body.Address,
    hours: req.body.hours,
    pilot: req.body.pilot,
    isPilot:  req.body.isPilot,
  });
  const newStaff = await staff.save();
  if(newStaff){
   return res.status(201).send({message: 'New Staff Created'}, newStaff);
  }
  return res.status(505).send({message: 'Error In creating Staff'});
})
router.put('/:id', isAuth, isAdmin, async (req, res) => {
  const staffId = req.params.id;
  const staff = await Staff.findById(staffId);
  if (staff) {
    staff.empnum = req.body.empnum;
    staff.name = req.body.name;
    staff.surname = req.body.surname;
    staff.salary = req.body.salary;
    staff.phone = req.body.phone;
    staff.Address = req.body.Address;
    staff.hours = req.body.hours;
    staff.pilot = req.body.pilot;
    staff.isPilot = req.body.isPilot;
    const updatedStaff = await staff.save();
    if (updatedStaff) {
      return res.status(200).send({ message: 'Staff Updated', data: updatedStaff });
    }
  }
  return res.status(500).send({ message: ' Error in Updating Staff.' });
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  const deletedStaff = await Staff.findById(req.params.id);
  if (deletedStaff) {
    await deletedStaff.remove();
    res.send({ message: 'Staff Deleted' });
  } else {
    res.send('Error in Deletion.');
  }
});
export default router;
