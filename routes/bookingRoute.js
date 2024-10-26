import express from 'express';
import { cancelBooking, confirmBooking, createBooking, getBookingById, getBookings, UpdateBooking } from '../controllers/bookingController.js';

const BookingRoute = express.Router()

BookingRoute.post('/', createBooking);
BookingRoute.patch('/confirm/:id', confirmBooking);
BookingRoute.get('/', getBookings);
BookingRoute.get('/:id', getBookingById);
BookingRoute.put('/:id', UpdateBooking);
BookingRoute.patch('/cancel/:id', cancelBooking);

export default BookingRoute;