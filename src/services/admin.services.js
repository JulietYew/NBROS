const Admin = require('../model/admin.model');
const mongoose = require('mongoose')

class adminService {
    // create an admin
    async createAdmin(newAdmin) {
        await Admin.create(newAdmin)
        return await Admin.find(newAdmin, { _id: 1, password: 0 })
    }

    // get all Admin
    async getAllAdmin(filter) {
        return await Admin.find(filter, { _id: 1, password: 0 })
    }

    // get a single admin  by id
    async getAdminById(id) {
        return await Admin.findById(id, { _id: 1, password: 0 });
    }

    // edit an admin by id
    async editAdminById(id, data) {
        return await Admin.findByIdAndUpdate({ _id: id }, data);
    }

    // delete an admin by id
    async deleteAdminById(id) {
        return await Admin.findByIdAndDelete({ _id: id });
    }
}
module.exports = new adminService();
