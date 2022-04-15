import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ImageviewComponent } from './components/imageview/imageview.component';
import { ArchiveviewComponent } from './components/archiveview/archiveview.component';
import { InvoiceviewComponent } from './components/invoiceview/invoiceview.component';
import { CustomerviewComponent } from './components/customerview/customerview.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageviewComponent,
    ArchiveviewComponent,
    InvoiceviewComponent,
    CustomerviewComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
