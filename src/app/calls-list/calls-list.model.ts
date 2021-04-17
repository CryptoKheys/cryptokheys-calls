import { Call } from "../models/call";

export class CallsListModel {
  public calls: Call[];

  constructor(calls: Call[]) {
    this.calls = calls.filter((e) => e.id);
  }
}
