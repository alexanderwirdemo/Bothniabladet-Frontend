import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:3001/';
  currentUser: any; // This variable represents the current user logged in, if any
  userLoggedIn: any; // This variable represents the boolean value if a user is logged in or not (true/false)
  userRole: any;

  constructor(private _http: HttpClient) { 

  }

  getuserLoggedIn(): boolean {
    return this.userLoggedIn;
  }

  setuserLoggedIn(userLoggedIn: boolean): any {
    this.userLoggedIn = userLoggedIn;
  }

  setUserRole(userRole: any): any {
    this.userRole = userRole;
  }

  getuserRole(): any {
    return this.userRole;
  }

  logoutUser(): void {
    this.currentUser = null;
    this.userRole = null;
    this.setuserLoggedIn(false);
  }

   setUser(user: any): any {
     this.currentUser = user;
     this.setUserRole(user.role);
  }

  getTypeRequest(url) {
    return this._http.get(`${this.baseUrl}${url}`).pipe(map(res => {
    return res;
    }));
    }
    postTypeRequest(url, payload) {
    return this._http.post(`${this.baseUrl}${url}`, payload, {withCredentials:true}).pipe(map(res => {
    return res;
    }));
    }
    putTypeRequest(url, payload) {
    return this._http.put(`${this.baseUrl}${url}`, payload).pipe(map(res => {
    return res;
    }));
    }

}
