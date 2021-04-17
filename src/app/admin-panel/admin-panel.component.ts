import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Data } from "@angular/router";
import { AdminAddCallComponent } from "../admin-add-call/admin-add-call.component";
import { Call } from "../models/call";
import { CallsService } from "../services/calls.service";
import { AdminPanelModel } from "./admin-panel.model";

@Component({
  selector: "app-admin-panel",
  templateUrl: "./admin-panel.component.html",
  styleUrls: ["./admin-panel.component.scss"],
})
export class AdminPanelComponent implements OnInit {
  public pm: AdminPanelModel;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _callService: CallsService,
    public dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this._route.data.subscribe((data: Data) => {
      this.pm = data.pm;
    });
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AdminAddCallComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public onDelete(id: string) {
    this._callService.deleteCallfromDB(id);
    this._callService.getCalls().subscribe((calls: Call[]) => {
      this.pm.calls = calls;
    });
  }
}
