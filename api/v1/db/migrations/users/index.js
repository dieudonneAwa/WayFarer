import db from '../../index';

export default {
  // 1 drop users table
  dropUsersTable: () => {
    const queryString = 'DROP TABLE IF EXISTS users';
    return queryString;
  },

  // 2 create users table
  createUsersTable: () => {
    const queryString = `CREATE TABLE users ( id SERIAL PRIMARY KEY,
                                              first_name varchar(255),
                                              last_name varchar(255),
                                              username varchar(255),
                                              email varchar(255),
                                              is_admin boolean,
                                              password varchar(255) )`;
    return queryString;
  },

  // Initialize users table
  initUsers: () => {
    const params = ['Awa', 'Alexis', 'Alex', 'alex@example.com', true, '12345678'];
    const queryString = `INSERT INTO users (first_name, last_name, username, email, is_admin, password) 
                        VALUES 
                        ($1, $2, $3,$4, $5, $6) RETURNING *`;
    return db.query(queryString, params);
  },
};
