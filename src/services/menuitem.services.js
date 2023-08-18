const MenuItem = require('../model/menuitem.model');

class menuItemService {

    async createMenuItem(newMenuItem) {
        // create a menu item
        return await MenuItem.create(newMenuItem)
    }

    // get all Menu Item
    async getAllMenuItem() {
        return await MenuItem.find()
    }

    // get a single Menu Item 
    async getMenuItem(filter) {
        return await MenuItem.findOne(filter);
    }

    // edit a menu by id
    async editMenuById(id, data) {
        return await MenuItem.findByIdAndUpdate({ _id: id }, data);
    }

    // delete a menu by id
    async deleteMenuById(id) {
        return await MenuItem.findByIdAndDelete({ _id: id });
    }
}
module.exports = new menuItemService();
