const customers = require("../model/customer.model");
const mongoose = require('mongoose')

class customerService {
    async createUser(data) {
        //to create a user
        await customers.create(data);
        return await users.find(data, { _id: 1, password: 0 })
    }

    async getAUserById(id) {
        //get a single user by id
        return await customers.findById(id, { _id: 1, password: 0 });
    }

    async getAllUsers() {
        //get all users
        return await customers.find({}, { _id: 1, password: 0 })
    }

    async deleteUser(id) {
        // delete a user
        return await customers.findByIdAndDelete(id)
    }

    async getAUserByEmail(data) {
        //get a single user by id
        return await customers.findOne(data);
    }

    async updateUser(id, data) {
        // update a user
        await customers.findByIdAndUpdate(id, data)
        return await customers.find(data, { _id: 1, password: 0 })

    }
}
module.exports = new customerService();