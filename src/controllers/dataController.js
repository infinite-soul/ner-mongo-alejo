import * as dataService from '../services/dataService.js';

export async function createCliente(req, res) {
    try {
        const data = await dataService.createCliente(req.body);
        res.json(data);
    } catch (error) {
        const err = new Error(error.message);
        res.status(500).json({ message: err.message });
    }
}

export async function createDataByCliente(req, res) {
    try {
        const { label } = req.params;
        const data = await dataService.createDataByCliente(req.body, label);
        res.json(data);
    } catch (error) {
        const err = new Error(error.message);
        res.status(500).json({ message: err.message });
    }
}

export async function getDataByCliente(req, res) {
    try {
        const { cliente, label } = req.params;
        const data = await dataService.getDataByCliente(cliente, label);
        res.json(data);
    } catch (error) {
        const err = new Error(error.message);
        res.status(500).json({ message: err.message });
    }
}

export async function getCliente(req, res) {
    try {
        const { cliente } = req.params;
        const data = await dataService.getCliente(cliente);
        if (!data) {
            const err = new Error('Cliente no encontrado');
            return res.status(404).json({ message: err.message });
        }
        res.json(data);
    } catch (error) {
        const err = new Error(error.message);
        res.status(500).json({ message: err.message });
    }
}

export async function updateDataByCliente(req, res) {
    try {
        const { cliente, label } = req.params;
        const updatedData = await dataService.updateDataByCliente(cliente, label, req.body);
        res.json(updatedData);
    } catch (error) {
        const err = new Error(error.message);
        res.status(500).json({ message: err.message });
    }
}

export async function deleteDataByCliente(req, res) {
    try {
        const { cliente, label } = req.params;
        const deleteData = await dataService.deleteDataByCliente(cliente, label);
        res.json(deleteData);
    } catch (error) {
        const err = new Error(error.message);
        res.status(500).json({ message: err.message });
    }
}

export async function deleteCliente(req, res) {
    try {
        const { cliente } = req.params;
        const deletedCliente = await dataService.deleteCliente(cliente);
        if (!deletedCliente) {
            const err = new Error('Cliente no encontrado');
            return res.status(404).json({ message: err.message });
        }
        res.json({ message: 'Cliente eliminado exitosamente' });
    } catch (error) {
        const err = new Error(error.message);
        res.status(500).json({ message: err.message });
    }
}