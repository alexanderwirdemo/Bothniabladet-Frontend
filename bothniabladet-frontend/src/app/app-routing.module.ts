import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArchiveviewComponent } from './components/archiveview/archiveview.component';
import { ImageviewComponent } from './components/imageview/imageview.component';
import { CustomerviewComponent } from './components/customerview/customerview.component';
import { InvoiceviewComponent } from './components/invoiceview/invoiceview.component';
import { AdvancedsearchviewComponent } from './components/advancedsearchview/advancedsearchview.component';

const routes: Routes = [
  {path: 'imageview', component: ImageviewComponent},
  { path: 'archiveview', component: ArchiveviewComponent },
  { path: 'customerview', component: CustomerviewComponent },
  { path: 'invoiceview', component: InvoiceviewComponent },
  { path: 'advancedsearchview', component: AdvancedsearchviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
