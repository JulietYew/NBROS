const menuServices = require('../services/menuitem.services')
const mongoose = require ('mongoose')

const {
    createMenuItem,
    getAllMenuItem,
    getMenuItem,
    editMenuById,
    deleteMenuById
} = menuServices

class MenuItemController{
    // create a menu
    async createMenuItems(req, res){
         
        try{
            const adminId = req.admin.id
            if (!adminId){
                return res.status(401).send({
                    message: 'Unauthorized Access',
                    success: false
                     });
            }
            const menu = new menuServices.createMenuItem({
                admin: adminId,
                ...req.body
              });
              //await menu.populate('admin')
            return res.status(200).send({
                message: 'Menu created successfully',
                menu,
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
     async getMenu(req, res) {
        const menuId = req.params.orderId;
        //const customerId = req.customer.id
        try{
            const menu = await menuServices.getMenuItem({
                _id: menuId, 
                
        })
        if (!menu) {
            return res.status(404).send({
                message: 'Menu not found' || err.message,
                success: false
            });
        } else {
            // returns true if a particular order is available
            return res.status(200).send({
                message: 'Menu fetched successfully',
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
    // get all menu
    async fetchAll(req, res){
        //const customerId = req.customer.id
        try {
            const menu = await menuServices.getAllMenuItem()
            if (!menu) {
                return res.status(404).send({
                    message: 'Menu not found' || err.message,
                    success: false
                })
            } else {
                return res.status(200).send({
                    message: 'Menu found successfully', 
                    menu,
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
    // update a menu
    async editMenu(req, res){
        try{
            const menuId = req.params.orderId
            const menu = await menuServices.getMenuItem({ 
                _id: menuId  
            })
            if(!menu){
                return res.status(404).json({
                    message: 'Menu not found' || err.message,
                    success: false
                });
            }
            // update the menu details to the current one
            const updatedMenu = await menuServices.editMenuById(id, 
                ...req.body
            )
            return res.status(200).send({
                message: 'Menu updated successfully',
                success: true,
                data: updatedMenu
            });
        }catch (error) {
            return res.status(500).send({
                message: 'An Error occured: ' + error.message,
                success: false
            })
        }
    }
    // delete an menu
    async deleteMenu(req, res) {
        // check if a menu exist before deleting
        try {
            const { id } = req.params
            const existingMenu = await menuServices.getMenuItem({
                _id: id
            })
            if (!existingMenu) {
                return res.status(404).send({
                    message: 'No Menu found',
                    success: false
                })
            }
            // delete menu if the above condition was met
            await menuServices.deleteMenuById(id)
            return res.status(200).send({
                message: 'Menu deleted',
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
module.exports = new MenuItemController()