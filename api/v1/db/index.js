import { Pool } from 'pg';
import { config } from 'dotenv';

config();

let connectionString = '';

if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.TEST_DATABASE_URL;
} else {
  connectionString = process.env.DATABASE_URL;
}


const pool = new Pool({
  connectionString,
});

export default {
  async query(text, params) {
    try {
      const res = await pool.query(text, params);
      return res;
    } catch (error) {
      throw error;
    }
  },
};
