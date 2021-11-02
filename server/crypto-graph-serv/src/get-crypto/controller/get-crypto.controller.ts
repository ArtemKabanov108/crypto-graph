import {
  Controller,
  Get,
  HttpStatus,
  Res,
  UseGuards,
} from '@nestjs/common';
import { GetCryptoService } from '../get-crypto.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Response } from 'express';

@ApiBearerAuth()
@ApiTags('crypto')
@Controller('crypto')
export class GetCryptoController {
  constructor(private readonly getCryptocurrency: GetCryptoService) {}

  @Get('get-common-list')
  // @UseGuards(JwtAuthGuard)
  async getCryptoCurrency() {
    const list = await this.getCryptocurrency.getCoinsList();
    console.log("get crypto me", list)
    return list;
  }

  @Get('get-analytic')
  async getAnalytic(@Res() response: Response) {
    const { data } = await this.getCryptocurrency.getCoinsList();
    const dataForGraph = await this.getCryptocurrency.getCryptoData(data);
    return response.status(HttpStatus.OK).json(dataForGraph);
  }
}
