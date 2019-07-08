import { Pool } from 'pg';

const connectionString = 'postgresql://postgres:awa@localhost:5432/wayfarer';

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
