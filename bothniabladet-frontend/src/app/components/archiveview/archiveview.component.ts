import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import * as _ from 'lodash';
import { SearchresultsComponent } from '../searchresults/searchresults.component';

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
  
  simplesearch_data: FormGroup;

  constructor(

    private http: HttpClient,
    private formBuilder: FormBuilder,
    private _api: ApiService,

  ) {}

  onFormSubmit() {
    console.log('simple search string:');
    console.dir(this.simplesearch_data.value);
    this.makeSearch();

  }

  makeSearch(){

    this.baseUrl = "images/keyword/"
    this.searchString = (<HTMLInputElement>document.getElementById("simple_searchBar")).value;
    this.combined = this.baseUrl.concat(this.searchString.toString())
  

    this._api.getTypeRequest(this.combined).subscribe((res: any) => {
      {
        const entries = Object.entries(res);
        this.results = JSON.stringify(entries);
        console.log('result:');
        console.dir(this.results);

        
          

      }}, err => {
      console.log(err);
      alert("Något gick fel")

      });
  }

  ngOnInit(): void {

    this.simplesearch_data = this.formBuilder.group({
      simple_searchString: '',
    });
  }
}


export class simplesearch_data {
  public simple_searchString: String;

  constructor(simple_searchString: String) {
    this.simple_searchString = simple_searchString;
  }
}


