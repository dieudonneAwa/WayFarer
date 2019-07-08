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

  // eslint-disable-next-line class-methods-use-this
  async save() {
    // const params = [this.trip_id, this.user_id, this.bus_id];
    try {
      const { rows } = await db.query(`INSERT INTO bookings 
                          (created_on)
                          VALUES (Now()) RETURNING *`);
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

  static async delete(bookingId) {
    try {
      const result = await db.query('DELETE FROM bookings WHERE id=$1', [bookingId]);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
