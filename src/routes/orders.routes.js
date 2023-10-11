const { Router } = require("express")

const OrdersController = require("../controllers/OrdersController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const ordersRouter = Router();

const ordersController = new OrdersController();

ordersRouter.post('/', ensureAuthenticated, ordersController.create)
ordersRouter.delete('/:id', ensureAuthenticated, ordersController.delete)
ordersRouter.get('/', ensureAuthenticated, ordersController.index)


module.exports = ordersRouter