import { Call } from "../models/call";

export class CallModel {
  public calls: Call[];

  constructor(calls: Call[]) {
    this.calls = calls.filter((e) => e.id);
  }
}
