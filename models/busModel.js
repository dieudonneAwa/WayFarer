import db from '../db';

export default class Bus {
  constructor(bus) {
    if (bus && bus.id) {
      this.id = bus.id;
    }
    this.number_plate = bus && bus.number_plate ? bus.number_plate : null;
    this.manufacturer = bus && bus.manufacturer ? bus.manufacturer : null;
    this.model = bus && bus.model ? bus.model : null;
    this.year = bus && bus.year ? bus.year : null;
    this.capacity = bus && bus.capacity ? bus.capacity : null;
  }

  async save() {
    const params = [this.number_plate, this.manufacturer, this.model, this.year, this.capacity];
    try {
      const { rows } = await db.query(`INSERT INTO buses 
            (number_plate, manufacturer, model, year, capacity)
      VALUES 
            ($1, $2, $3, $4, $5) RETURNING *`, params);
      const newBus = new Bus(rows[0]);
      return newBus;
    } catch (error) {
      throw error;
    }
  }

  static async findAll() {
    try {
      const queryString = 'SELECT * FROM buses';
      const { rows } = await db.query(queryString);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async findById(busId) {
    try {
      const { rows } = await db.query('SELECT * FROM buses WHERE id=$1 LIMIT 1', [busId]);
      return rows.length ? new Bus(rows[0]) : false;
    } catch (error) {
      throw error;
    }
  }

  async update() {
    const params = [this.number_plate, this.manufacturer, this.model, this.year, this.capacity, this.id];
    try {
      const { rows } = await db.query(`UPDATE buses SET 
                          number_plate=$1,
                          manufacturer=$2,
                          model=$3,
                          year=$4,
                          capacity=$5 
                      WHERE id=$6 RETURNING *`, params);
      const bus = new Bus(rows[0]);
      return bus;
    } catch (error) {
      return error;
    }
  }
}
