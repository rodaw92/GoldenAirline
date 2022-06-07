import mongoose from 'mongoose';

const airplaneSchema = new mongoose.Schema({
  numser: {type: Number, unique: true, index: true,required: true },
  rating: { type: Number, required: true },
  manufactorer: { type: String, required: true },
  model : {type: Number, required: true },
  staff: {
    type: mongoose.Schema.Types.ObjectId,  // A link to staff module
    ref: 'Staff',  // to make a reference to staff object
    required: false
  },
});

const airplaneModel = mongoose.model('Airplane', airplaneSchema);

export default airplaneModel;
