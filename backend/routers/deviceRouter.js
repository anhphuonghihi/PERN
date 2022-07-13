const router = require('express').Router()

const deviceController = require('../controllers/deviceController')

router.post('/', deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)
router.put("/:id", deviceController.updateOne);
router.delete("/:id", deviceController.deleteOne);

module.exports  = router

