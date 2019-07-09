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

  async updatebus(req, res) {
    const { busId } = req.params;
    if (busId == null) {
      res.status(400).send({ status: 'error', errors: 'A valid bus Id is required' });
    }

    const bus = await Bus.findById(busId);
    if (!bus.id) {
      res.status(200).send({ status: 'error', errors: 'bus not found' });
    }

    bus.number_plate = req.body.number_plate;
    bus.manufacturer = req.body.manufacturer;
    bus.model = req.body.model;
    bus.year = req.body.year;
    bus.capacity = req.body.capacity;
    const updatedBus = await bus.update();

    res.status(200).json({ data: updatedBus, message: 'Bus updated successfully' });
  },
};
