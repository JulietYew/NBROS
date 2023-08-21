const { MESSAGES } = require('../config/constants.config')
const customerServices = require('../services/customer.services')
const mongoose = require('mongoose')
const checkValidId = require('../utils/validateID')

const {
    createCustomer,
    getACustomerById,
    deleteCustomer,
    updateCustomer,
    getAllCustomers,
    getACustomerByEmail
} = customerServices

class CustomerController {
    async signUp(req, res) {
        try {
            const { password, email } = req.body;
            const data = req.body
            const findCustomerEmail = await getACustomerByEmail({ email: email });
            if (!email) {
                return res.status(404).send({
                    message: 'Enter email address',
                    success: false
                })
            }
            if (findCustomerEmail) {
                return res.status(400).send({
                    success: false,
                    message: MESSAGES.CUSTOMER.DUPLICATE_EMAIL
                });
            }
            if (!password) {
                return res.status(400).send({
                    success: false,
                    message: MESSAGES.CUSTOMER.INCORRECT_DETAILS
                });
            }
            const user = await createCustomer(data);
            return user
                ? res.status(201).send({
                    message: 'Customer created successfully',
                    success: true,
                })
                : res.status(400).send({
                    message: 'Customer not created',
                    success: false
                });

        }
        catch (error) {
            return {
                success: false,
                message: MESSAGES.CUSTOMER.ERROR || error
            };
        }
    }
    async Login(req, res, next) { 
        try {
            let { email, password } = req.body
            //const enteredPassword = req.body.password
            let user = await getACustomerByEmail({ email: email })
            if (!user) {
                return res.status(404).send({
                    message: MESSAGES.CUSTOMER.INCORRECT_DETAILS,
                    success: false
                });
            }
            if (!user || user === null){
                return res.status(404).send({
                    message: "User does not exist, do you want to sign up",
                    success: false
                });
            } 
            // hash the password
            // generate token
            // bcrypt compare
        }catch(err) {
            return res.status(500).send({
                message: 'Internal Server Error' + err,
                success: false
            });

        }
    }
    //logout customer
    async loggedOut(req, res, next) {
        try {
            const token = '';
            await res.cookie("token", token, { httpOnly: true })
            return res.status(200).send({
                message: "Customer logged out successfully",
                token: token,
                success: true
            })
        } catch {
            return res.status(500).send({
                message: 'Internal Server Error' + err,
                success: false
            })
        }
    };
    
    //delete customer
    async deleteOne(req, res) {
        // check if a customer exist before deleting
        try {
            const { id } = req.params
            const check = checkValidId(id)
            if (check) {
                const existingCustomer = await customerServices.getACustomerById({
                    _Id: id
                })
                if (!existingCustomer) {
                    return res.status(404).send({
                        message: MESSAGES.CUSTOMER.CUSTOMER_NOT_FOUND,
                        success: false
                    })
                }
                // delete customer if the customer was found
                await customerServices.deleteCustomer(id)
                return res.status(200).send({
                    message: MESSAGES.CUSTOMER.ACCOUNT_DELETED,
                    success: true,
                    
                })
            } else {
                //if inputted id is invalid
                return res.status(400).send({
                    message: 'Invalid id',
                    success: false
                })
            }
        } catch (error) {
            return res.status(500).send({
                message: 'Error: ' + error.message,
                success: false
            })
        }
    }
    async updateACustomer(req, res) {
        try {
            const { id } = req.params
            const data = req.body
            //check  if valid id
            const check = checkValidId(id)
            if (check) {
                const findCustomer = await getACustomerById(id)
                if (findCustomer) {
                    const updated = await updateCustomer(id, req.body)
                    if (updated) {
                        return res.status(200).send({
                            success: true,
                            message: MESSAGES.CUSTOMER.ACCOUNT_UPDATED,
                            updated
                        })
                    } else {
                        return res.status(409).send({
                            success: false,
                            message: MESSAGES.CUSTOMER.NOT_UPDATED
                        })
                    }
                } else {
                    return res.status(400).send({
                        success: false,
                        message: MESSAGES.CUSTOMER.ACCOUNT_NOT_REGISTERED
                    })
                }
            } else {
                return res.status(400).send({
                    success: false,
                    message: MESSAGES.CUSTOMER.INCORRECT_DETAILS
                })
            }
        } catch (error) {
            return {
                message: MESSAGES.CUSTOMER.ERROR + error.message,
                success: false
            };
        }
    }
    async recoverPassword(req, res) {
        try {
            let { email } = req.body
            let newPassword = req.body.password
            if (!email) {
                return res.status(404).send({
                    message: 'Enter email address',
                    success: false
                })
            }
            if (!newPassword) {
                return res.status(404).send({
                    message: 'Enter new password',
                    success: false
                })
            }
            const customer = await getACustomerByEmail({ email: email });
            if (!customer) {
                return res.status(404).send({
                    message: 'Email is not registered',
                    success: false
                })
            }
            const id = customer._id;
            const updated = await customerServices.updateCustomer(
                id,
                { password: newPassword },
            );
            console.log(updated)
            const { password, ...data } = customer.toJSON()
            return res.status(200).send({
                message: 'Password changed',
                success: true,
                data: data
            })

        } catch (error) {
            return {
                message: MESSAGES.CUSTOMER.ERROR + error.message,
                success: false,
            };
        }
    }
    //get a customer
    async findACustomer(req, res) {
        try {
            const { id } = req.params
            //check  if valid id
            const check = checkValidId(id)
            if (check) {
                const findCustomer = await getACustomerById(id)
                if (findCustomer) {
                    return res.status(200).send({
                        success: true,
                        message: MESSAGES.CUSTOMER.USER_FOUND,
                        data: findCustomer
                    })
                }
                return res.status(400).send({
                    success: false,
                    message: MESSAGES.CUSTOMER.CUSTOMER_NOT_FOUND
                })
            }
        } catch (error) {
            return {
                message: MESSAGES.CUSTOMER.ERROR + err.message,
                success: false,
            };
        }
    }


    //get all customers
    async fetchAllCustomers(req, res) {
        try {
            const getCustomers = await getAllCustomers()
            if (getCustomers) {
                return res.status(200).send({
                    success: true,
                    message: MESSAGES.CUSTOMER.CUSTOMER_FOUND,
                    data: getCustomers
                })
            }
            return res.status(400).send({
                success: false,
                message: MESSAGES.CUSTOMER.CUSTOMER_NOT_FOUND
            })
        }
        catch (error) {
            return {
                message: MESSAGES.CUSTOMER.ERROR + error.message,
                success: false,
            };
        }
    }
}
module.exports = new CustomerController()
