const { User } = require("../models/models");
const authAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ id: req.user.userId });
    //role==0->user,1->admin
    if (!user.role === "ADMIN") {
      return res.status(400).json({ message: "admin resources access denied" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = authAdmin;
