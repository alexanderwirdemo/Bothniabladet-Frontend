import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User, users } from '../userlist/luser';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
 
  user: User | undefined; 

  constructor(
    private route: ActivatedRoute,
  ) {
    const routeParams = this.route.snapshot.paramMap;
    const luserIdFromRoute = String(routeParams.get('luserId'));
  
    this.user = users.find(luser => luser.id === luserIdFromRoute);
  }

  ngOnInit(): void {
  }

}
