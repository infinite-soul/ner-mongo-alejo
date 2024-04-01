import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const dataSchema = new Schema({
    cliente: { type: String, required: true },
    patterns_auto_admisorio: [String],
    patterns_escrito_tutela: [String] 
});

export const DataModel = model('patterns-clientes', dataSchema);
// export const DataModel = model('epm-tutelas', dataSchema);