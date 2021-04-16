import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Data } from "@angular/router";
import { CallCardComponent } from "../call-card/call-card.component";
import { CallDTO } from "../models/call";
import { CallsService } from "../services/calls.service";
import { CallsListModel } from "./calls-list.model";

@Component({
  selector: "app-calls-list",
  templateUrl: "./calls-list.component.html",
  styleUrls: ["./calls-list.component.scss"],
})
export class CallsListComponent implements OnInit {
  public pm: CallsListModel;

  constructor(
    private readonly _route: ActivatedRoute,
    public callsService: CallsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._route.data.subscribe((data: Data) => {
      this.pm = data.pm;
    });
  }

  openDialog(argCall: CallDTO): void {
    const dialogRef = this.dialog.open(CallCardComponent, {
      data: { ...argCall },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
