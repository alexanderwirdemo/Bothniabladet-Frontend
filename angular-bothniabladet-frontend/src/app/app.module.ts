import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageviewComponent } from './imageview/imageview.component';
import { ArchiveviewComponent } from './archiveview/archiveview.component';
import { InvoiceviewComponent } from './invoiceview/invoiceview.component';
import { CustomerviewComponent } from './customerview/customerview.component';
import { HeaderComponent } from './header/header.component';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
