// dataController.js
import * as dataService from '../services/dataService.js';

export async function createDataByCliente(req, res) {
    try {
        const data = await dataService.createDataByCliente(req.body);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getDataByCliente(req, res) {
    try {
        const data = await dataService.getDataByCliente(req.params.cliente);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function updateDataByCliente(req, res) {
    try {
        const updatedData = await dataService.updateDataByCliente(req.params.cliente, req.body);
        res.json(updatedData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export async function deleteDataByCliente(req, res) {
    try {
        await dataService.deleteDataByCliente(req.params.cliente);
        res.json({ message: 'Data deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}