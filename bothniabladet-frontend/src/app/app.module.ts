import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ImageviewComponent } from './components/imageview/imageview.component';
import { ArchiveviewComponent } from './components/archiveview/archiveview.component';
import { InvoiceviewComponent } from './components/invoiceview/invoiceview.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AdvancedsearchviewComponent } from './components/advancedsearchview/advancedsearchview.component';
import { CustomerviewComponent } from './components/customerview/customerview.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageviewComponent,
    ArchiveviewComponent,
    InvoiceviewComponent,
    HeaderComponent,
    AdvancedsearchviewComponent,
    CustomerviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    MatDatepickerModule,
    MatRadioModule,
    MatFormFieldModule

  ],

  exports: [
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    MatDatepickerModule,
    MatRadioModule,
    MatFormFieldModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
