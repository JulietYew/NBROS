const mongoose = require('mongoose');
const Schema = mongoose.Schema

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
      },
}, {timestamps: true}
)
const MenuItem = mongoose.model('menuitem', menuItemSchema)
module.exports = MenuItem;

