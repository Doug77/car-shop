import { Model as M, Document } from 'mongoose';
import { Model } from '../interfaces/ModelInterface';

export default abstract class MongoModel<T> implements Model<T> {
  constructor(protected model: M<T & Document>) { }

  create = async (obj: T): Promise<T> => this.model.create({ ...obj });

  read = async (): Promise<T[]> => this.model.find();

  readOne = async (str: string): Promise<T | null> => {
    const result = this.model.findOne({ _id: str });

    return result;
  };

  update = async (str: string, obj: T): Promise<T | null> => {
    const result = this
      .model.findByIdAndUpdate(str, obj, { new: true });

    return result;
  };

  delete = async (str: string): Promise<T | null> => {
    const result = this.model.findOneAndDelete({ _id: str });

    return result;
  };
}