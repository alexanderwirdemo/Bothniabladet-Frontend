import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

@Component({
  selector: 'app-imageview',
  templateUrl: './imageview.component.html',
  styleUrls: ['./imageview.component.css']
})
export class ImageviewComponent implements OnInit {

  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  image_data: FormGroup;
  location: FormGroup;
  technical_data: FormGroup;
  fileInputLabel: string;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      uploadedImage: ['']
    });
    this.location = this.formBuilder.group({
      place: '',
      city: '',
      region: '',
      country: ''
    });
    this.technical_data = this.formBuilder.group({
      format:'',
      version:'Original',
      dimensions: '',
      size: '',
      resolution: '',
      camera: '',
      GPS: ''
    });
    this.image_data = this.formBuilder.group({
      date:'',
      category:'',
      subcategory:'',
      keywords:'',
      restrictions:''
    })
  }

  onFileSelect(event) {
    const file = event.target.files[0];
    console.log('file:');
    console.dir(file);
    this.fileInputLabel = file.name;
    this.fileUploadForm.get('uploadedImage').setValue(file);
  }


  onFormSubmit() {
    console.log('image data:');
    console.dir(this.image_data.value);
    console.log('location:');
    console.dir(this.location.value);
    console.log('technical data:');
    console.dir(this.technical_data.value);

    if (!this.fileUploadForm.get('uploadedImage').value) {
      alert('Please fill valid details!');
      return false;
    }
  

  const formData = new FormData();
    formData.append('uploadedImage', this.fileUploadForm.get('uploadedImage').value);
    formData.append('agentId', '007');


    this.http
      .post<any>('http://localhost:3001/uploadfile', formData).subscribe(response => {
        console.log(response);
        if (response.statusCode === 200) {
          // Reset the file input
          this.uploadFileInput.nativeElement.value = "";
          this.fileInputLabel = undefined;
        }
      }, er => {
        console.log(er);
        alert(er.error.error);
      });
  }

}
