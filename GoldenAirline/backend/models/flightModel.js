import mongoose from 'mongoose';

const midcitySchema = new mongoose.Schema(
    {
      city: { type: String, required: false },
      depart: { type: Date, required: false },
      arrive: { type: Date, required: false },
    },
    {
      timestamps: true,
    }
  );
const flightSchema = new mongoose.Schema({
  flightNum: { type: Number, unique: true, index: true, required: true },
  image: { type: String, required: true },
  origin: { type: String, required: true },
  dest: { type: String, required: true },
  date: { type: Date, required: true },
  price: { type: Number, default: 0, required: true },
  schedule: { type: String, required: false },
  NumOfSeats: { type: Number, required: true },
  description: { type: String, required: true },
  midcity: [midcitySchema],
  airplane: {
    type: mongoose.Schema.Types.ObjectId,  // A link to Airplane module
    ref: 'Airplane',  // to make a reference to Airplane object
    required: false
  },
});
const flightModel = mongoose.model('Flight', flightSchema);

export default flightModel;
