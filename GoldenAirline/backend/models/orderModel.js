import mongoose from 'mongoose';

const addressSchema = {
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
};
const paymentSchema = {
  paymentMethod: { type: String, required: true }
};
const orderItemSchema = new mongoose.Schema({
 /// name: { type: String, required: true },
  qty: { type: Number, required: true },
  image: { type: String, required: true },
  price: { type: String, required: true },
  flight: {
    type: mongoose.Schema.Types.ObjectId,  // A link to flight module
    ref: 'Flight',  // to make a reference to flight object
    required: true
  },
});
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // to save the user that create that booking order
  orderItems: [orderItemSchema],
  passengeraddress: [addressSchema],
  payment: paymentSchema,
  itemsPrice: { type: Number },
  taxPrice: { type: Number },
  totalPrice: { type: Number },
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date },
}, {
  timestamps: true // to save the create date and the last update date for each booking order 
});
const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;