# WayFarer
WayFarer is a public bus transportation booking server.

## WayFarer API

### Required features
1. User can sign up.
2. User can sign in.
3. Admin can create a trip.
4. Admin can cancel a trip.
5. Both Admin and Users can see all trips.
6. Users can book a seat on a trip.
7. View all bookings. An Admin can see all bookings, while user can see all of his/her
bookings.
8. Users can delete their booking.

### Added features
1. Admin can update a trip.
2. Both user and admin can get a particular trip.
3. Users can update their booking.
4. Admin can create a bus.
5. Both admin and users can get a bus.
6. Admin can delete a bus.
7. Admin can update a bus.


## API Endpoints

#### Sign up endpoint

| Endpoints | Request Method | Request parameter |
| ---------- |----------- | ------------- |
| /api/v1/auth/signup | POST | |

#### Sign in endpoint
| Endpoints | Request Method | Request parameter |
| ---------- |----------- | ------------- |
| /api/v1/auth/signin | POST | | 

#### Trips endpoint
| Endpoints | Request Method | Request parameter |
| --------- | ----------- | ------------- |
| /api/v1/trips | POST | | 
| /api/v1/trips | GET | |
| /api/v1/trips/:tripId | GET | tripId |
| /api/v1/trips/:tripId | PATCH | tripId |
| /api/v1/trips/:tripId | DELETE | tripId |

#### Bookings endpoint
| Endpoints | Request Method | Request parameter |
| --------- | ----------- | ------------- |
| /api/v1/bookings | POST | | 
| /api/v1/bookings | GET | |
| /api/v1/bookings/:bookingId | GET | bookingId |
| /api/v1/bookings/:bookingId | PATCH | bookingId |
| /api/v1/bookings/:bookingId | DELETE | bookingId |

#### Buses endpoint
| Endpoints | Request Method | Request parameter |
| --------- | ----------- | ------------- |
| /api/v1/buses | POST | | 
| /api/v1/buses | GET | |
| /api/v1/buses/:busId | GET | busId |
| /api/v1/buses/:busId | PATCH | busId |
| /api/v1/buses/:busId | DELETE | busId |


