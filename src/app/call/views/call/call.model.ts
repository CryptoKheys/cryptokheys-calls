import { Call } from "../../../models/call";

export class CallModel {
  public isAdmin: boolean = false;
  public calls: Call[] = [];

  public displayedColumns: string[] = [
    "image",
    "name",
    "author",
    "callPrice",
    "percentage",
  ];

  constructor(calls: Call[], isAdmin: boolean) {
    this.isAdmin = isAdmin;
    this.calls = calls.filter((e) => e.id);

    if (this.isAdmin) {
      this.displayedColumns.push("action");
    }
  }
}
