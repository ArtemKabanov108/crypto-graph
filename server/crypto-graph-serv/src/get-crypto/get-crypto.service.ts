import { BadRequestException, Injectable } from '@nestjs/common';
import { ICurrencyCalculation, IGeckoResponce } from '../common/interfaces';
import { parsData } from '../common/helpers/parsData';
import { priceAverager } from '../common/helpers/priceAverager';
import { toDateNowUnix } from '../common/helpers/dateTransformers/toDateNowUnix';
import { toWeekDiapason } from '../common/helpers/dateTransformers/toWeekDiapason';
import {log} from "util";

const CoinGecko = require('coingecko-api');

@Injectable()
export class GetCryptoService {
  geckoApiReq;
  constructor() {
    this.geckoApiReq = new CoinGecko();
  }
  async getCoinsList(): Promise<IGeckoResponce> {
    try {
      return await this.geckoApiReq.coins.all();
    } catch (err) {
      throw new BadRequestException( err, 'Request to GeckoCoin is failed :(, please try again!' )
    }
  }

  async getCryptoData(cryptoListData: []): Promise<ICurrencyCalculation> {
    try {
      const clearData = parsData(cryptoListData);
      const params = {
        vs_currency: 'usd',
        from: toWeekDiapason(),
        to: toDateNowUnix(),
      };

      const frog = await Promise.all(
        clearData.map(async ({ id }, idx) => {
          try {
            if (idx <= 7) return {coin: id, ...await this.geckoApiReq.coins.fetchMarketChartRange(id, params)}
            console.log('after the first promises');
            if (idx > 7 && idx <= 14) return {coin: id, ...await this.geckoApiReq.coins.fetchMarketChartRange(id, params)}
            console.log('after the second promises');
          } catch (err) {
            console.log({ err });
            return err;
          }
        }),
      );
      return priceAverager(frog);
    } catch (err) {
      throw new BadRequestException( err, 'Api not response :(');
    }
  }
}
