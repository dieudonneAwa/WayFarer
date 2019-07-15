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
                                                seat_number INTEGER NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 ),
                                                first_name VARCHAR(255),
                                                last_name VARCHAR(255),
                                                email VARCHAR(255),
                                                created_on DATE,
                                                CONSTRAINT bookings_pkey PRIMARY KEY (id),
                                                CONSTRAINT bookings_bus_id_fk FOREIGN KEY (bus_id)
                                                    REFERENCES buses (id) MATCH SIMPLE
                                                    ON UPDATE CASCADE
                                                    ON DELETE CASCADE,
                                                CONSTRAINT bookings_trip_id_fk FOREIGN KEY (trip_id)
                                                    REFERENCES trips (id) MATCH SIMPLE
                                                    ON UPDATE CASCADE
                                                    ON DELETE CASCADE,
                                                CONSTRAINT bookings_user_id_fk FOREIGN KEY (user_id)
                                                    REFERENCES users (id) MATCH SIMPLE
                                                    ON UPDATE CASCADE
                                                    ON DELETE CASCADE )`;
    return queryString;
  },
};
