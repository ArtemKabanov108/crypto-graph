import { Test, TestingModule } from '@nestjs/testing';
import { GetCryptoController } from './get-crypto.controller';
import { GetCryptoService } from '../get-crypto.service';

describe('GetCryptoController', () => {
  let controller: GetCryptoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetCryptoController],
      providers: [GetCryptoService],
    }).compile();

    controller = module.get<GetCryptoController>(GetCryptoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller).not.toBeUndefined();
  });
});
