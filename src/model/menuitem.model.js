const mongoose = require('mongoose');
const Schema = mongoose.Schema
const Admin = require('./admin.model')

const menuItemSchema = new Schema({
    foodname: {
        type: String,
        required: true,
      },
      
        calories: {type: Number, required: true},
        carbohydrates: {type: Number, required: true},
        proteins:{type: Number, required: true},
        fats: {type: Number, required: true},
  
      admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Admin,
        required: true
      },
}, {timestamps: true}
)
const MenuItem = mongoose.model('menuitem', menuItemSchema)
module.exports = MenuItem;

