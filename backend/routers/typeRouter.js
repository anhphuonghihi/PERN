const router = require("express").Router();

const typeController = require("../controllers/typeController");

router.post("/", typeController.create);
router.get("/", typeController.getAll);
router.get("/:id", typeController.getOne);
router.put("/:id", typeController.updateOne);
router.delete("/:id", typeController.deleteOne);
module.exports = router;
