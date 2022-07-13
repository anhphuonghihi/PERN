const path = require("path");
const uuid = require("uuid");
const { Device, DeviceInfo } = require("../models/models");
const deviceController = {
  create: async (req, res) => {
    try {
      const { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });
      if (info) {
        info = JSON.parse(info);
        info.forEach((i) =>
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          })
        );
      }

      res.json(device);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      let { brandId, typeId, limit, page } = req.query;
      page = page || 1;
      limit = limit || 9;
      let offset = page * limit - limit;
      let devices;
      if (!brandId && !typeId) {
        devices = await Device.findAndCountAll({ limit, offset });
      }
      if (brandId && !typeId) {
        devices = await Device.findAndCountAll({
          where: { brandId },
          limit,
          offset,
        });
      }
      if (!brandId && typeId) {
        devices = await Device.findAndCountAll({
          where: { typeId },
          limit,
          offset,
        });
      }
      if (brandId && typeId) {
        devices = await Device.findAndCountAll({
          where: { typeId, brandId },
          limit,
          offset,
        });
      }
      return res.json(devices);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getOne: async (req, res) => {
    try {
      const { id } = req.params;
      const device = await Device.findOne({
        where: { id },
        include: [{ model: DeviceInfo, as: "info" }],
      });
      return res.json(device);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  updateOne: async (req, res) => {
    try {
      const { name, price, brandId, typeId, info } = req.body;
      const device = await Device.update(
        { name, price, brandId, typeId, info },
        { where: { id: req.params.id } }
      );
      res.json(device);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  deleteOne: async (req, res) => {
    try {
      const device = await Device.destroy({ where: { id: req.params.id } });
      res.json(device);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
module.exports = deviceController;
