import { Schema, model as createModel, Document } from 'mongoose';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import MongoModel from './MongoModel';

interface MotorcycleDocument extends Motorcycle, Document { };

const motorcycleSchema = new Schema<MotorcycleDocument>({
  category: String,
  engineCapacity: Number,
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
}, { versionKey: false });

export default class MotorcycleModel extends MongoModel<Motorcycle> {
  constructor(model = createModel('Motos', motorcycleSchema)) { 
    super(model);
  }
}
