import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatSnackBar, MatSnackBarRef } from "@angular/material/snack-bar";
import { Call } from "../models/call";

@Component({
  selector: "app-admin-list",
  templateUrl: "./admin-list.component.html",
  styleUrls: ["./admin-list.component.scss"],
})
export class AdminListComponent {
  @Input() call: Call;
  @Output("delete") delete: EventEmitter<any> = new EventEmitter();

  constructor(private snackBar: MatSnackBar) {}

  public deleteCall(id: string): void {
    this.delete.emit(id);
  }

  public get isReadyToSave(): boolean {
    return !(this.call.closedDate && this.call.closedPrice);
  }

  public openSnackBar(message: string, action: string): void {
    const snackRef = this._openSnackBar(message, action);
    snackRef.onAction().subscribe(() => {
      console.log(`Ah, c'est annulé`);
    });
    snackRef.afterDismissed().subscribe(() => {
      console.log("Dismiss automatique ?");
    });
  }

  private _openSnackBar(message: string, action: string): MatSnackBarRef<any> {
    return this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
