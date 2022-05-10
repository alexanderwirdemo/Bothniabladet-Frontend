import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { users, User } from './luser';
import { MatAccordion } from '@angular/material/expansion';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  user: User;
  users = users;
  Anvandare?: any;


  @ViewChild(MatAccordion) accordion: MatAccordion;
  
  constructor(
    private _userapi: UserService 
    ) { 
      this.users = users; 
    }

  ngOnInit(): void {
    this.retrieveAllUsers();
  }  

  retrieveAllUsers(): void {
    this._userapi.getTypeRequest('users')
      .subscribe(
        data => {
          this.Anvandare = data;
          console.log(data);
            for(var i = 0; i < this.Anvandare?.allUsers.length; i++) {
              const productExistInCart = this.users.find(({id}) => id === this.Anvandare.allUsers[i]._id);
              if (!productExistInCart) {
            this.users.push({
              id: this.Anvandare?.allUsers[i]._id,  
              username: this.Anvandare?.allUsers[i].username, 
              password: this.Anvandare?.allUsers[i].password, 
              name: this.Anvandare?.allUsers[i].name,   
              invoiceAddress: this.Anvandare?.allUsers[i].invoiceAddress,  
              role: this.Anvandare?.allUsers[i].role})
              console.log(this.users[i].name);
            }
          }
        },
        error => {
          console.log(error);
        });
  }

selectUser(i: number): any {
  this.user = users[i]
  console.log(this.user.name, this.user.role);
}

refreshList(): void {
  this.users = [];  
  this.retrieveAllUsers();
    }

}
