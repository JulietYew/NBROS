const { Router } = require('express')
//const { validateAdminInputs } = require('../utils/validation')
const adminRouter = Router()
const authAdmin = require('../middleware/authAdmin')

// The routes contains CRUD operations for Admin and their unique abilities to create, update and delete menuitems
const {
    signUp,
    login,
    loggedOut,
    getOneAdmin,
    getAdmins,
    recoverPassword,
    deleteOne,
} = adminController = require('../controller/admin.controller')

const {
    createMenuItems,
    getMenu,
    fetchAll,
    editMenu,
    deleteMenu,
} = courseController = require('../controller/menuitem.controller')

adminRouter.post('/admin/signup',  signUp)
adminRouter.post('/admin/login', login)
adminRouter.post('/admin/menu', authAdmin,  createMenuItems)
adminRouter.post('/admin/logout', authAdmin, loggedOut)
adminRouter.get('/admin/orders', authAdmin, fetchAll)
adminRouter.get('/admin/orders/:id', authAdmin, getMenu)
adminRouter.patch('/admin/orders/:id', authAdmin, editMenu)
adminRouter.delete('/admin/orders/:id', authAdmin, deleteMenu)
adminRouter.get('/admin', authAdmin, getAdmins)
adminRouter.get('/admin/:id', authAdmin, getOneAdmin)
adminRouter.patch('/admin/recover', recoverPassword)
adminRouter.delete('/admin/:id', authAdmin, deleteOne)




module.exports = adminRouter
