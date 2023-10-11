const { Router } = require("express")

const IngredientsController = require("../controllers/IngredientsController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const ingredientsRouter = Router();

const ingredientsController = new IngredientsController();

ingredientsRouter.get('/', ensureAuthenticated, ingredientsController.index)


module.exports = ingredientsRouter