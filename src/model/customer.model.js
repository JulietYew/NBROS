const mongoose = require('mongoose');
const Schema = mongoose.Schema

const customerSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    lastname:{
        type: String,
        required: true,
        trim: true,
    },
    username:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        trim: true, 
    },
    phonenumber:{
        type: String,
        required: true,
        trim: true,
    },
    address:{
        type: String,
        required: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
        trim: true,
    }, 
      
},{ timestamps: true }
)
const customer = mongoose.model('customer', customerSchema)
module.exports = customer