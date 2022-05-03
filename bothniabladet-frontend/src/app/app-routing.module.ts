import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArchiveviewComponent } from './components/archiveview/archiveview.component';
import { CustomerviewComponent } from './components/customerview/customerview.component';
import { ImageviewComponent } from './components/imageview/imageview.component';
import { InvoiceviewComponent } from './components/invoiceview/invoiceview.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path: 'imageview', component: ImageviewComponent},
  {path: 'archiveview', component: ArchiveviewComponent},
  {path: 'invoiceview', component: InvoiceviewComponent},
  {path: 'customerview', component: CustomerviewComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: ArchiveviewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
