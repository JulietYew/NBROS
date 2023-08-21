const customers = require("../model/customer.model");
const mongoose = require('mongoose')

class customerService {
    async createCustomer(data) {
        //to create a customer
        await customers.create(data);
        return await users.find(data, { _id: 1, password: 0 })
    }

    async getACustomerById(id) {
        //get a single customer by id
        return await customers.findById(id, { _id: 1, password: 0 });
    }

    async getAllCustomers() {
        //get all customers
        return await customers.find({}, { _id: 1, password: 0 })
    }

    async deleteCustomer(id) {
        // delete a customer
        return await customers.findByIdAndDelete(id)
    }

    async getACustomerByEmail(data) {
        //get a single customer by id
        return await customers.findOne(data);
    }

    async updateCustomer(id, data) {
        // update a customer
        await customers.findByIdAndUpdate(id, data)
        return await customers.find(data, { _id: 1, password: 0 })

    }
}
module.exports = new customerService();