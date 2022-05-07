import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import * as _ from 'lodash';
import { SearchService } from 'src/app/services/search.service'
import { Router } from '@angular/router';

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

    private _router: Router,
    private formBuilder: FormBuilder,
    private searchService: SearchService,
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
    this.searchService.setSearchTerm(this.searchString)
    this.combined = this.baseUrl.concat(this.searchString.toString())
  

    this._api.getTypeRequest(this.combined).subscribe((res: any) => {
      {
        this.searchService.setSearchResult(res)
        this._router.navigate(['/searchresults']);
        
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


