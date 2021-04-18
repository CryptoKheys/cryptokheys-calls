import { Coin } from "../../model/coin.model";

export class CallCreateModel {
    public coins: Coin[] = [];
    public isCoinInfoLoading: boolean = false;

    constructor(coins: Coin[]) {
        this.coins = coins;
    }
}
