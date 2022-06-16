import { Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import MotorcycleService from '../services/Motorcycles';
import { Motorcycle } from '../interfaces/MotorcycleInterface';

export default class MotorcycleController extends Controller<Motorcycle> {
  private _route: string;

  constructor(
    service = new MotorcycleService(),
    route = '/motorcycles',
  ) {
    super(service);
    this._route = route;
  }

  get route() { return this._route };

  create = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      if (!body) return res.status(400).json({ error: this.errors.badRequest });

      const motorcycles = await this.service.create(body);

      if (!motorcycles) {
        return res.status(500).json({ error: this.errors.internal });
      }

      if ('error' in motorcycles) {
        return res.status(400).json(motorcycles);
      }

      return res.status(201).json(motorcycles);
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
};
