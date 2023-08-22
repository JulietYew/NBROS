const { Router } = require('express')
const customerRoutes = require('./customer.route')
const adminRoutes = require('./admin.route')
const router = Router()

router.use('/v1', adminRoutes)
router.use('/v1', customerRoutes)


module.exports = router