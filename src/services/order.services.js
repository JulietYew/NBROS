const Order = require('../model/order.model');

class orderService {

    async createOrder(newOrder) {
        // create an order
        return await Order.create(newOrder)
    }

    // get all orders
    async getAllOrders() {
        return await Order.find()
    }

    // get a single order 
    async getOrder(filter) {
        return await Order.findOne(filter);
    }

    // edit a order by id
    async editOrderById(id, data) {
        return await Order.findByIdAndUpdate({ _id: id }, data);
    }

    // delete a order by id
    async deleteOrderById(id) {
        return await Order.findByIdAndDelete({ _id: id });
    }
}
module.exports = new orderService();
