import { Car, CarSchema } from '../interfaces/CarInterface';
import Service, { ServiceError } from '.';
import CarModel from '../models/Cars';

export default class CarService extends Service<Car> {
  constructor(model = new CarModel()) {
    super(model);
  }

  create = async (obj: Car): Promise<Car | null | ServiceError> => {
    const parsed = CarSchema.safeParse(obj);

    if (!parsed.success) return { error: parsed.error };

    return this.model.create(obj);
  };

  update = async (id: string, body: Car) => {
    const parserd = CarSchema.safeParse(body);

    if (!parserd.success) return { error: parserd.error };

    return this.model.update(id, body);
  };
}