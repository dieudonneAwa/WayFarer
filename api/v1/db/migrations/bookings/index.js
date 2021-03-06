export default {
  dropBookingsTable: () => {
    const queryString = 'DROP TABLE IF EXISTS bookings';
    return queryString;
  },

  createBookingsTable: () => {
    const queryString = `CREATE TABLE bookings ( id SERIAL PRIMARY KEY,
                                                trip_id INTEGER,
                                                user_id INTEGER,
                                                bus_id INTEGER,
                                                trip_date DATE,
                                                seat_number INTEGER NOT NULL,
                                                first_name VARCHAR(255),
                                                last_name VARCHAR(255),
                                                email VARCHAR(255),
                                                created_on TIMESTAMP DEFAULT NOW() )`;
    return queryString;
  },
};
