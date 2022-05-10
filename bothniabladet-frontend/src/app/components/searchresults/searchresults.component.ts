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

  rawSearch: any;
  value;
  firstLayer: string;
  secondLayer: string;
  finalLayer: string;
  searchTerm: string;
  resultsAmount;
  public imagesData: Array<ImageData> = [];
  heightValue: string;
  widthValue: string;
  keywords: Array<string> = [];


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

    this.baseUrl = "images/keywords/"
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

  displayResults(){

    this.imagesData = [];

    for(var imageIndex=0; imageIndex<this.rawSearch.allImages.length; imageIndex++){
      console.dir(this.rawSearch.allImages[imageIndex]);
      let imageData = new ImageData(
        this.rawSearch.allImages[imageIndex]._id,
        "http://localhost:3001/uploaded_images/"+this.rawSearch.allImages[imageIndex].title,
        this.rawSearch.allImages[imageIndex].photographer
      );
      this.imagesData.push(imageData);
    }

  }

  constructor(

    private _router: Router,
    private formBuilder: FormBuilder,
    private searchService: SearchService,
    private _api: ApiService,
 
  ) { }

  ngOnInit(): void {

    console.dir
    
    this.searchService.rawResult.subscribe((searchoutput) => {
      
      this.rawSearch = searchoutput;

    });

    this.searchService.enteredTerm.subscribe((termoutput) => {
      
      this.searchTerm = JSON.stringify(termoutput);

    });


    this.displayResults();

    console.dir(this.imagesData)

    
    
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

export class ImageData{
  public id: String;
  public filepath: String;
  public photographer: String;

  constructor(id: String, filepath: String, photographer: String){
    this.id = id;
    this.filepath = filepath;
    this.photographer = photographer;
  }
}
