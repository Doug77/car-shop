import { Motorcycle, MotorcycleSchema } from '../interfaces/MotorcycleInterface';
import Service, { ServiceError } from '.';
import MotorcycleModel from '../models/Motorcycles';

export default class MotorcycleService extends Service<Motorcycle> {
  constructor(model = new MotorcycleModel()) {
    super(model);
  }

  create = async (obj: Motorcycle): Promise<Motorcycle | null | ServiceError> => {
    const parsed = MotorcycleSchema.safeParse(obj);

    if (!parsed.success) return { error: parsed.error };

    return this.model.create(obj);
  }
};
