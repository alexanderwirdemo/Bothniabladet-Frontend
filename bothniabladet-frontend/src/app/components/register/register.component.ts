import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerform: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _userapi: UserService,
    private _router: Router,
  ) { 
    
  }

  ngOnInit(): void {
    this.registerform = this.formBuilder.group({
      username: '',
      password: '',
      name: '',
      invoiceAddress: '',
      role: ''
    });
  }

  onFormSubmit() {
    console.log('user data form:');
    console.dir(this.registerform.value);

    // Användardata
    var loginForm = this.registerform.value;
    let user = new User(loginForm.username, loginForm.password, loginForm.name, loginForm.invoiceAddress);
    console.log('user:');
    console.dir(user);

    this._userapi.postTypeRequest('registeruser/'+user.username, user).subscribe((res: any) => {
      console.dir(res);
      if (res.success) {
      console.dir(res)
      } else {
        this._router.navigate(['/login'])
      }
      }, err => {
      console.log(err);
      });

    this.registerform.reset();
    alert('Ny användare registrerad');
  }

}

export class User{
  public username: String;
  public password: String;
  public name: String;
  public invoiceAddress: String;
  public role: String;
  public discount: number; 

  constructor(username: String, password: String, name: String, invoiceAddress: String){
    this.username = username;
    this.password = password;
    this.name = name;
    this.invoiceAddress = invoiceAddress;
    this.role = "Regular";
    this.discount = 0;
  }
}
