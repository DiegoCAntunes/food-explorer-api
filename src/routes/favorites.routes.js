const { Router } = require("express")

const FavoritesController = require("../controllers/FavoritesController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const favoritesRouter = Router();

const favoritesController = new FavoritesController();

favoritesRouter.post('/', ensureAuthenticated, favoritesController.create)
favoritesRouter.delete('/:id', ensureAuthenticated, favoritesController.delete)
favoritesRouter.get('/', ensureAuthenticated, favoritesController.index)


module.exports = favoritesRouter