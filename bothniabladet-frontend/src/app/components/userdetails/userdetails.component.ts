import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { User, users } from '../userlist/luser';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  user: User | undefined; 
  userData_fields: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {
    const routeParams = this.route.snapshot.paramMap;
    const luserIdFromRoute = String(routeParams.get('luserId'));
  
    this.user = users.find(luser => luser.id === luserIdFromRoute);
  }

  ngOnInit(): void {
    this.userData_fields = this.formBuilder.group({
      username: this.user.username,
      name: this.user.name,
      invoiceAddress: this.user.invoiceAddress,
      role: this.user.role,
    });

  }

}

export class userData_fields {
  public username: String;
  public name: String;
  public invoiceAddress: String;
  public role: String;

  constructor(username: String, name: String, invoiceAddress: String, role: String) {

    this.username = username;
    this.name = name;
    this.invoiceAddress = invoiceAddress;
    this.role = role;
  }
}
