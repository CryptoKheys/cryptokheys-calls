import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

export enum MapAppRoute {
    CALL = "call",
}

const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: MapAppRoute.CALL,
    },
    /* {
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
    },*/
    {
        path: MapAppRoute.CALL,
        loadChildren: () =>
            import("./call/call.module").then((m) => m.CallModule),
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
