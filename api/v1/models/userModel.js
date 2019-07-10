import db from '../db';

export default class User {
  constructor(user) {
    if (user && user.id) {
      this.id = user.id;
    }
    this.first_name = user && user.first_name ? user.first_name : 0;
    this.last_name = user && user.last_name ? user.last_name : 0;
    this.username = user && user.username ? user.username : 0;
    this.email = user && user.email ? user.email : 0;
    this.is_admin = user && user.is_admin ? user.is_admin : 0;
    this.password = user && user.password ? user.password : 0;
  }

  // eslint-disable-next-line consistent-return
  async save() {
    const params = [this.first_name, this.last_name, this.username, this.email, this.is_admin, this.password];
    try {
      const { rows } = await db.query(`INSERT INTO users 
        (first_name, last_name, username, email, is_admin, password)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, params);
      const newUser = new User(rows[0]);
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }

  static async find(query = {}) {
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

      queryString = `SELECT * FROM users WHERE ${paramsString}`;
    } else {
      queryString = 'SELECT * FROM users';
    }

    try {
      const { rows } = await db.query(queryString, params);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }

  static async findById(userId) {
    try {
      const { rows } = await db.query('SELECT * FROM users WHERE id=$1 LIMIT 1', [userId]);
      return rows.length ? new User(rows[0]) : false;
    } catch (error) {
      console.log(error);
    }
  }
}
