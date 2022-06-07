import mongoose from 'mongoose';

const pilotSchema = {
  rating: { type: Number, required: false },
  hours: { type: Number, required: false },

};
const staffSchema = new mongoose.Schema({
  empnum: {type: Number, unique: true, index: true, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  phone: {type: Number, required: true },
  salary: {type: Number, required: true },
  Address: {type: String, required: true },
  hours: { type: Number, required: false },
  isPilot: { type: String, default: false},
  pilot:pilotSchema,
});

const staffModel = mongoose.model('Staff', staffSchema);

export default staffModel;
