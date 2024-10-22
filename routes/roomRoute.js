import express from 'express';
import { createRoom, DeleteRoom, getRoomById, getRooms, getRoomsByCategory, UpdateRoom } from '../controllers/roomController.js';


const roomRoute = express.Router();

roomRoute.get('/', getRooms);
roomRoute.get('/:id', getRoomById);
roomRoute.post('/', createRoom);
roomRoute.put('/:id', UpdateRoom);
roomRoute.delete('/:id', DeleteRoom);
roomRoute.get("/category/:category", getRoomsByCategory)

export default roomRoute;