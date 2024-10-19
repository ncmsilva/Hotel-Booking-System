import express from 'express';
import { AddGalleryItem, GetGalleryItemById, GetGalleryItems } from '../controllers/galleryItemController.js';

// eslint-disable-next-line new-cap
const galleryItemRoute = express.Router();

galleryItemRoute.post('/', AddGalleryItem);
galleryItemRoute.get('/', GetGalleryItems)
galleryItemRoute.get('/:id', GetGalleryItemById)

export default galleryItemRoute;