import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User, users } from '../userlist/luser';
import { UserlistComponent } from '../userlist/userlist.component';
import { ApiService } from '../../services/api.service';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  user: User | undefined; 
  editable: boolean = false; 
  users = users; 
  index: number; 

  selected = users.find(user => user.id === String(this.route.snapshot.paramMap.get('luserId')))
  userUpdateForm = this.formBuilder.group({
    name: this.selected.name,
    password: this.selected.password,
    invoiceAddress: this.selected.invoiceAddress,
    role: [this.selected.role,[Validators.required]],
    discount: [this.selected.discount, [Validators.max(100), Validators.min(0)]]
  });
  userData_fields: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private _userapi: UserService,
  ) {
    const routeParams = this.route.snapshot.paramMap;
    const luserIdFromRoute = String(routeParams.get('luserId'));
  
    this.user = users.find(user => user.id === luserIdFromRoute);
  }

  ngOnInit(): void {
    this.userData_fields = this.formBuilder.group({
      username: this.user.username,
      name: this.user.name,
      invoiceAddress: this.user.invoiceAddress,
      role: this.user.role,
      discount: this.user.discount,
    });

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
    console.log('discount: ',updateForm.discount)

    const body = {
        _id: this.selected.id,
        password: updateForm.password, 
        name: updateForm.name,
        invoiceAddress: updateForm.invoiceAddress,
        role: updateForm.role,
        discount: updateForm.discount,
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
    this.user.discount = updateForm.discount; 
    this.user.role = updateForm.role; 
    this.selected = this.user; 
  }

}

export class userData_fields {
  public username: String;
  public name: String;
  public invoiceAddress: String;
  public role: String;
  public discount: number;

  constructor(username: String, name: String, invoiceAddress: String, role: String, discount: number) {

    this.username = username;
    this.name = name;
    this.invoiceAddress = invoiceAddress;
    this.role = role;
    this.discount = discount;
  }
}
