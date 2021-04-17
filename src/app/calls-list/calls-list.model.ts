import { Call } from "../models/call";

export class CallsListModel {
  public calls: Call[];
  public coins: any;

  constructor(calls: Call[], coins: any) {
    this.calls = calls.filter((e) => e.id);
    this.coins = coins;
  }
}
