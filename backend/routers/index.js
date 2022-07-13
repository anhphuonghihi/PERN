const router = require("express").Router();


const brandRouter = require("./brandRouter");
const typeRouter = require("./typeRouter");
const userRouter = require("./userRouter");
const deviceRouter = require("./deviceRouter");
router.use("/brand", brandRouter);
router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/device', deviceRouter)

module.exports = router;
