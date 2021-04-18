export interface Coin {
  id: string;
  name: string;
  platforms: Platforms;
  symbol: string;
}

export interface Platforms {
  ethereum: string;
}

export interface CoinInfo {
  coin: Coin;
  coinGeckoUrl: string;
  urlImage: string;
  currentPrice: number;
  marketCap: number;
  mcapRank: number;
  sentimentVotesUpPercentage: number;
  priceChange24h: number;
  priceChangePercentage24h: number;
  price_changePercentage7d: number;
  priceChangePercentage14d: number;
  priceChangePercentage30d: number;
}
