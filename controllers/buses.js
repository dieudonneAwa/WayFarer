import jwt from 'jsonwebtoken';
import Bus from '../models/busModel';

const createTokenById = async (bus) => {
  const newBus = {
    id: bus.id,
    number_plate: bus.number_plate,
    manufacturer: bus.manufacturer,
    model: bus.model,
    year: bus.year,
    capacity: bus.capacity,
  };
  const token = jwt.sign(newBus, 'process.env.JWT_SECRET', '');
  newBus.token = token;
  return newBus;
};

export default {
  async addBus(req, res) {
    try {
      const bus = new Bus(req.body);
      const newBus = await bus.save();

      return res.status(201).json({ status: 'Success', data: newBus });
    } catch (error) {
      throw error;
    }
  },

  async getAllBuses(req, res) {
    try {
      const allBuses = await Bus.findAll();
      if (!allBuses.length) {
        return res.status(200).send({ status: 'No buses yet', data: [] });
      }
      return res.status(200).json({ status: 'Success', data: allBuses });
    } catch (error) {
      throw error;
    }
  },
};
