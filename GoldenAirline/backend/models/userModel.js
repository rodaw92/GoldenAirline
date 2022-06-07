import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String, required: true, unique: true, index: true,  $pattern : /@derby\.com$/,
  },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  phone: {type: Number, required: false },

});

const userModel = mongoose.model('User', userSchema);

export default userModel;
