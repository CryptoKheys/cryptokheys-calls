import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "./confirm-dialog.component";

@NgModule({
    imports: [MatDialogModule, MatButtonModule],
    declarations: [ConfirmDialogComponent],
    exports: [ConfirmDialogComponent],
})
export class ConfirmDialogModule {}
