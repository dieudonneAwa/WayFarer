import uuid from 'uuid';

class Bus {
  /**
   * class constructor
   * @param data
   */
  constructor() {
    this.buses = [];
  }
  /**
   * @param {object} bus object
   */
  createBus(data) {
    const newBus = {
      id: uuid.v4(),
      number_plate: data.number_plate,
      manufacturer: data.manufacturer,
      model: data.model,
      year: data.year,
      capacity: data.capacity,
    }
    this.buses.push(newBus);
    return newBus;
  }
  /**
   * @param {uuid} id
   * @param {object} bus object
   */
  getBus(id) {
    return this.buses.find(bus => bus.id === id); 
  }
  /**
   * @param {object} return all buses
   */
  getBuses() {
    return this.buses;
  }
  /**
   * @param {uuid} id
   * @param {object} data
   */
  updateBuse(id, data) {
    this.buses.forEach((bus, index) => {
      if (bus.id === id) {
        this.buses[index] = {
          id: bus.id,
          number_plate: data.number_plate || bus.number_plate,
          manufacturer: data.manufacturer || bus.manufacturer,
          model: data.model || bus.model,
          year: data.year || bus.year,
          capacity: data.capacity || capacity,
        };
      }
    });
    return this.buses.find(bus => bus.id === id);
  }
  /**
   * @param id
   */
  deleteBus(id) {
    this.buses.forEach((bus) => {
      if (bus.id === id) {
        this.buses.splice(id, 1);
      }
      return {};
    });
  }
}

export default new Bus();
