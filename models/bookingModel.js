import uuid from 'uuid';

class Booking {
  /**
   * class constructor
   * @param data
   */
  constructor() {
    this.bookings = [];
  }
  /**
   * @param {object} booking object
   */
  book(data) {
    const newBooking = {
      id: uuid.v4(),
      trip_id: data.trip_id,
      user_id: data.user_id,
      created_on: data.created_on,
    };
    this.bookings.push(newBooking);
    return newBooking;
  }
  /**
   * @param {uuid} id
   * @param {object} booking object
   */
  getBooking(id) {
    return this.bookings.find(booking => booking.id === id); 
  }
  /**
   * @param {object} return all bookings
   */
  getBookings() {
    return this.bookings;
  }
  /**
   * @param {uuid} id
   * @param {object} data
   */
  updateBooking(id, data) {
    this.bookings.forEach((booking, index) => {
      if (booking.id === id) {
        this.bookings[index] = {
          id: booking.id,
          trip_id: data.trip_id || booking.trip_id,
          user_id: data.user_id || booking.user_id,
          created_on: data.created_on || booking.created_on,
        };
      }
    });
    return this.bookings.find(booking => booking.id === id);
  }
  /**
   * @param id
   */
  cancelBooking(id) {
    this.bookings.forEach((booking) => {
      if (booking.id === id) {
        this.bookings.splice(id, 1);
      }
      return {};
    });
  }
}

export default new Booking();
