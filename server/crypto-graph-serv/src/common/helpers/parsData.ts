import { IParseData } from '../interfaces';

export function parsData(data: []): IParseData[] {
  return data.filter(
    ({ id, symbol, image, current_price, market_cap }, idx) => {
      if (idx <= 14) {
        return {
          id,
          symbol,
          image,
          current_price,
          market_cap,
        };
      }
    },
  );
}
