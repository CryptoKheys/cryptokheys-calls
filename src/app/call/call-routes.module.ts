import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CallCreateComponent } from "./views/call-create/call-create.component";
import { CallCreateResolver } from "./views/call-create/call-create.resolver";
import { CallComponent } from "./views/call/call.component";
import { CallResolver } from "./views/call/call.resolver";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: CallComponent,
        resolve: {
          pm: CallResolver,
        },
      },
      {
        path: "add",
        //canActivate: [],
        component: CallCreateComponent,
        resolve: {
          pm: CallCreateResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CallRoutingModule {}
