import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";
import { RouterModule } from "@angular/router";
import { CallRoutingModule } from "./call-routes.module";
import { CallService } from "./services/call.service";
import { CallCreateResolver } from "./views/call-create/call-create.resolver";
import { CallComponent } from "./views/call/call.component";
import { CallResolver } from "./views/call/call.resolver";

@NgModule({
  declarations: [CallComponent],
  imports: [
    CallRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatTableModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  providers: [CallService, CallResolver, CallCreateResolver],
})
export class CallModule {}
