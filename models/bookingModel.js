import db from '../db';

export default class Booking {
  constructor(booking) {
    if (booking && booking.id) {
      this.id = booking.id;
    }
    this.trip_id = booking && booking.trip_id ? booking.trip_id : null;
    this.user_id = booking && booking.user_id ? booking.user_id : null;
    this.bus_id = booking && booking.bus_id ? booking.bus_id : null;
    this.created_on = booking && booking.created_on ? booking.created_on : null;
  }

  async save() {
    const params = [this.trip_id, this.user_id, this.bus_id];
    try {
      const { rows } = await db.query(`INSERT INTO bookings 
                          (trip_id, user_id, bus_id, created_on)
                          VALUES ($1, $2, $3, Now()) RETURNING *`, params);
      const newBooking = new Booking(rows[0]);
      return newBooking;
    } catch (error) {
      throw error;
    }
  }

  static async adminFindAll() {
    try {
      const queryString = 'SELECT * FROM bookings';
      const { rows } = await db.query(queryString);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
}
