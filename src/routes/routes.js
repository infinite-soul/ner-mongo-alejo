// routes.js
import express from 'express';
import * as dataController from '../controllers/dataController.js';

const router = express.Router();


router.post('/data/cliente', dataController.createDataByCliente);
router.get('/data/cliente/:cliente', dataController.getDataByCliente);
router.put('/data/cliente/:cliente', dataController.updateDataByCliente);
router.delete('/data/cliente/:cliente', dataController.deleteDataByCliente);

export default router;
