const mongoose = require('mongoose');
const Schema = mongoose.Schema

const adminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'admin',
  },
},{timestamps: true}
)
const Admin = mongoose.model('admin', adminSchema);
module.exports = Admin;
