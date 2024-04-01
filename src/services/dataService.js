// dataService.js
import { DataModel } from '../daos/mongodb/models/dataModel.js';

export async function createDataByCliente(data) {
    return await DataModel.create(data);
}

export async function getDataByCliente(cliente) {
    return await DataModel.findOne({ cliente });
}


export async function updateDataByCliente(cliente, newData) {
    const { patterns_auto_admisorio, patterns_escrito_tutela, delete_pattern } = newData;

    const updates = {};

    if (delete_pattern) {
        if (patterns_auto_admisorio) {
            if (Array.isArray(patterns_auto_admisorio)) {
                updates['$pull'] = { patterns_auto_admisorio: { $in: patterns_auto_admisorio } };
            } else {
                updates['$pull'] = { patterns_auto_admisorio: patterns_auto_admisorio };
            }
        }

        if (patterns_escrito_tutela) {
            if (Array.isArray(patterns_escrito_tutela)) {
                updates['$pull'] = updates['$pull'] || {};
                updates['$pull'].patterns_escrito_tutela = { $in: patterns_escrito_tutela };
            } else {
                updates['$pull'] = updates['$pull'] || {};
                updates['$pull'].patterns_escrito_tutela = patterns_escrito_tutela;
            }
        }
    } else {
        if (patterns_auto_admisorio && patterns_auto_admisorio.length > 0) {
            updates['$push'] = { patterns_auto_admisorio: { $each: patterns_auto_admisorio } };
        }

        if (patterns_escrito_tutela && patterns_escrito_tutela.length > 0) {
            updates['$push'] = updates['$push'] || {};
            updates['$push'].patterns_escrito_tutela = { $each: patterns_escrito_tutela };
        }
    }

    return await DataModel.findOneAndUpdate({ cliente }, updates, { new: true });
}

export async function deleteDataByCliente(cliente) {
    return await DataModel.findOneAndDelete({ cliente });
}