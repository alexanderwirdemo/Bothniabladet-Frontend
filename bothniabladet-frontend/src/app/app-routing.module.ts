import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArchiveviewComponent } from './archiveview/archiveview.component';
import { CustomerviewComponent } from './customerview/customerview.component';
import { ImageviewComponent } from './imageview/imageview.component';
import { InvoiceviewComponent } from './invoiceview/invoiceview.component';

const routes: Routes = [
  {path: 'imageview', component: ImageviewComponent},
  {path: 'archiveview', component: ArchiveviewComponent},
  {path: 'invoiceview', component: InvoiceviewComponent},
  {path: 'customerview', component: CustomerviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
