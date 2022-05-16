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
  keywords: string;

  rawSearchFresh: any;
  rawSearchNews: any;
  rawSearchSport: any;
  rawSearchEconomy: any;
  rawSearchEntertainment: any;

  freshSearchRandom: number;
  newsSearchRandom: number;
  sportSearchRandom: number;
  economySearchRandom: number;
  entertainmentSearchRandom: number;

  index: number;

  
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

    this.baseUrl = "images/keywords/"
    this.searchString = (<HTMLInputElement>document.getElementById("simple_searchBar")).value;
    this.searchService.setSearchTerm(this.searchString)
    this.combined = this.baseUrl.concat(this.searchString.toString())
    
      this._api.getTypeRequest(this.combined).subscribe(res => {
        {
          this.searchService.setSearchResultBig(res)
          console.dir(res)
          this._router.navigate(['/searchresults']);
          
        }}, err => {
        console.log(err);
        alert("Något gick fel")
  
        });

  }

  initSearchCategoryFresh(){

    this._api.getTypeRequest("images/keywords/").subscribe(res => {
      {
        this.rawSearchFresh = res;
        this.index =  this.rawSearchFresh.allImages.length-1;
        
      }}, err => {
      console.log(err);
      alert("Något gick fel")

      });

  };

  initSearchCategoryNews(){

    this._api.getTypeRequest("images/category/Nyheter").subscribe(res => {
      {
        console.dir(res)
        this.rawSearchNews = res;
        this.newsSearchRandom = Math.floor(Math.random()*(this.rawSearchNews.allImages.length));
        
      }}, err => {
      console.log(err);
      alert("Något gick fel")

      });
  };

  initSearchCategorySport(){

    this._api.getTypeRequest("images/category/Sport").subscribe(res => {
      {
        this.rawSearchSport = res;
        this.sportSearchRandom = Math.floor(Math.random()*(this.rawSearchSport.allImages.length))        

      }}, err => {
      console.log(err);
      alert("Något gick fel")

      });

  };

  initSearchCategoryEconomy(){

    this._api.getTypeRequest("images/category/Ekonomi").subscribe(res => {
      {
        this.rawSearchEconomy = res;
        this.economySearchRandom = Math.floor(Math.random()*(this.rawSearchEconomy.allImages.length))
        
      }}, err => {
      console.log(err);
      alert("Något gick fel")

      });

  };

  initSearchCategoryEntertainment(){

    this._api.getTypeRequest("images/category/Nöje").subscribe(res => {
      {
        this.rawSearchEntertainment = res;
        this.entertainmentSearchRandom = Math.floor(Math.random()*(this.rawSearchEntertainment.allImages.length));
        
      }}, err => {
      console.log(err);
      alert("Något gick fel")

      });

  };      

  economyClick(){

    this.searchService.setSearchResultBig(this.rawSearchEconomy)
    this._router.navigate(['/searchresults']);

  }

  sportClick(){

    this.searchService.setSearchResultBig(this.rawSearchSport)
    this._router.navigate(['/searchresults']);

  }

  entertainmentClick(){

    this.searchService.setSearchResultBig(this.rawSearchEntertainment)
    this._router.navigate(['/searchresults']);

  }

  newsClick(){

    this.searchService.setSearchResultBig(this.rawSearchNews)
    this._router.navigate(['/searchresults']);

  }

  freshClick(){

    this.searchService.setSearchResultBig(this.rawSearchFresh)
    this._router.navigate(['/searchresults']);

  }
    
  

  ngOnInit(): void {

    this.simplesearch_data = this.formBuilder.group({
      simple_searchString: '',
    });

    this.initSearchCategoryNews();
    this.initSearchCategorySport();
    this.initSearchCategoryEconomy();
    this.initSearchCategoryEntertainment();
    this.initSearchCategoryFresh();

  }
}


export class simplesearch_data {
  public simple_searchString: String;

  constructor(simple_searchString: String) {
    this.simple_searchString = simple_searchString;
  }
}


