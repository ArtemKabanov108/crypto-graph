import { BadRequestException, Injectable } from '@nestjs/common';
import { IGeckoResponce, IParamsCrypto } from '../common/interfaces';
import { parsData } from '../common/helpers/parsData';
import { DATE_NOW_UNIX, SEVEN_DAYS_AGO } from '../common/constants';

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
      throw new BadRequestException(err, 'Request to GeckoCoin is failed :(, please try again!')
    }
  }

  async getCryptoData(cryptoListData: []): Promise<any> {
    try {
      const clearData = parsData(cryptoListData);
      const params = {
        vs_currency: 'usd',
        from: SEVEN_DAYS_AGO,
        to: DATE_NOW_UNIX,
      };
      console.log("11111111111111", clearData)

      const frog = await Promise.all(
        clearData.map( async ({id}) => {
          try {
            return await this.geckoApiReq.coins.fetchMarketChartRange(id, params)
          } catch (err) {
            console.log(err);
            return err;
          }
        }),
      );
      console.log("555555555555555555555", frog)
      return frog;
    } catch (err) {
      throw new BadRequestException(err, 'Api not response :(');
    }
  }

  // async getMarketChart()
}
