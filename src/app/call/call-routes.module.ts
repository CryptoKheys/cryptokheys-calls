import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CallComponent } from "./call.component";
import { CallResolver } from "./call.resolver";

const routes: Routes = [
  {
    path: "",
    resolve: {
      pm: CallResolver,
    },
    component: CallComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class CallRoutingModule {}
