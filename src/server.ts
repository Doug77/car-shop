import App from './app';
import CarController from './controllers/Cars';
import { Car } from './interfaces/CarInterface';
import CustomRouter from './routes/Router';
import MotorcycleController from './controllers/Motorcycle';
import { Motorcycle } from './interfaces/MotorcycleInterface';

const server = new App();

const carController = new CarController();
const carRoute = new CustomRouter<Car>();
carRoute.addRouter(carController);
server.addRouter(carRoute.router);

const motorcyclesController = new MotorcycleController();
const motorcyclesRoute = new CustomRouter<Motorcycle>();
motorcyclesRoute.addRouter(motorcyclesController);
server.addRouter(motorcyclesRoute.router);


export default server;
