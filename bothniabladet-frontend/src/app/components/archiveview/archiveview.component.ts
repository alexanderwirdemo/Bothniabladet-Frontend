import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-archiveview',
  templateUrl: './archiveview.component.html',
  styleUrls: ['./archiveview.component.css']
})

export class ArchiveviewComponent implements OnInit {
  searchString: String;
  combined: String;
  results: String;
  baseUrl: String;
  
  searchForm: FormGroup;

  constructor(

    private http: HttpClient,
    private formBuilder: FormBuilder,
    private _api: ApiService,

  ) {}

  onFormSubmit(){}

  makeSearch(){

    this.baseUrl = "images/keyword/"
    this.searchString = (<HTMLInputElement>document.getElementById("searchbar")).value;
    this.combined = this.baseUrl.concat(this.searchString.toString())
  

    this._api.getTypeRequest(this.combined).subscribe((res: any) => {
      {
          const entries = Object.entries(res);
          this.results = JSON.stringify(entries);
          

      }}, err => {
      console.log(err);
      alert("Nehej, du")

      });
  }

  ngOnInit(): void {

    this.searchForm = this.formBuilder.group({})
  }
}


export class simple_searchString {
  public simple_searchString: String;

  constructor(simple_searchString: String) {
    this.simple_searchString = simple_searchString;
  }
}


