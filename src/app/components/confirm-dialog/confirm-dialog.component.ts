import { Component, EventEmitter, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-confirm-dialog",
  templateUrl: "./confirm-dialog.component.html",
  styleUrls: ["./confirm-dialog.component.scss"],
})
export class ConfirmDialogComponent {
  public message: string = "Are you sure?";
  public confirmButtonText: string = "Yes";
  public cancelButtonText: string = "Cancel";

  public onConfirm: EventEmitter<void> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
  }

  public onConfirmClick(): void {
    this.onConfirm.emit();
    this.onClose();
  }

  public onClose(): void {
    this.dialogRef.close();
  }
}
