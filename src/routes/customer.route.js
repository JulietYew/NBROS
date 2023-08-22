const { Router } = require('express')
//const { validateUserInputs, validateUserLoginInputs } = require('../utils/validation')
const customerRouter = Router()
const auth = require('../middleware/authenticate')

// The routes contains CRUD operations for customers and their abilities to fetch orders depending on what they want to watch.

const {
    signUp,
    login,
    findACustomer,
    fetchAllCustomers,
    updateACustomer,
    deleteOne,
    recoverPassword,
    loggedOut
} = customerController = require('../controller/customer.controller')

const { createOrders,
    editOrder,
    deleteOrder,
    fetchAllOrders,
    getAnOrder
} = orderController = require('../controller/order.controller')


customerRouter.post('/user/signup', signUp)
customerRouter.post('/user/login', login)
customerRouter.post('/user/createOrder', auth, createOrders)
customerRouter.post('/user/logout', auth, loggedOut)
customerRouter.get('/user/orders', auth, fetchAllOrders)
customerRouter.get('/user/orders/:id', auth, getAnOrder)
customerRouter.patch('/order/:id', auth, editOrder)
customerRouter.delete('/order/:id', auth, deleteOrder)
customerRouter.get('/user', auth, fetchAllCustomers)
customerRouter.get('/user/:id', auth, findACustomer)
customerRouter.patch('/user/recover', recoverPassword)
customerRouter.patch('/user/:id', auth, updateACustomer)
customerRouter.delete('/user/:id', auth, deleteOne)

module.exports = customerRouter