import express from 'express';
import * as dataController from '../controllers/dataController.js';

const router = express.Router();

router.post('/data/cliente', dataController.createCliente);
router.post('/data/cliente/:label', dataController.createDataByCliente);
router.get('/data/cliente/:cliente/:label', dataController.getDataByCliente);
router.put('/data/cliente/:cliente/:label', dataController.updateDataByCliente);
router.delete('/data/cliente/:cliente/:label', dataController.deleteDataByCliente);
router.delete('/data/cliente/:cliente', dataController.deleteCliente);

export default router;