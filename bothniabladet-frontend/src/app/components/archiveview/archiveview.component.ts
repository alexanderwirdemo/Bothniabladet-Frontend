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

  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  simplesearch_data: FormGroup;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private _api: ApiService,
  ) { }

  ngOnInit(): void {

    this.simplesearch_data = this.formBuilder.group({
      simple_searchString: ''
    });

  }

  onFormSubmit() {
    console.log('simple search data:');
    console.dir(this.simplesearch_data.value);
  }
}


export class simple_searchString {
  public simple_searchString: String;

  constructor(simple_searchString: String) {
    this.simple_searchString = simple_searchString;
  }
}


