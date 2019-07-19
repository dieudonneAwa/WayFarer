# WayFarer
WayFarer is a public bus transportation booking server where a client can book a trip, view all his/her bookings and can cancel any if necessary. to understand more, visit the api documentation hosted on heroku at: [WayFarer API Documentation](http://adc-wayfarer-andela.herokuapp.com/api/v1/api-docs/)

[![Build Status](https://travis-ci.org/dieudonneAwa/WayFarer.svg?branch=develop)](https://travis-ci.org/dieudonneAwa/WayFarer)
[![Coverage Status](https://coveralls.io/repos/github/dieudonneAwa/WayFarer/badge.svg?branch=develop)](https://coveralls.io/github/dieudonneAwa/WayFarer?branch=develop)
[![Test Coverage](https://api.codeclimate.com/v1/badges/0650dfdb4caa3457a2bc/test_coverage)](https://codeclimate.com/github/dieudonneAwa/WayFarer/test_coverage)

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

### Optional features
1. Users can get a list of filtered trips based on origin.
2. Users can get a list of filtered trips based on destination.
3. Users can specify their seat numbers when making a booking.


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


## Example - Sign up
 
 ### Sign up a user
 
 URL: `http://adc-wayfarer-andela.herokuapp.com/api/v1/auth/signup`
 
 Request Type: POST
 
 Response: 
 ```json
 {
  "status": "Success",
  "data": {
    "id": 1,
    "first_name": "John",
    "last_name": "Richman",
    "username": "Richman",
    "email": "johnrichman@example.com",
    "is_admin": 0,
    "token": "eyJhbGciOiJIU..."
  }
}
 ``` 
 
 ### Sign in a user
 
 URL: `http://adc-wayfarer-andela.herokuapp.com/api/v1/auth/signin`
 
 Request Type: POST
 
 Response: 
 ```json
 {
  "status": "Success",
  "data": {
    "id": 1,
    "first_name": "John",
    "last_name": "Richman",
    "username": "Richman",
    "email": "johnrichman@example.com",
    "is_admin": false,
    "token": "eyJhbGciOiJIUzI1NiI..."
  }
}
 ```

## Examples - trips

### create a trip

URL: `http://adc-wayfarer-andela.herokuapp.com/api/v1/trips`

Request Type: POST

Response: 
  ```json
{
  "status": "Success",
  "data": {
    "id": 1,
    "bus_id": 0,
    "origin": "Yaounde",
    "destination": "Lagos",
    "trip_date": "2019-07-20T00:00:00.000Z",
    "fare": 70000,
    "status": 1
   }
}
  ```
  
  ### Get a specific trip
  
  URL: `http://adc-wayfarer-andela.herokuapp.com/api/v1/trips/2`
  
  Request Type: GET
  
  Response: 
  ```json
  {
    "status": "Success",
    "data": {
      "id": 1,
      "bus_id": 0,
      "origin": "Yaounde",
      "destination": "Lagos",
      "trip_date": "2019-07-20T00:00:00.000Z",
      "fare": 70000,
      "status": 1
     }
  }
  ```
  
  ### Update a trip
  
  URL: `http://adc-wayfarer-andela.herokuapp.com/api/v1/trips/2`
  
  Request Type: PATCH
  
  Response:
  ```json
  {
    "data": {
      "id": 1,
      "bus_id": 0,
      "origin": 0,
      "destination": 0,
      "trip_date": 0,
      "fare": 0,
      "status": 0
     },
     "message": "Trip updated successfully"
  }
  ```
  
  ### Delete a trip
  
  URL: `http://adc-wayfarer-andela.herokuapp.com/api/v1/trips/2`
  
  Request Type: DELETE
  
  Response:
  ```json
  {
    "status": "Trip deleted!",
    "data": []
  }
  ```
  
  ## Example - Buses
  
  ### Create bus
  
  URL: `http://adc-wayfarer-andela.herokuapp.com/api/v1/buses`
  
  Request Type: POST
  
  ### Get a specific bus
  
  URL: `http://adc-wayfarer-andela.herokuapp.com/api/v1/buses/1`
  
  Request Type: GET
  
  ### Update a bus
  
  URL: `http://adc-wayfarer-andela.herokuapp.com/api/v1/buses/1`

  Request Type: PATCH
  
  ### Delete a bus
  
  URL: `http://adc-wayfarer-andela.herokuapp.com/api/v1/buses/1`
  
  Request Type: DELETE
  
  
  ## Example - Bookings
  
  ### Create a booking
  
  URL: `http://adc-wayfarer-andela.herokuapp.com/api/v1/bookings`
  
  Request Type: POST
  
  ### Get a specific booking
  
  URL: `http://adc-wayfarer-andela.herokuapp.com/api/v1/bookings/1`
  
  Request Type: GET
  
  ### Update a booking
  
  URL: `http://adc-wayfarer-andela.herokuapp.com/api/v1/bookings/1`

  Request Type: PATCH
  
  ### Delete a booking
  
  URL: `http://adc-wayfarer-andela.herokuapp.com/api/v1/bookings/1`
  
  Request Type: DELETE
 
