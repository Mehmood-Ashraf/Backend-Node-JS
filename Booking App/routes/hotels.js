import express from 'express'
import { countByCity, createHotel, deleteHotel, getHotel, getHotels, updateHotel } from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// Create
router.post('/', verifyAdmin, createHotel)

// Update
router.put('/:id', verifyAdmin, updateHotel)

// Delete
router.delete('/:id', verifyAdmin, deleteHotel)

// get
router.get('/find/:id', getHotel)

//get all
router.get('/', getHotels)
router.get('/countByCity', countByCity)
router.get('/countByType', getHotels)


export default router