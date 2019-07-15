import db from '../../index';

export default {
  dropBusesTable: () => {
    const queryString = 'DROP TABLE IF EXISTS buses';
    return queryString;
  },

  createBusesTable: () => {
    const queryString = `CREATE TABLE buses ( id SERIAL PRIMARY KEY,
                                              number_plate varchar(255),
                                              manufacturer varchar(255),
                                              model varchar(255),
                                              year varchar(255),
                                              capacity INTEGER )`;
    return queryString;
  },

  initBuses: () => {
    const params = ['CM 765 SW', 'Ford', '2000-5-8', 'V8', 6];
    const queryString = 'INSERT INTO buses (number_plate, manufacturer, model, year, capacity) VALUES ($1, $2, $3,$4, $5)';
    return db.query(queryString, params);
  },
};
