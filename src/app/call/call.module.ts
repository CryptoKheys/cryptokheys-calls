import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";
import { RouterModule } from "@angular/router";
import { ConfirmDialogModule } from "../components/confirm-dialog/confirm-dialog.module";
import { CallRoutingModule } from "./call-routes.module";
import { CallGuard } from "./guards/call.guard";
import { CallService } from "./services/call.service";
import { CallCreateComponent } from "./views/call-create/call-create.component";
import { CallCreateResolver } from "./views/call-create/call-create.resolver";
import { CallComponent } from "./views/call/call.component";
import { CallResolver } from "./views/call/call.resolver";

const MAT_MODULE = [
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatListModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatIconModule,
  MatDialogModule,
  MatCardModule,
  MatTableModule,
  MatProgressSpinnerModule,
];

@NgModule({
  declarations: [CallComponent, CallCreateComponent],
  imports: [
    RouterModule,
    CallRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    ...MAT_MODULE,
  ],
  providers: [CallService, CallResolver, CallCreateResolver, CallGuard],
})
export class CallModule {}
