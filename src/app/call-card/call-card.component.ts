import { Component, Inject, Input, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Call } from "../models/call";

@Component({
  selector: "app-call-card",
  templateUrl: "./call-card.component.html",
  styleUrls: ["./call-card.component.scss"],
})
export class CallCardComponent implements OnInit {
  @Input() call: Call;
  collapsed: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Call) {
    this.collapsed = true;
  }

  ngOnInit(): void {
    if (!this.call && this.data) {
      this.call = this.data;
      this.collapsed = false;
    }
  }

  mcapRefactor(): number {
    if (this.call) {
      let refinedMcap = this.call.marketCap;
      let counter = 0;
      const arrOG: string[] = ["k", "m", "T"];

      while (refinedMcap > 1) {
        refinedMcap /= 10;
        counter++;
      }

      return Math.floor(counter / 3);
    } else {
      return 0;
    }
  }

  pourcentage(): any {
    if (this.call) {
      let res = {
        value: 0,
        color: "#fff",
      };

      res.value =
        (this.call.currentPrice - this.call.callPrice) / this.call.callPrice;

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
}
