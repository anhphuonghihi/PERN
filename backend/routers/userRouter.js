const router = require("express").Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

const userController = require("../controllers/userController");
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", auth,authAdmin,userController.profile);
module.exports = router;
