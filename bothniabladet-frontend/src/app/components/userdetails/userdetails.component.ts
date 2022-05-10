import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User, users } from '../userlist/luser';
import { UserlistComponent } from '../userlist/userlist.component';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
 
  user: User | undefined; 
  editable: boolean = false; 
  users = users; 
  index: number; 

  selected = users.find(user => user.id === String(this.route.snapshot.paramMap.get('luserId')))
  userUpdateForm = this.formBuilder.group({
    name: this.selected.name,
    password: this.selected.password,
    invoiceAddress: this.selected.invoiceAddress,
    role: [this.selected.role,[Validators.required]]
  });

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _userapi: UserService,
  ) {
    const routeParams = this.route.snapshot.paramMap;
    const luserIdFromRoute = String(routeParams.get('luserId'));
  
    this.user = users.find(user => user.id === luserIdFromRoute);
  }

  ngOnInit(): void {
  }

  edit(): void {
    if (this.editable == false) {this.editable = true }
    else {this.editable = false }
    console.log('Is editable:', this.editable)
  }

  onSubmit() {
    console.log('user data form:');
    console.dir(this.userUpdateForm.value);
    var updateForm = this.userUpdateForm.value; 
    console.dir(this.selected);
    console.dir(this.selected.id);
    console.log('name: ',updateForm.name)
    console.log('address: ',updateForm.invoiceAddress)
    console.log('role: ',updateForm.role)
    console.log('password: ',updateForm.password)

    const body = {
        _id: this.selected.id,
        password: updateForm.password, 
        name: updateForm.name,
        invoiceAddress: updateForm.invoiceAddress,
        role: updateForm.role,
      };
      this._userapi.putTypeRequest('users/update/'+this.selected.id, body).subscribe(response => {
          console.log(response);
          alert('Godkänd!');
        }, er => {
          console.log(er);
          alert(er.error.error);
      });
    this.editable = false
    this.users = [];
    this.user.password = updateForm.password; 
    this.user.name = updateForm.name; 
    this.user.invoiceAddress = updateForm.invoiceAddress; 
    this.user.role = updateForm.role; 
    this.selected = this.user; 
  }

}
