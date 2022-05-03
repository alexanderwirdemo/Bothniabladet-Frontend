import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import * as _ from 'lodash';

@Component({
  selector: 'app-advancedsearchview',
  templateUrl: './advancedsearchview.component.html',
  styleUrls: ['./advancedsearchview.component.css']
})
export class AdvancedsearchviewComponent implements OnInit {
  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  advancedsearch_data: FormGroup;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private _api: ApiService,
  )
  { }

  ngOnInit(): void {

    this.advancedsearch_data = this.formBuilder.group({
      advanced_searchString: '',
      advanced_searchTitle: '',
      advanced_searchCategory: '',
      advanced_searchSubcategory: '',
      advanced_searchPhotografer: '',
      advanced_searchResolution: '',
      advanced_searchPlace: '',
      advanced_searchPublished: '',
      advanced_searchDateFrom: '',
      advanced_searchDateTo: ''

    });

  }

  onFormSubmit() {
    console.log('advanced search array:');
    console.dir(this.advancedsearch_data.value);
  }
}


export class advancedsearch_data {
  public advanced_searchString: String;
  public advanced_searchTitle: String;
  public advanced_searchCategory: Array<String>;
  public advanced_searchSubcategory: Array<String>;
  public advanced_searchPhotografer: String;
  public advanced_searchResolution: Number;
  public advanced_searchPlace: String;
  public advanced_searchPublished: String;
  public advanced_searchDateFrom: Date;
  public advanced_searchDateTo: Date;

  constructor(advanced_searchString: String, advanced_searchTitle: String, advanced_searchCategory: Array<String>, advanced_searchSubcategory: Array<String>, advanced_searchPhotografer: String, advanced_searchResolution: Number, advanced_searchPlace: String, advanced_searchDateFrom: Date, advanced_searchDateTo: Date, advanced_searchPublished: String) {

    this.advanced_searchString = advanced_searchString;
    this.advanced_searchTitle = advanced_searchTitle;
    this.advanced_searchCategory = advanced_searchCategory;
    this.advanced_searchSubcategory = advanced_searchSubcategory;
    this.advanced_searchPhotografer = advanced_searchPhotografer;
    this.advanced_searchResolution = advanced_searchResolution;
    this.advanced_searchPlace = advanced_searchPlace;
    this.advanced_searchPublished = advanced_searchPublished;
    this.advanced_searchDateFrom = advanced_searchDateFrom;
    this.advanced_searchDateTo = advanced_searchDateTo;
  }
}



