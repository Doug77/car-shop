import App from './app';
import CarController from './controllers/Cars';
import { Car } from './interfaces/CarInterface';
import CustomRouter from './routes/Router';

const server = new App();

const carController = new CarController();
const carRoute = new CustomRouter<Car>();
carRoute.addRouter(carController);

server.addRouter(carRoute.router);

export default server;
