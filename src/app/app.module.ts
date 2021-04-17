import { registerLocaleData } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import localeFr from "@angular/common/locales/fr";
import { LOCALE_ID, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AdminAddCallComponent } from "./admin-add-call/admin-add-call.component";
import { AdminListComponent } from "./admin-list/admin-list.component";
import { AdminPanelComponent } from "./admin-panel/admin-panel.component";
import { AdminPanelResolver } from "./admin-panel/admin-panel.resolver";
import { AdminUpdateCallComponent } from "./admin-update-call/admin-update-call.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CallCardComponent } from "./call-card/call-card.component";
import { CallsListComponent } from "./calls-list/calls-list.component";
import { CallsListResolver } from "./calls-list/calls-list.resolver";

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    CallsListComponent,
    CallCardComponent,
    AdminPanelComponent,
    AdminAddCallComponent,
    AdminUpdateCallComponent,
    AdminListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDialogModule,
  ],
  providers: [
    CallsListResolver,
    AdminPanelResolver,
    { provide: LOCALE_ID, useValue: "fr-FR" },
    MatDatepickerModule,
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

// TODO: purge en prod @import 'tailwindcss/base';
// https://dev.to/angular/setup-tailwindcss-in-angular-the-easy-way-1i5l
