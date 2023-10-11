const { Router } = require("express")
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const PlatesController = require("../controllers/PlatesController")
const AvatarController = require("../controllers/AvatarController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const platesRoutes = Router();
const upload = multer(uploadConfig.MULTER)

const platesController = new PlatesController();
const avatarController = new AvatarController();

platesRoutes.use(ensureAuthenticated)

platesRoutes.post('/', platesController.create)
platesRoutes.get('/:id', platesController.show)
platesRoutes.delete('/:id', platesController.delete)
platesRoutes.get('/', platesController.index)
platesRoutes.put('/:id', platesController.update)
platesRoutes.patch('/:id',upload.single("avatar"), avatarController.update)

module.exports = platesRoutes