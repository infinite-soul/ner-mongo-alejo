// dataService.js
import { DataModel } from '../daos/mongodb/models/dataModel.js';

export async function createDataByCliente(data) {
    return await DataModel.create(data);
}

export async function getDataByCliente(cliente) {
    return await DataModel.findOne({ cliente });
}


export async function updateDataByCliente(cliente, newData) {
    const { patterns_auto_admisorio, patterns_escrito_tutela } = newData;

    const updates = {};

    if (patterns_auto_admisorio && patterns_auto_admisorio.length > 0) {
        updates['$push'] = { patterns_auto_admisorio: { $each: patterns_auto_admisorio } };
    }

    if (patterns_escrito_tutela && patterns_escrito_tutela.length > 0) {

        updates['$push'] = updates['$push'] || {};
        updates['$push'].patterns_escrito_tutela = { $each: patterns_escrito_tutela };
    }


    return await DataModel.findOneAndUpdate({ cliente }, updates, { new: true });
}

export async function deleteDataByCliente(cliente) {
    return await DataModel.findOneAndDelete({ cliente });
}