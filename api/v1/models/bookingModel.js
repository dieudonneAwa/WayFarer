import db from '../db';

export default class Booking {
  constructor(booking) {
    if (booking && booking.id) {
      this.id = booking.id;
    }
    this.trip_id = booking && booking.trip_id ? booking.trip_id : null;
    this.user_id = booking && booking.user_id ? booking.user_id : null;
    this.bus_id = booking && booking.bus_id ? booking.bus_id : null;
    this.seat_number = booking && booking.seat_number ? booking.seat_number : 0;
    this.created_on = booking && booking.created_on ? booking.created_on : null;
  }

  // eslint-disable-next-line class-methods-use-this
  async save() {
    const params = [this.trip_id, this.user_id, this.bus_id, this.seat_number];
    try {
      const { rows } = await db.query(`INSERT INTO bookings 
                          (trip_id, user_id, bus_id, seat_number, created_on)
                          VALUES ($1, $2, $3, $4, Now()) RETURNING *`, params);
      const newBooking = new Booking(rows[0]);
      return newBooking;
    } catch (error) {
      throw error;
    }
  }

  static async findById(bookingId) {
    try {
      const { rows } = await db.query('SELECT * FROM bookings WHERE id=$1 LIMIT 1', [bookingId]);
      return rows.length ? new Booking(rows[0]) : false;
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
      throw error;
    }
  }

  async update() {
    const params = [this.trip_id, this.user_id, this.bus_id, this.seat_number, this.id];
    try {
      const { rows } = await db.query(`UPDATE bookings SET 
      trip_id=$1, user_id=$2, bus_id=$3, seat_number=$4, created_on=NOW() WHERE id=$5 RETURNING *`, params);
      const booking = new Booking(rows[0]);
      return booking;
    } catch (error) {
      throw error;
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
