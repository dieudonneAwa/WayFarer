import uuid from 'uuid';

class Trip {
  /**
   * class constructor
   * @param data
   */
  constructor() {
    this.trips = [];
  }
  /**
   * @param {object} trip object
   */
  createTrip(data) {
    const newTrip = {
      id: uuid.v4(),
      bus_id: data.bus_id,
      origin: data.origin,
      destination: data.destination,
      trip_date: data.trip_date,
      fare: data.fare,
      status: data.status,
    };
    this.trips.push(newTrip);
    return newTrip;
  }
  /**
   * @param {uuid} id
   * @param {object} trip object
   */
  getTrip(id) {
    return this.trips.find(trip => trip.id === id); 
  }
  /**
   * @param {object} return all trips
   */
  getTrips() {
    return this.trips;
  }
  /**
   * @param {uuid} id
   * @param {object} data
   */
  updateTrip(id, data) {
    this.trips.forEach((trip, index) => {
      if (trip.id === id) {
        this.trips[index] = {
          id: trip.id,
          bus_id: data.bus_id || trip.bus_id,
          origin: data.origin || trip.origin,
          destination: data.destination || trip.destination,
          trip_date: data.trip_date || trip.trip_date,
          fare: data.fare || trip.fare,
          status: data.status || trip.status,
        };
      }
    });
    return this.trips.find(trip => trip.id === id);
  }
  /**
   * @param id
   */
  deleteTrip(id) {
    this.trips.forEach((trip) => {
      if (trip.id === id) {
        this.trips.splice(id, 1);
      }
      return {};
    });
  }
}

export default new Trip();
