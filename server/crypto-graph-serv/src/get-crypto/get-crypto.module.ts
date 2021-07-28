import { Module } from '@nestjs/common';
import { GetCryptoController } from './get-crypto.controller';
import { GetCryptoService } from './get-crypto.service';

@Module({
  controllers: [GetCryptoController],
  providers: [GetCryptoService],
})
export class GetCryptoModule {}
