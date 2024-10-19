import express from 'express';
import { AddGalleryItem, DeleteGalleryItem, GetGalleryItemById, GetGalleryItems, UpdateGalleryItem } from '../controllers/galleryItemController.js';

// eslint-disable-next-line new-cap
const galleryItemRoute = express.Router();

galleryItemRoute.post('/', AddGalleryItem);
galleryItemRoute.get('/', GetGalleryItems)
galleryItemRoute.get('/:id', GetGalleryItemById)
galleryItemRoute.patch('/:id', UpdateGalleryItem)
galleryItemRoute.delete('/:id', DeleteGalleryItem)

export default galleryItemRoute;