const mongoose = require('mongoose');
const Schema = mongoose.Schema
const Customer = require('./customer.model')
const MenuItem = require('./menuitem.model')

const orderSchema = new Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Customer,
    required: true,
  },
  items: [
    {
      menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MenuItem,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
    
  ],
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Delivered'],
    default: 'Pending',
  },
}, { timestamps: true }
)
const Order = mongoose.model('order', orderSchema);
module.exports = Order;
