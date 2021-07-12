import {Injectable} from "@nestjs/common";
const CoinGecko = require("coingecko-api");

@Injectable()
export class GetCryptoService {
    geckoApiReq;
    constructor() {
    this.geckoApiReq = new CoinGecko();
    }
    async getCoinsList(): Promise<any>{
       const list = await this.geckoApiReq.coins.all()
       return
    }

    // async getMarketChart()
}