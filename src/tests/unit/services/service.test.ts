import { expect } from 'chai';
import * as sinon from 'sinon';
import CarModel from '../../../models/Cars';
import CarService from '../../../services/Cars';
import { mockCar, mockListCar, mockCarError } from '../../mocks/index';

describe('Teste CarService', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  describe('CarService', () => {
    before(() => {
      sinon.stub(carModel, 'create').resolves(mockCar);
      sinon.stub(carModel, 'read').resolves(mockListCar);
      sinon.stub(carModel, 'readOne').resolves(mockListCar[0]);
      sinon.stub(carModel, 'update').resolves(mockListCar[1]);
      sinon.stub(carModel, 'delete').resolves(mockListCar[1]);
    });

    after(() => {
      (carModel.create as sinon.SinonStub).restore();
      (carModel.read as sinon.SinonStub).restore();
      (carModel.readOne as sinon.SinonStub).restore();
      (carModel.update as sinon.SinonStub).restore();
      (carModel.delete as sinon.SinonStub).restore();
    });

    it('cria um carro de forma correta', async () => {
      const result = await carService.create(mockCar);

      expect(result).to.be.a('object');
      expect(result).to.have.keys('_id', 'model', 'year', 'color', 'status', 'buyValue', 'seatsQty', 'doorsQty');
      expect(result).to.be.deep.equal(mockCar);
    });
  })
});