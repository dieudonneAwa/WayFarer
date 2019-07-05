/* eslint-disable class-methods-use-this */
import db from '../db';

export default class Trip {
  constructor(trip) {
    if (trip && trip.id) {
      this.id = trip.id;
    }
    this.bus_id = trip && trip.bus_id ? trip.bus_id : 0;
    this.origin = trip && trip.origin ? trip.origin : 0;
    this.destination = trip && trip.destination ? trip.destination : 0;
    this.trip_date = trip && trip.trip_date ? trip.trip_date : 0;
    this.fare = trip && trip.fare ? trip.fare : 0;
    this.status = trip && trip.status ? trip.status : 0;
  }

  async save() {
    const params = [this.origin, this.destination, this.trip_date, this.fare, this.status];
    try {
      const { rows } = await db.query(`INSERT INTO trips 
      (origin, destination, trip_date, fare, status)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`, params);
      const newTrip = new Trip(rows[0]);
      return newTrip;
    } catch (error) {
      throw error;
    }
  }

  static async findById(tripId) {
    try {
      const { rows } = await db.query('SELECT * FROM trips WHERE id=$1 LIMIT 1', [tripId]);
      return rows.length ? new Trip(rows[0]) : false;
    } catch (error) {
      throw error;
    }
  }

  static async findAll(query = {}) {
    let paramsString = '';
    let queryString = '';
    const params = [];

    if (Object.keys(query).length > 0) {
      // Build query string from parameters
      Object.keys(query).map((key, index) => {
        index += 1;
        const extendQuery = index === 1 ? '' : ' AND';
        paramsString += `${extendQuery} ${key}=$${index}`;
        params.push(query[key]);
        return key;
      });

      queryString = `SELECT * FROM trips WHERE ${paramsString}`;
    } else {
      queryString = 'SELECT * FROM trips';
    }

    try {
      const { rows } = await db.query(queryString, params);
      return rows;
    } catch (error) {
      throw error;
    }
  }
}
