const { Type } = require("../models/models");

const typeController = {
  create: async (req, res) => {
    try {
      const { name } = req.body;
      const type = await Type.create({ name });
      res.json(type);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const types = await Type.findAll();
      res.json(types);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getOne: async (req, res) => {
    try {
      const type = await Type.findByPk(req.params.id);
      res.json(type);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  updateOne: async (req, res) => {
    try {
      const { name } = req.body;
      const type = await Type.update(
        { name },
        { where: { id: req.params.id } }
      );
      res.json(type);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  deleteOne: async (req, res) => {
    try {
      const type = await Type.destroy({ where: { id: req.params.id } });
      res.json(type);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
module.exports = typeController;
