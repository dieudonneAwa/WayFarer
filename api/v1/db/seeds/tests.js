import { config } from 'dotenv';
import { Client } from 'pg';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../index';

config();

let connectionString = '';
if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.TEST_DATABASE_URL;
} else {
  connectionString = process.env.DATABASE_URL;
}

const client = new Client({
  connectionString,
});
client.connect();

export const createToken = (user) => {
  const token = jwt.sign({
    id: user.id,
    is_admin: user.is_admin,
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30),
  }, process.env.JWT_SECRET, '');

  return token;
};

export const createUser = async (user) => {
  try {
    const passwordHash = bcrypt.hashSync(user.password, 10);
    const data = [user.first_name, user.last_name, user.username, user.email, user.is_admin, passwordHash];
    const sql = `INSERT INTO users (first_name, last_name, username, email, is_admin, password)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

    const { rows } = await db.query(sql, data);
    const userData = {
      id: rows[0].id,
      username: rows[0].username,
      email: rows[0].email,
      is_admin: rows[0].is_admin,
    };
    const token = createToken(userData);
    return token;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUsers = async () => {
  try {
    const result = await db.query('DELETE FROM users');
    return result;
  } catch (error) {
    console.log(error);
  }
};
