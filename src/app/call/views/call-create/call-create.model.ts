export class CallCreateModel {
  public coins: any[] = [];

  constructor(coins: any[]) {
    this.coins = coins;
    console.log(coins);
  }
}
