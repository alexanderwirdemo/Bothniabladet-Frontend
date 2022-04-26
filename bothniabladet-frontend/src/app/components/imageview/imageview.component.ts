import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
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
    private formBuilder: FormBuilder,
    private _api: ApiService,
  ) { }

  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      uploadedImage: ['']
    });
    this.location = this.formBuilder.group({
      GPS: '12, 12',
      place: 'Scandinavium',
      city: 'Göteborg',
      region: 'Västra Götaland',
      country: 'Sverige'
    });
    this.technical_data = this.formBuilder.group({
      format:'jpeg',
      version:'Original',
      dimensions: '200x200',
      image_size: '2MB',
      resolution: '4000px',
      camera: 'Leica'
    });
    this.image_data = this.formBuilder.group({
      date:'2022-04-21',
      photographer:'Owe Sentlig',
      category:'',
      subcategory:'',
      keywords:'',
      restrictions:'None'
    })
  }

  onFileSelect(event) {
    const file = event.target.files[0];
    console.log('file:');
    console.dir(file);
    this.fileInputLabel = file.name;
    console.log(this.fileInputLabel);
    this.fileUploadForm.get('uploadedImage').setValue(file);
  }


  onFormSubmit() {
    console.log('image data form:');
    console.dir(this.image_data.value);
    console.log('location form:');
    console.dir(this.location.value);
    console.log('technical data form:');
    console.dir(this.technical_data.value);

    // Add to database
    var locationForm = this.location.value;
    let location = new Location(locationForm.GPS, locationForm.place, locationForm.city, locationForm.region, locationForm.country);
    console.log('location:');
    console.dir(location);

    var technicalDataForm = this.technical_data.value;
    var technical_data = new Technical_data(technicalDataForm.format, technicalDataForm.version, technicalDataForm.image_size, technicalDataForm.resolution, technicalDataForm.camera);
    console.log('technical data');
    console.dir(technical_data);

    const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth()+1;
      const day = today.getDate();
      const title = this.fileInputLabel.substring(0,this.fileInputLabel.indexOf('.')) + '-' + year + month + day;

    var imageDataForm = this.image_data.value;
    var imageData = new Image(title, imageDataForm.date, imageDataForm.photographer, imageDataForm.category, imageDataForm.subcategory, location, technical_data, imageDataForm.keywords, imageDataForm.restrictions);
    console.log('image data');
    console.dir(imageData);

    if (!this.fileUploadForm.get('uploadedImage').value) {
      alert('Please fill valid details!');
      return false;
    }
  

  const formData = new FormData();
    formData.append('uploadedImage', this.fileUploadForm.get('uploadedImage').value);
    console.dir(this.fileUploadForm.get('uploadedImage').value);


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

      this._api.postTypeRequest('images/add', imageData).subscribe((res: any) => {
        console.dir(res);
        if (res.success) {
        console.log(res)
        } else {
        console.log(res)
        alert(res.note);
        }
        }, err => {
        console.log(err);
        });
  }

}

export class Image{
  public title: String;
  public date: Date;
  public photographer: String;
  public category: Array<String>;
  public subcategory: Array<String>;
  public Location: Location;
  public Technical_data: Technical_data;
  public keywords: Array<String>;
  public restrictions: String;
  public remaining_publications: Number;

  constructor(title: String, date: Date, photographer: String, category: Array<String>, subcategory: Array<String>, Location: Location, Technical_data: Technical_data, keywords: Array<String>, restrictions: String){
    this.title = title;
    this.date = date;
    this.photographer = photographer;
    this.category = category;
    this.subcategory = subcategory;
    this.Location = Location;
    this.Technical_data = Technical_data;
    this.keywords = keywords;
    this.restrictions = restrictions;
  }

}

export class Location{
  public GPSCoordinates: String;
  public place: String;
  public city: String;
  public region: String;
  public country: String;

  constructor(GPSCoordinates: String, place: String, city: String, region: String, country: String){
    this.GPSCoordinates = GPSCoordinates;
    this.place = place;
    this.city = city;
    this.region = region;
    this.country = country;
  }
}

export class Technical_data{
  public format: String;
  public version: String;
  public image_size: String;
  public resolution: String;
  public camera: String;

  constructor(format: String, version: String, image_size: String, resolution: String, camera: String){
    this.format = format;
    this.version = version;
    this.image_size = image_size;
    this.resolution = resolution;
    this.camera = camera;
  }
}