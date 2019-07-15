import { Client, Pool } from 'pg';
import users from './users';
import trips from './trips';
import buses from './buses';
import bookings from './bookings';

let connectionString = '';

if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.TEST_DATABASE_URL;
} else {
  connectionString = process.env.DATABASE_URL;
}

const pool = new Pool({
  connectionString,
});

const client = new Client({
  connectionString,
});
client.connect();

const initTables = async () => {
  try {
    // DROP TABLES
    await client.query(bookings.dropBookingsTable());
    await client.query(trips.dropTripsTable());
    await client.query(buses.dropBusesTable());
    await client.query(users.dropUsersTable());

    // CREATE TABLES
    await client.query(users.createUsersTable());
    await client.query(buses.createBusesTable());
    await client.query(trips.createTripsTable());
    await client.query(bookings.createBookingsTable());

    // INITIALIZE BUSES TABLE
    await buses.initBuses();

    // INITIALIZE USERS TABLE
    await users.initUsers();

    await client.end();
    console.log('Tables created successfully');
  } catch (error) {
    console.log(error);
  }
};

initTables();
