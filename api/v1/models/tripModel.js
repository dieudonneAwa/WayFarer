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

  static async findAll() {
    let queryString = '';
    try {
      queryString = 'SELECT * FROM trips';
      const { rows } = await db.query(queryString);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async update() {
    const params = [this.bus_id, this.origin, this.destination, this.trip_date, this.fare,
      this.status, this.id];

    try {
      await db.query(`UPDATE trips SET 
                          bus_id=$1,
                          origin=$2,
                          destination=$3,
                          trip_date=$4,
                          fare=$5,
                          status=$6 
                      WHERE id=$7 RETURNING *`, params);
      const trip = await Trip.findById(this.id);
      return trip;
    } catch (error) {
      return error;
    }
  }

  static async delete(tripId) {
    try {
      const result = await db.query('DELETE FROM trips WHERE id = $1', [tripId]);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
