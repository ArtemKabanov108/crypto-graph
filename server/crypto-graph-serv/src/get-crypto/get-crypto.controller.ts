import { Controller, Get, Injectable, UseGuards } from '@nestjs/common';
import { GetCryptoService } from './get-crypto.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('get-crypto')
@Controller('get-crypto')
export class GetCryptoController {
  constructor(private readonly getCryptocurrency: GetCryptoService) {}
  @Get()
  async getCryptoList(): Promise<Object> {
    const list = await this.getCryptocurrency.getCoinsList();
    return list;
  }
}
