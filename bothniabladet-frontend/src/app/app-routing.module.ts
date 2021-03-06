import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArchiveviewComponent } from './components/archiveview/archiveview.component';
import { ImageviewComponent } from './components/imageview/imageview.component';
import { CustomerviewComponent } from './components/customerview/customerview.component';
import { AdvancedsearchviewComponent } from './components/advancedsearchview/advancedsearchview.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { UserdetailsComponent } from './components/userdetails/userdetails.component';
import { SearchresultsComponent } from './components/searchresults/searchresults.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ImagedetailComponent } from './components/imagedetail/imagedetail.component';


const routes: Routes = [
  {path: 'imageview', component: ImageviewComponent},
  {path: 'archiveview', component: ArchiveviewComponent},
  {path: 'customerview', component: CustomerviewComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: ArchiveviewComponent},
  { path: 'userlist', component: UserlistComponent },
  { path: 'userdetails', component: UserdetailsComponent },
  {path: 'lusers/:luserId', component: UserdetailsComponent },
  {path: 'advancedsearchview', component: AdvancedsearchviewComponent },
  {path: 'cart', component: CartComponent},
  { path: 'searchresults', component: SearchresultsComponent },
  { path: 'dialog', component: DialogComponent },
  { path: 'imagedetail', component: ImagedetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
