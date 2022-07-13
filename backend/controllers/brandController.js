const { Brand } = require("../models/models");

const BrandController = {
  create: async (req, res) => {
    try {
      const { name } = req.body;
      const brand = await Brand.create({ name });
      res.json(brand);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const brands = await Brand.findAll();
      res.json(brands);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getOne: async (req, res) => {
    try {
      const brand = await Brand.findByPk(req.params.id);
      res.json(brand);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  updateOne: async (req, res) => {
    try {
      const { name } = req.body;
      const brand = await Brand.update(
        { name },
        { where: { id: req.params.id } }
      );
      res.json(brand);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  deleteOne: async (req, res) => {
    try {
      const brand = await Brand.destroy({ where: { id: req.params.id } });
      res.json(brand);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
module.exports = BrandController;
