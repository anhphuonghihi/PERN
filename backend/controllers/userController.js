const { User, Basket } = require("../models/models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userController = {
  register: async (req, res) => {
    try {
      const { email, password, role } = req.body;
      const user = await User.findOne({ where: { email } });
      if (user)
        return res.status(400).json({ message: "The email already exists" });
      if (password.length < 6)
        return res.status(400).json({ message: "password is at the 6 char" });
      const passwordHash = await bcryptjs.hash(password, 10);
      const newUser = await User.create({
        email,
        role,
        password: passwordHash,
      });
      const basket = await Basket.create({ userId: newUser.id });
      const accesstoken = jwt.sign({ userId: newUser.id }, process.env.ACCESS, {
        expiresIn: "1d",
      });
      res.json({ accesstoken });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user)
        return res.status(400).json({ message: "User does not exists" });
      const isWatch = await bcryptjs.compare(password, user.password);
      if (!isWatch)
        return res.status(400).json({ message: "incorrect password" });
      const accesstoken = jwt.sign({ userId: user.id }, process.env.ACCESS, {
        expiresIn: "1d",
      });
      res.json({ accesstoken });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  profile: async (req, res) => {
    try {
      const user = await User.findByPk(req.user.userId);
      res.json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
module.exports = userController;
