export interface CallDb {
    author: string;
    image: string;
    id: string;
    name: string;
    symbol: string;
    why: string;
    platforms: {
        ethereum: string | boolean;
    };
    callPrice: number;
    callDate: string | Date;
    GeckoURL: string;
    running: boolean;
    closedDate: string | Date | number;
    closedPrice: number;
}

export interface CallInfo {
    current_price: number;
    sentiment_votes_up_percentage: number;
    market_cap: number;
    mcapRank: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    price_change_percentage_30d: number;
}

export type CallDTO = [string, CallDb, ...CallInfo[]];

export interface AddResult {
    name: string;
}

export interface Call {
    id?: string;
    coinId?: string;
    name?: string;
    author?: string;
    image?: string;
    callPrice?: number;
    callDate?: string;
    running: boolean;
    closedDate: string | Date | number;
    closedPrice: number;
    currentPrice?: number;
    marketCap?: number;
    marketCapRank?: number;
    priceChange24h?: number;
    priceChangePercentage24h?: number;
    priceChangePercentage7d?: number;
    priceChangePercentage14d?: number;
    priceChangePercentage30d?: number;
}
