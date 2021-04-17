import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CallComponent } from "./call.component";
import { CallResolver } from "./call.resolver";
import { CallService } from "./services/call.service";

@NgModule({
  declarations: [CallComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  providers: [CallService, CallResolver],
})
export class CallModule {}
