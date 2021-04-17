import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Data } from "@angular/router";
import { CallCardComponent } from "../call-card/call-card.component";
import { Call } from "../models/call";
import { CallModel } from "./call.model";
import { CallService } from "./services/call.service";

@Component({
  selector: "app-call",
  templateUrl: "./call.component.html",
  styleUrls: ["./call.component.scss"],
})
export class CallComponent implements OnInit {
  public pm: CallModel;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _callService: CallService,
    private readonly _dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this._route.data.subscribe((data: Data) => {
      this.pm = data.pm;
    });
  }

  public openDialog(call: Call): void {
    const dialogRef = this._dialog.open(CallCardComponent, {
      data: { ...call },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
