const orderServices = require('../services/order.services')
const adminService = require('../services/admin.services')
const menuService = require('../services/menuitem.services')
const authCustomer = require('../middleware/authenticate')
const mongoose = require ('mongoose')

const {
    createOrder,
    getAllOrders,
    getOrder,
    editOrderById,
    deleteOrderById
} = orderServices

class OrderController{
    // create an order
    async createOrders(req, res){
        const { items } = req.body;   
        try{
            const customerId = req.customer.id
            if (!customerId){
                return res.status(401).send({
                    message: 'Unauthorized Access',
                    success: false
                     });
            }
            const order = new orderServices.createOrder({
                customer: customerId,
                items: items
              });
              await order.populate('customer')
            return res.status(200).send({
                message: 'Order created successfully',
                order,
                success: true
            });
        }catch{  
            return res.status(500).send({
                message: 'An error occurred: ' + error.message,
                success: false
            });
        }
    }
    // get an order
     async getAnOrder(req, res) {
        const orderId = req.params.orderId;
        const customerId = req.customer.id
        try{
            const order = await orderServices.getOrder({
                _id: orderId, 
                customer: customerId
        })
        if (!order) {
            return res.status(404).send({
                message: 'Order not found' || err.message,
                success: false
            });
        } else {
            // returns true if a particular order is available
            return res.status(200).send({
                message: 'Order fetched successfully',
                order,
                success: true
            });
        }
        }catch{
            return res.status(500).send({
                message: 'An Error occured: ' + error.message,
                success: false
            })

        }  
     }
    // get all orders
    async fetchAllOrders(req, res){
        //const customerId = req.customer.id
        try {
            const orders = await orderServices.getAllOrders()
            if (!orders) {
                return res.status(404).send({
                    message: 'Orders not found' || err.message,
                    success: false
                })
            } else {
                return res.status(200).send({
                    message: 'Orders found successfully', 
                    orders,
                    success: true
                })
            }
        }catch{
            return res.status(500).send({
                message: 'An Error occured: ' + error.message,
                success: false
            })
        }
    }
    // update an order
    async editOrder(req, res){
        try{
            const orderId = req.params.orderId
            const items = req.body
            const order = await orderServices.getOrder({ 
                _id: orderId  
            })
            if(!order){
                return res.status(404).json({
                    message: 'Order not found' || err.message,
                    success: false
                });
            }
            // update the order details to the current one
            const updatedOrder = await orderServices.editOrderById(id, {
                items: items
            })
            return res.status(200).send({
                message: 'Order updated successfully',
                success: true,
                data: updatedOrder
            });
        }catch (error) {
            return res.status(500).send({
                message: 'An Error occured: ' + error.message,
                success: false
            })
        }
    }
    // delete an order
    async deleteOrder(req, res) {
        // check if an order exist before deleting
        try {
            const { id } = req.params
            const existingOrder = await orderServices.getOrder({
                _id: id
            })
            if (!existingOrder) {
                return res.status(404).send({
                    message: 'No Order found',
                    success: false
                })
            }
            // delete order if the above condition was met
            await orderServices.deleteOrderById(id)
            return res.status(200).send({
                message: 'Order deleted',
                success: true,
            })

        } catch (error) {
            return res.status(500).send({
                message: 'An Error occured: ' + error.message,
                success: false
            })
        }

    }
}
module.exports = new OrderController()