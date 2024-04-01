import { DataModel } from '../daos/mongodb/models/dataModel.js';


export async function createDataCliente(data) {
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

    const updates = {};

    if (delete_pattern) {
        if (patterns) {
            if (Array.isArray(patterns)) {
                updates['$pull'] = { [`${label}.patterns`]: { $in: patterns } };
            } else {
                updates['$pull'] = { [`${label}.patterns`]: patterns };
            }
        }
    } else {
        if (patterns && patterns.length > 0) {
            updates['$push'] = { [`${label}.patterns`]: { $each: patterns } };
        }

        if (labels) {
            updates['$set'] = { [`${label}.labels`]: labels };
        }
    }

    return await DataModel.findOneAndUpdate({ cliente }, updates, { new: true });
}

export async function deleteDataByCliente(cliente, label) {
    return await DataModel.findOneAndUpdate({ cliente }, { $unset: { [label]: 1 } }, { new: true });
}