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
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageviewComponent,
    ArchiveviewComponent,
    InvoiceviewComponent,
    CustomerviewComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent
    CartComponent
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
