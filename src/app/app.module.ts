import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";
import { LOCALE_ID, NgModule } from "@angular/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CallModule } from "./call/call.module";

registerLocaleData(localeFr);

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [
    CallModule,
    { provide: LOCALE_ID, useValue: "fr-FR" },
    MatDatepickerModule,
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

// TODO: purge en prod @import 'tailwindcss/base';
// https://dev.to/angular/setup-tailwindcss-in-angular-the-easy-way-1i5l
