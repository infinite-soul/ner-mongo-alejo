import { DataModel } from '../daos/mongodb/models/dataModel.js';


export async function createCliente(data) {
    const newData = {
        cliente: data.cliente,
        auto_admisorio: {
            patterns: data.auto_admisorio.patterns || [],
            labels: data.auto_admisorio.labels || {}
        },
        escrito_tutela: {
            patterns: data.escrito_tutela.patterns || [],
            labels: data.escrito_tutela.labels || {}
        }
    };
    return await DataModel.create(newData);
}

export async function createDataByCliente(data, label) {
    const newData = { cliente: data.cliente };
    newData[label] = { patterns: [], labels: {} };
    return await DataModel.create(newData);
}

export async function getDataByCliente(cliente, label) {
    return await DataModel.findOne({ cliente }, { [label]: 1, _id: 0 });
}

export async function updateDataByCliente(cliente, label, newData) {
    const { patterns, labels, delete_pattern } = newData;

    // Actualizar patterns
    const patternUpdates = {};
    if (delete_pattern) {
        if (Array.isArray(patterns)) {
            patternUpdates['$pullAll'] = { [`${label}.patterns`]: patterns };
        } else {
            patternUpdates['$pull'] = { [`${label}.patterns`]: patterns };
        }
    } else {
        if (patterns && patterns.length > 0) {
            patternUpdates['$push'] = { [`${label}.patterns`]: { $each: patterns } };
        }
    }

    // Actualizar labels
    const labelUpdates = {};
    if (labels) {
        const labelsToSet = {};
        const labelsToUnset = {};

        Object.entries(labels).forEach(([key, value]) => {
            if (value === null) {
                labelsToUnset[`${label}.labels.${key}`] = 1;
            } else if (typeof value === 'object' && value.delete_label) {
                labelsToUnset[`${label}.labels.${key}`] = 1;
            } else {
                labelsToSet[`${label}.labels.${key}`] = value;
            }
        });

        if (Object.keys(labelsToSet).length > 0) {
            labelUpdates['$set'] = labelsToSet;
        }
        if (Object.keys(labelsToUnset).length > 0) {
            labelUpdates['$unset'] = labelsToUnset;
        }
    }

    const updates = { ...patternUpdates, ...labelUpdates };

    return await DataModel.findOneAndUpdate({ cliente }, updates, { new: true });
}

export async function deleteDataByCliente(cliente, label) {
    return await DataModel.findOneAndUpdate({ cliente }, { $unset: { [label]: 1 } }, { new: true });
}

export async function deleteCliente(cliente) {
    return await DataModel.findOneAndDelete({ cliente });
}