import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallsListComponent } from './calls-list/calls-list.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

const routes: Routes = [
  { path: '', component: CallsListComponent },
  { path: 'admin', component: AdminPanelComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
