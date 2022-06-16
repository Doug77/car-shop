import { expect } from 'chai';
import { Model } from 'mongoose';
import * as sinon from 'sinon';
import CarModel from '../../../models/Cars';
import { mockCar, mockListCar } from '../../mocks/index';

describe('Teste CarModel', () => {
  const carModel = new CarModel();

  describe('CarModel', () => {
    before(() => {
      sinon.stub(Model, 'create').resolves(mockCar);
      sinon.stub(Model, 'find').resolves(mockListCar);
      sinon.stub(Model, 'findOne').resolves(mockListCar[0]);
      sinon.stub(Model, 'findOneAndUpdate').resolves(mockListCar[1]);
      sinon.stub(Model, 'findOneAndDelete').resolves(mockListCar[1]);
    });

    after(() => {
      (Model.create as sinon.SinonStub).restore();
      (Model.find as sinon.SinonStub).restore();
      (Model.findOne as sinon.SinonStub).restore();
      (Model.findOneAndUpdate as sinon.SinonStub).restore();
      (Model.findOneAndDelete as sinon.SinonStub).restore();
    });

    it('Verifica se é possivel criar um carro', async () => {
      const result = await carModel.create(mockCar);

      expect(result).to.be.a('object');
      expect(result).to.have.keys('_id', 'model', 'year', 'color', 'status', 'buyValue', 'seatsQty', 'doorsQty');
    })
  });
});