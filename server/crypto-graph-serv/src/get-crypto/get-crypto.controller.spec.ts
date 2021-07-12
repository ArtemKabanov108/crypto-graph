import { Test, TestingModule } from '@nestjs/testing';
import { GetCryptoController } from './get-crypto.controller';

describe('GetCryptoController', () => {
  let controller: GetCryptoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetCryptoController],
    }).compile();

    controller = module.get<GetCryptoController>(GetCryptoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
