import { Schema, model as createModel, Document } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import MongoModel from './MongoModel';

interface CarDocument extends Car, Document { }

const carSchema = new Schema<CarDocument>({
  doorsQty: Number,
  seatsQty: Number,
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
}, { versionKey: false });

export default class CarModel extends MongoModel<Car> {
  constructor(model = createModel('Carros', carSchema)) {
    super(model);
  }
}
