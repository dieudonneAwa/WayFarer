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
    const params = [this.created_on];
    try {
      const { rows } = await db.query(`INSERT INTO bookings 
                          (trip_id, user_id, bus_id, trip_date, first_name, last_name, email, created_on)
                          VALUES ((SELECT id FROM trips), 
                          (SELECT id FROM users), 
                          (SELECT id FROM buses), 
                          (SELECT trip_date FROM trips),
                          (SELECT first_name FROM users WHERE id = (SELECT id FROM users)),
                          (SELECT last_name FROM users WHERE id = (SELECT id FROM users)),
                          (SELECT email FROM users WHERE id = (SELECT id FROM users)), $1) RETURNING *`, params);
      const newBooking = new Booking(rows[0]);
      return newBooking;
    } catch (error) {
      throw error;
    }
  }

  static async adminFindAll(query = {}) {
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

      queryString = `SELECT * FROM bookings WHERE ${paramsString}`;
    } else {
      queryString = 'SELECT * FROM bookings WHERE user_id = (SELECT id FROM users WHERE is_admin = true)';
    }

    try {
      const { rows } = await db.query(queryString, params);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
}
