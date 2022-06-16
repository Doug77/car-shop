import { Router } from 'express';
import Controller from '../controllers';
import idValidation from '../middlewares/idValidation';

export default class CustomRouter<T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRouter(
    controller: Controller<T>,
    router: string = controller.route,
  ) {
    this.router.post(router, controller.create);
    this.router.get(router, controller.read);
    this.router.get(`${router}/:id`, idValidation, controller.readOne);
    this.router.put(`${router}/:id`, idValidation, controller.update);
    this.router.delete(`${router}/:id`, idValidation, controller.delete);
  }
}
