import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import * as _ from 'lodash';
import { SearchService } from 'src/app/services/search.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.css']
})
export class SearchresultsComponent implements OnInit {

  rawSearch;
  value;
  firstLayer: string;
  secondLayer: string;
  finalLayer: string;
  searchTerm: string;
  resultsAmount;
  titleList: string[] = [];
  a: String = "";
  b: String = "";
  c: string = "";
  d: String = "";
  e: string = "";
  f: string = "";
  g: string = "";
  h: string = "";
  i: string = "";
  image1: string[] = [];
  image2: string[] = [];
  image3: string[] = [];
  image4: string[] = [];
  image5: string[] = [];
  image6: string[] = [];
  image7: string[] = [];
  image8: string[] = [];
  image9: string[] = [];


  simplesearch_data: FormGroup;

  searchString: string;
  combined: string;
  results: string;
  baseUrl: string;

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
        this.searchService.setSearchResult(res)
        this.ngOnInit();
        
      }}, err => {
      console.log(err);
      alert("Något gick fel")

      });
  }

  constructor(

    private _router: Router,
    private formBuilder: FormBuilder,
    private searchService: SearchService,
    private _api: ApiService,
 
  ) { }

  ngOnInit(): void {

    this.titleList = [];
    this.image1 = [];
    this.image2 = [];
    this.image3 = [];
    this.image4 = [];
    this.image5 = [];
    this.image6 = [];
    this.image7 = [];
    this.image8 = [];
    this.image9 = [];
    this.a = ""
    this.b = ""
    this.c = ""
    this.d = ""
    this.e = ""
    this.f = ""
    this.g = ""
    this.h = ""
    this.i = ""
    
    this.searchService.rawResult.subscribe((searchoutput) => {
      
      this.rawSearch = searchoutput;

    });

    this.searchService.enteredTerm.subscribe((termoutput) => {
      
      this.searchTerm = JSON.stringify(termoutput);

    });


    Object.getOwnPropertyNames(this.rawSearch).forEach(key => {
      this.value = this.rawSearch[key];
    });

    for (let i = 0; i < Object(this.value)["length"]; i++) {
      this.firstLayer = Object(this.value)[JSON.stringify(i)]
      this.secondLayer = Object(this.firstLayer)["Administrative_data"]
      this.finalLayer = Object(this.secondLayer)["title"]
      this.titleList.push(this.finalLayer)
    }

    console.dir(this.titleList)

    const [aa,bb,cc,dd,ee,ff,gg,hh,ii] = this.titleList
    this.a = aa
    this.b = bb
    this.c = cc
    this.d = dd
    this.e = ee
    this.f = ff
    this.g = gg
    this.h = hh
    this.i = ii

    const [a1,a2,a3,a4,a5,a6,a7,a8,a9] = this.value
    this.image1 = a1
    this.image2 = a2
    this.image3 = a3
    this.image4 = a4
    this.image5 = a5
    this.image6 = a6
    this.image7 = a7
    this.image8 = a8
    this.image9 = a9

    console.dir(a1)
    
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
