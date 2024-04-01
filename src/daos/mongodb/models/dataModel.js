import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const patternSchema = new Schema({
    patterns: [String],
    labels: Object
});

const dataSchema = new Schema({
    cliente: { type: String, required: true },
    auto_admisorio: patternSchema,
    escrito_tutela: patternSchema
});

export const DataModel = model('patterns-clientes-prueba', dataSchema);