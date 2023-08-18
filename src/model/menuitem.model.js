const mongoose = require('mongoose');
const Schema = mongoose.Schema
const Admin = require('./admin.model')

const menuItemSchema = new Schema({
    foodname: {
        type: String,
        required: true,
      },
      nutritionalInfo: {
        calories: Number,
        carbohydrates: Number,
        proteins: Number,
        fats: Number,
        required: true,
      },
      admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Admin,
        required: true
      },
}, {timestamps: true}
)
const MenuItem = mongoose.model('menuitem', menuItemSchema)
module.exports = MenuItem;

