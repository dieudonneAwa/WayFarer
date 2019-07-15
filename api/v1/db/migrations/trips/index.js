
export default {
  dropTripsTable: () => {
    const queryString = 'DROP TABLE IF EXISTS trips';
    return queryString;
  },

  createTripsTable: () => {
    const queryString = `CREATE TABLE trips ( id SERIAL PRIMARY KEY,
                                              bus_id INTEGER,
                                              origin varchar(255),
                                              destination varchar(255),
                                              trip_date DATE,
                                              fare DOUBLE PRECISION,
                                              status DOUBLE PRECISION,
                                              )`;
    return queryString;
  },
};
