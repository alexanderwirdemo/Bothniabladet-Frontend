import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _userapi: UserService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      username: '',
      password: ''
    });
    noUser: 0;
  }

  onFormSubmit() {
    console.log('user data form:');
    console.dir(this.loginform.value);

    // Användardata
    var loginForm = this.loginform.value;
    let user = new User(loginForm.username, loginForm.password);
    console.log('user:');
    console.dir(user);

    this._userapi.postTypeRequest('users/'+user.username, user).subscribe((res: any) => {
      console.dir(res);
      if (res.success) {
      console.log(res)
      } else {
      console.log(res)
        if (res.user.length === 1) {
          this._userapi.setuserLoggedIn(true);
          this._userapi.setUser(res.user);
          this._router.navigate(['/archiveview']);
        }
      }
      }, err => {
      console.log(err);
      });

    
  }

  
}

export class User{
  public username: String;
  public password: String;

  constructor(username: String, password: String){
    this.username = username;
    this.password = password;
  }
}
