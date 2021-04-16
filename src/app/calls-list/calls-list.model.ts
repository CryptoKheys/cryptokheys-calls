import { CallDTO } from "../models/call";

export class CallsListModel {
  public calls: CallDTO[];
  public coins: any;

  constructor(calls: CallDTO[], coins: any) {
    this.calls = calls;
    this.coins = coins;
  }
}
