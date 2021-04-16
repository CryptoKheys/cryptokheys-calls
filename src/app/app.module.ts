import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CallsListComponent } from './calls-list/calls-list.component';
import { CallCardComponent } from './call-card/call-card.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminAddCallComponent } from './admin-add-call/admin-add-call.component';
import { AdminUpdateCallComponent } from './admin-update-call/admin-update-call.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { MatNativeDateModule } from '@angular/material/core';
import { AdminListComponent } from './admin-list/admin-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
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
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }, MatDatepickerModule, { provide: MAT_DIALOG_DATA, useValue: {}}],
  bootstrap: [AppComponent],
})
export class AppModule {}

// TODO: purge en prod @import 'tailwindcss/base';
// https://dev.to/angular/setup-tailwindcss-in-angular-the-easy-way-1i5l
