import express from 'express';
import { createBooking } from '../controllers/bookingController.js';

const BookingRoute = express.Router()

BookingRoute.post('/', createBooking);
// BookingRoute.get('/', GetAllBookings);
// BookingRoute.get('/:id', GetBookingbyID);
// BookingRoute.put('/:id', UpdateBooking);

export default BookingRoute;