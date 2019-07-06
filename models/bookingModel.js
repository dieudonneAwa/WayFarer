import db from '../db';

export default class Booking {
  constructor(booking) {
    if (booking && booking.id) {
      this.id = booking.id;
    }
    this.trip_id = booking && booking.trip_id ? booking.trip_id : null;
    this.user_id = booking && booking.user_id ? booking.user_id : null;
    this.created_on = booking && booking.created_on ? booking.created_on : null;
  }

  async save() {
    const params = [this.created_on];
    try {
      const { rows } = await db.query(`INSERT INTO bookings 
      (trip_id, user_id, created_on)
      VALUES ((SELECT id FROM trips), (SELECT id FROM users), $1) RETURNING *`, params);
      const newBooking = new Booking(rows[0]);
      return newBooking;
    } catch (error) {
      throw error;
    }
  }
}
