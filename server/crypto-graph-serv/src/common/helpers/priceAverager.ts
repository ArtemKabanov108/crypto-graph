import { weekAverager } from './weekAverager';
import { ICurrencyCalculation } from '../interfaces';

export function priceAverager(data: any): ICurrencyCalculation {
  return data.map(({ coin, success, message, code, data }) => {
    return {
      coin,
      success,
      message,
      code,
      data: {
        price_average: weekAverager(data?.prices),
        market_cap_average: weekAverager(data?.market_caps),
      },
    };
  });
}
