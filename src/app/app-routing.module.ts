import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminPanelComponent } from "./admin-panel/admin-panel.component";
import { AdminPanelResolver } from "./admin-panel/admin-panel.resolver";
import { CallsListComponent } from "./calls-list/calls-list.component";
import { CallsListResolver } from "./calls-list/calls-list.resolver";

export enum MapAppRoute {
  CALL = "call",
}

const routes: Routes = [
  {
    path: "",
    resolve: {
      pm: CallsListResolver,
    },
    component: CallsListComponent,
  },
  {
    path: "admin",
    resolve: {
      pm: AdminPanelResolver,
    },
    component: AdminPanelComponent,
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: MapAppRoute.CALL,
  },
  {
    path: MapAppRoute.CALL,
    loadChildren: () => import("./call/call.module").then((m) => m.CallModule),
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: MapAppRoute.CALL,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
