import { Request, Response } from 'express';
import Service from '../services';

export type ResponseError = {
  error: unknown;
};

export interface RequestWithBody<T> extends Request {
  body: T;
}

enum ControllerErrors {
  internal = 'Internal server error',
  notFound = 'Object not found',
  requiredId = 'Id is required',
  badRequest = 'Bad request',
}

export default abstract class Controller<T> {
  abstract route: string;

  protected errors = ControllerErrors;

  constructor(protected service: Service<T>) { }

  abstract create(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>): Promise<typeof res>;

  read = async (
    req: RequestWithBody<T>,
    res: Response<T[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const obj = await this.service.read();

      return res.json(obj);
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const obj = await this.service.readOne(id);

      return obj
        ? res.status(200).json(obj)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  update = async (
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    const { body } = req;
    try {
      const obj = await this.service.update(id, body);

      if (!obj) return res.status(404).json({ error: this.errors.notFound });

      if ('error' in obj) {
        return res.status(400).json({ error: this.errors.badRequest });
      }

      return res.status(200).json(obj);
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  delete = async (
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res | void> => {
    const { id } = req.params;
    try {
      const result = await this.service.delete(id);

      return result
        ? res.status(204).end()
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}