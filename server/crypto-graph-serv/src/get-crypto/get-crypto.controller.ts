import {Controller, Get, Injectable} from '@nestjs/common';
import {GetCryptoService} from "./get-crypto.service";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('get-crypto')
@Controller('get-crypto')
export class GetCryptoController {
    constructor(private getCryptocurrency: GetCryptoService) {
    }
    @Get()
    async getCryptoList(): Promise<any>{
        const list = await this.getCryptocurrency.getCoinsList()
        return list
    }
}
