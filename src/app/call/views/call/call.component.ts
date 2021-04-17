import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Data, Router } from "@angular/router";
import { Call } from "../../../models/call";
import { CallService } from "../../services/call.service";
import { CallModel } from "./call.model";

@Component({
  selector: "app-call",
  templateUrl: "./call.component.html",
  styleUrls: ["./call.component.scss"],
})
export class CallComponent implements OnInit {
  public pm: CallModel;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _callService: CallService,
    private readonly _dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this._route.data.subscribe((data: Data) => {
      this.pm = data.pm;
      console.log(this.pm);
    });
  }

  public percentage(call: Call): any {
    if (call) {
      let res = {
        value: 0,
        color: "#fff",
      };

      res.value = (call.currentPrice - call.callPrice) / call.callPrice;

      if (res.value > 0) {
        res.color = "bg-green-";
      } else {
        res.color = "bg-red-";
      }

      let tmp = Math.abs(res.value * 10);
      tmp = Math.floor(tmp);
      // TODO : Elle pue du cul cette coloration, va falloir reprendre le truc
      if (tmp > 500) {
        tmp = 500;
      }
      if (tmp < 100) {
        tmp = 100;
      }
      res.color += "400";
      res.value *= 100;
      return res;
    }
  }

  public deleteCall(call: Call): void {
    this._callService.deleteCallfromDB(call.id);
    this._callService.getCalls().subscribe((calls: Call[]) => {
      this.pm.calls = calls;
    });
  }

  public createCall(): void {
    this._router.navigate(["add"], { relativeTo: this._route });
  }
}
