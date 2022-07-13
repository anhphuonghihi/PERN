const router = require("express").Router();

const brandController = require("../controllers/brandController");

router.get("/", brandController.getAll);
router.post("/", brandController.create);
router.get("/:id", brandController.getOne);
router.put("/:id", brandController.updateOne);
router.delete("/:id", brandController.deleteOne);
module.exports = router;
